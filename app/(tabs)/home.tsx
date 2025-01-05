import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import GoalProgressCircle from "../../components/HomeComponents/GoalProgressCircle";
import UpcomingPayments from "../../components/HomeComponents/nextPayments";
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

    fetchUserBudget();
    fetchUserCategories();
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
          <View className="w-full flex-row p-3 items-center">
            {/* Remaining budget of the month*/}
            <View className="bg-white p-3 w-full">
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

          <View className="w-full flex-row justify-around p-3">
            {/* <GoalProgressCircle /> */}
            <GoalProgressCircleV2 />
            {/* <UpcomingPayments /> */}
          </View>

          {/* Transaction History Widgets */}
          {loadingCategories ? (
            <ActivityIndicator className="mt-12" size="large" color="#00ff00" />
          ) : (
            <View className="p-3 w-full">
              {
                //@ts-ignore
                Object.entries(groupedCategories).map(
                  ([categoryType, categoryArray]) => (
                    <View key={categoryType}>
                      {/* Section Title */}
                      <Text className="text-lg font-pregular p-3">
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
    </View>
  );
};

export default Home;
