import { View, SafeAreaView, ScrollView, StatusBar, Text } from "react-native";
import React, { useEffect, useState } from "react";

import PlanningButton from "../../components/PlanningComponents/PlanOptionCard";
import {
  BudgetData,
  getUserBudget,
} from "../../api/database/categoryFunctions";
import { getAuth } from "@firebase/auth";

const Budget = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const [userBudget, setUserBudget] = useState<null | BudgetData>(null);

  useEffect(() => {
    const fetchExistingBudget = async () => {
      const result = await getUserBudget(userId as string);
      if (result instanceof Error) {
        console.log("Error fetching user:", result.message);
        return;
      }

      if (result.length === 0) {
        console.log("No budget found for user.");
        return;
      }

      setUserBudget(result[0]);
    };
    fetchExistingBudget();
  }, [userId]);

  console.log("Categories: ", typeof userBudget?.categories);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1 h-full">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }}
        >
          <View className="w-full flex justify-center p-5">
            <Text className="text-black text-3xl font-psemibold">Planning</Text>
            <Text className="text-black text-sm font-pregular mt-2">
              Plan smarter! Set budgets, track spending, and reach your saving
              goals—all in one place to help you stay on track and achieve more
              with your money.
            </Text>
          </View>

          <View className="w-full mt-5 flex justify-center items-center">
            {userBudget ? (
              <PlanningButton
                redirectUrl="/budgetSummary"
                color="#f1c232"
                icon={"Budget"}
                title="Budget"
                description="Stay on top of spending, set limits, and make every dollar count."
                params={{
                  initialIncome: userBudget.budgetMetadata.initialIncome,
                  remainingIncome:
                    userBudget.budgetMetadata.initialIncome -
                    userBudget.budgetMetadata.totalAllocated,
                  expenses: JSON.stringify(userBudget.categories),
                }}
              />
            ) : (
              <PlanningButton
                redirectUrl="/buildBudgetIntro"
                color="#f1c232"
                icon={"Budget"}
                title="Budget"
                description="Stay on top of spending, set limits, and make every dollar count."
              />
            )}
            <PlanningButton
              redirectUrl="/goals"
              color="#15803d"
              icon={"Goals"}
              title="Saving Goals"
              description="Set goals, track progress, and watch your savings grow!"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Budget;
