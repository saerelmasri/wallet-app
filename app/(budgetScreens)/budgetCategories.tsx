import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import AntDesign from "@expo/vector-icons/AntDesign";

import ChipCategory from "../../components/ChipCategory";
import { router, useLocalSearchParams } from "expo-router";
import { Categories, CategoryTypes } from "../../constants/Category";

const BudgetCategories = () => {
  const { incomingIncome } =
    useLocalSearchParams();

  const [alertShown, setAlertShown] = useState(false);
  const [needsCategory, setNeedsCategory] = useState<CategoryTypes[]>([]);
  const [wantsCategory, setWantsCategory] = useState<CategoryTypes[]>([]);
  const [savingsCategory, setSavingsCategory] = useState<CategoryTypes[]>([]);

  const [selectedNeeds, setselectedNeeds] = useState<CategoryTypes[]>([]);
  const [selectedWants, setselectedWants] = useState<CategoryTypes[]>([]);
  const [selectedSavings, setselectedSavings] = useState<CategoryTypes[]>([]);

  useEffect(() => {
    const needs = Categories.filter((category) => category.categorySection === "Needs");
    const wants = Categories.filter((category) => category.categorySection === "Wants");
    const savings = Categories.filter((category) => category.categorySection === "Savings");

    setNeedsCategory(needs);
    setWantsCategory(wants);
    setSavingsCategory(savings);
  }, [])

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
                ...needsCategory.map((category, index) => (
                  <ChipCategory
                    emoji={category.emoji}
                    key={index}
                    title={category.name}
                    selected={selectedNeeds.some(
                      (item) => item.name === category.name
                    )}
                    onPress={() =>
                      toggleSelection(category, selectedNeeds, setselectedNeeds)
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
                ...wantsCategory.map((category, index) => (
                  <ChipCategory
                    emoji={category.emoji}
                    key={index}
                    title={category.name}
                    selected={selectedWants.some(
                      (item) => item.name === category.name
                    )}
                    onPress={() =>
                      toggleSelection(category, selectedWants, setselectedWants)
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
                ...savingsCategory.map((category, index) => (
                  <ChipCategory
                    emoji={category.emoji}
                    key={index}
                    title={category.name}
                    selected={selectedSavings.some(
                      (item) => item.name === category.name
                    )}
                    onPress={() =>
                      toggleSelection(
                        category,
                        selectedSavings,
                        setselectedSavings
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
                  userIncome: incomingIncome
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
