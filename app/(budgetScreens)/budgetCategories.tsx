import { View, Text, SafeAreaView, StatusBar, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import {
  NeedCategory,
  SavingsDebtCategory,
  WantsCategory,
} from "@/constants/Category";
import ChipCategory from "@/components/ChipCategory";
import { router } from "expo-router";

const BudgetCategories = () => {
  const [selectedNeeds, setSelectedNeeds] = useState<number[]>([1, 3]);
  const [selectedWants, setSelectedWants] = useState<number[]>([1, 2]);
  const [selectedSavings, setSelectedSavings] = useState<number[]>([]);

  const toggleSelection = (
    categoryId: number,
    selected: any[],
    setSelected: {
      (value: React.SetStateAction<number[]>): void;
      (value: React.SetStateAction<number[]>): void;
      (value: React.SetStateAction<number[]>): void;
      (arg0: any[]): void;
    }
  ) => {
    if (selected.includes(categoryId)) {
      setSelected(selected.filter((id: number) => id !== categoryId));
    } else {
      setSelected([...selected, categoryId]);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <View className="w-full h-full p-3">
        {/*Title*/}
        <View className="p-4 flex items-start space-y-3">
          <Text className="text-black font-psemibold text-xl">
            Select your common expenses - Choose the typical expenses for each
            category.
          </Text>
          <Text className="text-black font-pregular text-xs ">
            50-30-20 Strategy - We're using this method to build your budget,
            but you can customize the categories to suit your needs.
          </Text>
        </View>

        <ScrollView style={{ paddingBottom: 20 }}>
          {/*Needs Category*/}
          <View className="p-4 flex items-start space-y-3">
            <Text className="text-black font-pregular text-xs">
              Needs Category - Allocate 50% of your budget to essential fixed
              expenses.
            </Text>
            <View className="flex-row flex-wrap ">
              {[
                ...NeedCategory.map((category) => (
                  <ChipCategory
                    emoji={category.emoji}
                    key={category.id}
                    title={category.name}
                    selected={selectedNeeds.includes(category.id)}
                    onPress={() =>
                      toggleSelection(
                        category.id,
                        selectedNeeds,
                        setSelectedNeeds
                      )
                    }
                    containerStyle="m-[5px]"
                  />
                )),
              ]}
            </View>
          </View>

          {/*Wants Category*/}
          <View className="p-4 flex items-start space-y-3">
            <Text className="text-black font-pregular text-xs">
              Wants Category - Allocate 30% of your budget to non-essential
              expenses.
            </Text>
            <View className="flex-row flex-wrap ">
              {[
                ...WantsCategory.map((category) => (
                  <ChipCategory
                    emoji={category.emoji}
                    key={category.id}
                    title={category.name}
                    selected={selectedWants.includes(category.id)}
                    onPress={() =>
                      toggleSelection(
                        category.id,
                        selectedWants,
                        setSelectedWants
                      )
                    }
                    containerStyle="m-[5px]"
                  />
                )),
              ]}
            </View>
          </View>

          {/*Savings Category*/}
          <View className="p-4 flex items-start space-y-3">
            <Text className="text-black font-pregular text-xs">
              Savings/Debt Category - Allocate 20% of your budget to savings and
              debt repayment.
            </Text>
            <View className="flex-row flex-wrap ">
              {[
                ...SavingsDebtCategory.map((category) => (
                  <ChipCategory
                    emoji={category.emoji}
                    key={category.id}
                    title={category.name}
                    selected={selectedSavings.includes(category.id)}
                    onPress={() =>
                      toggleSelection(
                        category.id,
                        selectedSavings,
                        setSelectedSavings
                      )
                    }
                    containerStyle="m-[5px]"
                  />
                )),
              ]}
            </View>
          </View>
        </ScrollView>
        <CustomButton
          title="Let's start"
          handlePress={() => { router.push("/(budgetScreens)/budgetCalculation")}}
          containerStyle="bg-[#05603A] absolute bottom-0 right-0 mr-5 mb-5 h-[50px] w-[140px]"
          textStyle={"text-[#FCFCFC]"}
        />
      </View>
    </SafeAreaView>
  );
};

export default BudgetCategories;
