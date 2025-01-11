import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Modal,
  Button,
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
import Ionicons from "@expo/vector-icons/Ionicons";

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
  } | null>(null);

  const openModal = (
    userId: string,
    categoryId: string,
    budgetEmoji: string,
    budgetInitialAmount: number,
    budgetUsedAmount: number,
    budgetCategory: string
  ) => {
    setSelectedCategory({
      id: categoryId,
      userId: userId,
      name: budgetCategory,
      budgetEmoji: budgetEmoji,
      budgetInitialAmount: budgetInitialAmount,
      budgetUsedAmount: budgetUsedAmount,
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

  // Group and organize categories for being displayed
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
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }}
        >
          <View className="w-full flex-row items-center">
            {/* Remaining budget of the month*/}
            <View className="bg-white pl-4 pr-4 w-full">
              {monthly ? (
                <>
                  <View className=" flex-row justify-between">
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
            <View className="w-full flex-row justify-around p-3">
              {/* <GoalProgressCircle /> */}
              <GoalProgressCircleV2 />
              {/* <UpcomingPayments /> */}
            </View>
          ) : null}

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
                      <Text className="text-lg font-pregular">
                        {categoryType}
                      </Text>

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
                          onPress={openModal}
                        />
                      ))}
                    </View>
                  )
                )
              }
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            // backgroundColor: "transparent",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 35,
              width: "100%",
              height: "90%",
              alignItems: "center",
            }}
          >
            <View className="w-full flex-row justify-between p-2">
              <View className="flex-row space-x-2 p-1">
                <Text className="text-[25px] font-bold">
                  {selectedCategory?.budgetEmoji}
                </Text>
                <Text className="text-[25px] font-bold">
                  {selectedCategory?.name}
                </Text>
              </View>
              <View className="flex-row space-x-4 p-1">
                <View className="rounded-full w-7 h-7 bg-black justify-center items-center">
                  <Ionicons name="close-sharp" size={20} color="white" />{" "}
                </View>
                <View className="rounded-full w-7 h-7 bg-black justify-center items-center">
                  <Ionicons name="pencil" size={14} color="white" />{" "}
                </View>
              </View>
            </View>
            <View className="w-full flex-row border justify-between">
              <View className="flex-row space-x-2">
                <Text className="text-sm font-regular">
                  Initial Budget:
                  <Text className="font-bold">
                    ${displayAmount(selectedCategory?.budgetInitialAmount ?? 0)}
                  </Text>
                </Text>
                <Text className="text-sm font-regular">
                  Used Budget:
                  <Text className="font-bold">
                    ${displayAmount(selectedCategory?.budgetUsedAmount ?? 0)}
                  </Text>
                </Text>
              </View>
            </View>
            <Text style={{ marginTop: 10 }}>
              This is a basic modal. You can customize it further!
            </Text>
            <Button
              title="Close"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
