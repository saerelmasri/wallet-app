import { View, Text, SafeAreaView, ScrollView, StatusBar } from "react-native";
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
import { userId } from "../../configs/authenticatedUser";

const Home = () => {
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

  // Fetch user budget function
  useEffect(() => {
    const fetchUserBudget = async () => {
      const result = await getAllocatedBudget(userId as string);
      if (result instanceof Error) {
        console.log("Error fetching user:", result.message);
        return;
      }
      setMonthly(result.totalAllocated);
    };

    // Fetch user's category function
    const fetchUserCategories = async () => {
      const result = await getUserCategories(userId as string);
      if (result instanceof Error) {
        console.log("Error fetching user:", result.message);
        return;
      }
      setCategories(result);
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
            <GoalProgressCircle />
            <UpcomingPayments />
          </View>

          {/* Transaction History Widgets */}
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
                        budgetCategory={category.categoryName}
                        budgetColor={category.categoryColor}
                        budgetEmoji={category.categoryEmoji}
                        budgetInitialAmount={category.allocatedMoney}
                        budgetUsedAmount={category.usedMoney}
                      />
                    ))}
                  </View>
                )
              )
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;
