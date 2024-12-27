import { View, Text, SafeAreaView, StatusBar, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import CollapsibleView from "../../components/BudgetScreenComponents/CollapsibleView";
import { displayAmount, organizeExpenses } from "../../helpers/common-helper";
import { router, useLocalSearchParams } from "expo-router";

type BreakdownItem = {
  usedPercentage: string;
  title: string;
  breakdown: {
    name: string;
    emoji: string;
    color: string;
    allocatedBudget: number;
  }[];
};
const BudgetSummary = () => {
  // Incoming params
  const { initialIncome, remainingIncome, expenses } = useLocalSearchParams();

  // Calculate monthlyBudget
  const monthlyBudget = Number(initialIncome) - Number(remainingIncome);

  // Saved the breakdowned categories
  const [breakdown, setBreakdown] = useState<BreakdownItem[]>([]);

  // Function to breakdown, organize and save categories by type
  useEffect(() => {
    let parsedExpenses;

    try {
      if (typeof expenses === "string") {
        parsedExpenses = JSON.parse(expenses);
      } else if (Array.isArray(expenses)) {
        parsedExpenses = JSON.parse(expenses.join(""));
      } else {
        throw new Error(
          "Expenses must be a valid JSON string or string array."
        );
      }

      if (!Array.isArray(parsedExpenses)) {
        throw new Error("Parsed expenses is not an array.");
      }

      const breakdownExpenses = organizeExpenses(
        parsedExpenses,
        Number(initialIncome)
      );

      setBreakdown(breakdownExpenses);
    } catch (error) {
      console.error("Error parsing or organizing expenses:", error);
    }
  }, [expenses, initialIncome]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }} // Add bottom padding to avoid overlap with the button
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View className="p-4 flex items-center space-y-3 justify-center">
          <Text className="text-black font-psemibold text-3xl text-center">
            You're all set up!
          </Text>
          <Text className="text-black font-pregular text-base text-center">
            Great job! Remember, you can edit everything you've just entered and
            add new categories later on.
          </Text>
        </View>

        {/* Summary Section */}
        <View>
          {breakdown.map((item, index) => (
            <CollapsibleView
              key={index}
              title={item.title}
              breakdown={item.breakdown}
              usedPercentage={item.usedPercentage}
            />
          ))}
        </View>

        {/* Budget Summary */}
        <View className="w-full mt-5 p-3 space-y-2">
          <Text className="text-black font-pmedium text-sm">
            Your initial income: ${displayAmount(Number(initialIncome))}
          </Text>
          <Text className="text-black font-pmedium text-sm">
            Remaining unallocated funds: $
            {displayAmount(Number(remainingIncome))}
          </Text>
          <Text className="font-pmedium text-xs text-gray-600">
            Great job! You’ve left some money unallocated. Consider saving this
            amount for emergencies or future goals.
          </Text>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View
        style={{
          position: "absolute",
          bottom: 40, // Use spacing that fits your design
          right: 20,
        }}
      >
        <CustomButton
          title="Finish"
          handlePress={() => {
            router.push({
              pathname: "/(tabs)/home",
              params: {
                monthlyBudget: monthlyBudget,
                unallocatedMoney: remainingIncome,
              },
            });
          }}
          containerStyle="bg-[#05603A] h-[50px] w-[140px]"
          textStyle={"text-[#FCFCFC]"}
        />
      </View>
    </SafeAreaView>
  );
};

export default BudgetSummary;
