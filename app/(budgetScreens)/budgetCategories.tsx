import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import AntDesign from "@expo/vector-icons/AntDesign";

import {
  CategoryTypes,
  NeedCategory,
  SavingsDebtCategory,
  WantsCategory,
} from "@/constants/Category";
import ChipCategory from "@/components/ChipCategory";
import { router } from "expo-router";

const BudgetCategories = () => {
  const [alertShown, setAlertShown] = useState(false);
  const [selectedNeeds, setSelectedNeeds] = useState<CategoryTypes[]>([
    { id: "housing-id", name: "Housing", emoji: "🏠", color: "#D4A373" },
    { id: "utilities-id", name: "Utilities", emoji: "🔌", color: "#4A90E2" },
    { id: "groceries-id", name: "Groceries", emoji: "🛒", color: "#77DD77" },
  ]);
  const [selectedWants, setSelectedWants] = useState<CategoryTypes[]>([
    { id: "dining-out-id", name: "Dining Out", emoji: "🍽️", color: "#FFD700" },
    { id: "shopping-id", name: "Shopping", emoji: "🛍️", color: "#FF69B4" },
  ]);
  const [selectedSavings, setSelectedSavings] = useState<CategoryTypes[]>([]);

  const toggleSelection = (
    category: CategoryTypes,
    selected: CategoryTypes[],
    setSelected: any
  ) => {
    const isSelected = selected.some((item) => item.name === category.name);

    if (isSelected) {
      setSelected(selected.filter((item) => item.name !== category.name));
    } else {
      setSelected([...selected, category]);
    }
  };

  useEffect(() => {
    if (selectedNeeds.length === 0 && selectedWants.length === 0) {
      setAlertShown(true);
    } else setAlertShown(false);
  }, [selectedNeeds, selectedWants, alertShown]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <View className="w-full h-full p-3">
        {/*Title*/}
        <View className="p-3 flex items-start space-y-3">
          {alertShown && (
            <View className="border w-full p-3 flex-row justify-center items-center space-x-4 rounded-lg border-red-500">
              <AntDesign name="warning" size={24} color="red" />
              <Text className="text-red-500 font-pregular text-xs">
                Please select at least one category from 'Needs' or 'Wants' to
                proceed.
              </Text>
            </View>
          )}
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
                    selected={selectedNeeds.some(
                      (item) => item.id === category.id
                    )}
                    onPress={() =>
                      toggleSelection(category, selectedNeeds, setSelectedNeeds)
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
                    selected={selectedWants.some(
                      (item) => item.id === category.id
                    )}
                    onPress={() =>
                      toggleSelection(category, selectedWants, setSelectedWants)
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
                    selected={selectedSavings.some(
                      (item) => item.id === category.id
                    )}
                    onPress={() =>
                      toggleSelection(
                        category,
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
        {selectedNeeds.length === 0 && selectedWants.length === 0 ? null : (
          <CustomButton
            title="Next"
            handlePress={() => {
              router.push({
                pathname: "/(budgetScreens)/budgetCalculation",
                params: {
                  needsCategory: JSON.stringify(selectedNeeds),
                  wantsCategory: JSON.stringify(selectedWants),
                  savingsCategory: JSON.stringify(selectedSavings),
                },
              });
            }}
            containerStyle="bg-[#05603A] absolute bottom-0 right-0 mr-5 mb-5 h-[50px] w-[120px]"
            textStyle={"text-[#FCFCFC]"}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default BudgetCategories;
