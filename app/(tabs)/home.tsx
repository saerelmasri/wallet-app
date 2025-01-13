import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import BudgetCard from "../../components/HomeComponents/BudgetCard";
import {
  currentMonth,
  daysLeftInMonth,
  displayAmount,
} from "../../helpers/common-helper";
import { getAllocatedBudget } from "../../api/database/userFunctions";
import {
  BudgetData,
  getUserCategories,
} from "../../api/database/categoryFunctions";
import { getAuth } from "@firebase/auth";
import { getLastCategoryTransaction } from "../../api/database/transactionFunctions";
import GoalProgressCircleV2 from "../../components/HomeComponents/GoalProgressCircleV2";
import { userGoalsExist } from "../../api/database/goalFunctions";
import CategoryModal from "../../components/HomeComponents/CategoryModal";

const Home = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid as string;

  // Clean up the stack by replacing it with only the home screen
  const router = useRouter();
  useFocusEffect(
    useCallback(() => {
      router.replace("/(tabs)/home");
    }, [router])
  );

  // State Variables
  const [monthly, setMonthly] = useState<number | null>(null);
  const [categories, setCategories] = useState<BudgetData[] | null>(null);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
  const [userHasGoals, setUserHasGoals] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string;
    name: string;
    userId: string;
    budgetEmoji: string;
    budgetInitialAmount: number;
    budgetUsedAmount: number;
    categoryColor: string;
    categoryType: string;
  } | null>(null);

  const openModal = (
    userId: string,
    categoryId: string,
    budgetEmoji: string,
    budgetInitialAmount: number,
    budgetUsedAmount: number,
    budgetCategory: string,
    categoryColor: string,
    categoryType: string
  ) => {
    setSelectedCategory({
      id: categoryId,
      userId: userId,
      name: budgetCategory,
      budgetEmoji: budgetEmoji,
      budgetInitialAmount: budgetInitialAmount,
      budgetUsedAmount: budgetUsedAmount,
      categoryColor: categoryColor,
      categoryType: categoryType,
    });
    setModalVisible(true);
  };

  // Fetch user budget function
  useEffect(() => {
    const fetchUserBudget = async () => {
      const result = await getAllocatedBudget(userId);
      if (result instanceof Error) {
        console.log("Error fetching user:", result.message);
        return;
      }
      setMonthly(result.totalAllocated);
    };

    const fetchUserCategories = async () => {
      setLoadingCategories(true);
      try {
        const result = await getUserCategories(userId);
        if (result instanceof Error) {
          console.log("Error fetching user:", result.message);
          return;
        }

        const lastTransaction = await Promise.all(
          result.map(async (item: BudgetData) => {
            const lastTransaction = await getLastCategoryTransaction(
              userId,
              item.categoryId
            );
            return {
              ...item,
              lastTransaction: lastTransaction,
            };
          })
        );
        setCategories(lastTransaction);
      } finally {
        setLoadingCategories(false);
      }
    };

    const checkUsersGoal = async () => {
      const result = await userGoalsExist(userId as string);
      if (result instanceof Error) {
        console.log("Error fetching user:", result.message);
        return;
      }
      setUserHasGoals(result);
    };

    fetchUserBudget();
    fetchUserCategories();
    checkUsersGoal();
  }, [userId]);

  const groupedCategories = categories
    ? categories.reduce((acc, category) => {
        if (!acc[category.categoryType]) {
          acc[category.categoryType] = [];
        }
        acc[category.categoryType].push(category);
        return acc;
      }, {} as Record<string, (typeof categories)[number][]>)
    : {};

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView className="flex-1 h-full">
        <View className="w-full flex-row items-center">
          {/* Remaining budget of the month*/}
          <View className="bg-white w-full">
            {monthly ? (
              <>
                <View className=" flex-row justify-between p-5">
                  <View>
                    <Text className="font-pregular text-xs text-black text-left">
                      My budget for {currentMonth}
                    </Text>
                    <Text className="font-psemibold text-xl text-black tracking-tighter text-left">
                      $ {displayAmount(Number(monthly))}
                      <Text className="font-pmedium text-xs text-black text-left">
                        {" "}
                        left
                      </Text>
                    </Text>
                    <Text className="font-pregular text-xs text-black tracking-tighter text-left">
                      {daysLeftInMonth} days left in {currentMonth}
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <Text className="font-psemibold text-sm text-black tracking-tighter text-left">
                Your monthly budget has not been set up yet. Please build your
                budget
              </Text>
            )}
          </View>
        </View>

        {userHasGoals ? (
          <View className="w-full flex-row justify-around pl-5 pr-5">
            {/* <GoalProgressCircle /> */}
            <GoalProgressCircleV2 />
            {/* <UpcomingPayments /> */}
          </View>
        ) : null}

        <ScrollView
          contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }}
        >
          {/* Transaction History Widgets */}
          {loadingCategories ? (
            <ActivityIndicator className="mt-12" size="large" color="#00ff00" />
          ) : (
            <View className="w-full p-4">
              {
                //@ts-ignore
                Object.entries(groupedCategories).map(
                  ([categoryType, categoryArray]) => (
                    <View key={categoryType}>
                      {/* Section Title */}
                      {/* <Text className="text-lg font-pregular">
                        {categoryType}
                      </Text> */}

                      {/* Categories in this section */}
                      {categoryArray.map((category) => (
                        <BudgetCard
                          key={category.categoryName} // Ensure unique key
                          userId={userId}
                          categoryId={category.categoryId}
                          budgetCategory={category.categoryName}
                          budgetColor={category.categoryColor}
                          budgetEmoji={category.categoryEmoji}
                          budgetInitialAmount={category.allocatedMoney}
                          budgetUsedAmount={category.usedMoney}
                          transactionDate={category.lastTransaction}
                          categoryType={category.categoryType}
                          onPress={openModal}
                        />
                      ))}
                    </View>
                  )
                )
              }
              <View className="w-full justify-center items-center">
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/categoryEditor",
                    })
                  }
                  className="border border-black-200 border-dashed w-[95%] h-[50px] rounded-lg flex-row justify-center items-center mb-3"
                >
                  <Text className="text-gray-400 font-plight text-xs">
                    Add a new category
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <CategoryModal
        onClose={() => setModalVisible(false)}
        selectedCategory={selectedCategory}
        visible={modalVisible}
      />
    </View>
  );
};

export default Home;
