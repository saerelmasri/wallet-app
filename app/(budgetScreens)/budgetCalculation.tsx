import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import BudgetAllocation from "@/components/BudgetScreenComponents/BudgetAllocation";
import { router, useLocalSearchParams } from "expo-router";
import { CategoryTypes } from "@/constants/Category";
import { Image } from "expo-image";
import images from "@/constants/images";
import { displayAmount } from "@/helpers/common-helper";

type BudgetCategory = CategoryTypes & { value: string };

const BudgetCalculation = () => {
  const { needsCategory, wantsCategory, savingsCategory } =
    useLocalSearchParams();
  const selectedCategories = [needsCategory, wantsCategory, savingsCategory];

  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [remainingIncome, setRemainingIncome] = useState<number>(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const initialIncome = 3000;

  useEffect(() => {
    const parsedCategories: CategoryTypes[] = selectedCategories
      .map((categoryString) => JSON.parse(categoryString as string))
      .flat();

    const categoriesWithValues: BudgetCategory[] = parsedCategories.map(
      (category) => ({
        ...category,
        value: "",
      })
    );

    setCategories(categoriesWithValues);
  }, []);

  useEffect(() => {
    const totalAllocated = categories.reduce((sum, category) => {
      const value = parseFloat(category.value) || 0;
      return sum + value;
    }, 0);
    setRemainingIncome(initialIncome - totalAllocated);
  }, [categories]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleValue = (id: string, newValue: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id ? { ...category, value: newValue } : category
      )
    );
  };

  const handleDelete = (id: string) => {
    setCategories((prevCategories) =>
      prevCategories.filter((categories) => categories.id !== id)
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <View className="w-full h-full p-3">
          {/* Title Section */}
          <View className="p-4 flex items-start space-y-3">
            <Text className="text-black font-psemibold text-xl">
              Let's allocate some money
            </Text>
            <Text className="text-black font-pregular text-xs ">
              The following amounts are just suggestions. You can update the
              allocated money on each category, don't worry we will let you know
              if it might exceed the budget.
            </Text>
            <View className="border w-full p-3 flex-row items-center rounded-md">
              <Text className="text-black font-psemibold text-base">
                Your Income:{" "}
              </Text>
              <Text className="text-black font-pbold text-base">
                ${displayAmount(remainingIncome)} left
              </Text>
            </View>
          </View>

          {/* Scrollable Categories */}
          <ScrollView
            style={{ padding: 20 }}
            contentContainerStyle={{ paddingBottom: 100 }} // Added paddingBottom
          >
            {categories.length === 0 ? (
              <View className="w-full flex justify-center items-center space-y-4">
                <Image
                  source={images.warning}
                  contentFit="contain"
                  className="w-[300px] h-[300px]"
                />
                <Text className="text-black text-2xl font-psemibold">
                  Warning
                </Text>
                <Text className="text-black text-sm font-pregular text-center">
                  Please select at least one category to allocate your budget.
                  You cannot proceed without making a selection.
                </Text>
              </View>
            ) : (
              categories.map((category, id) => (
                <BudgetAllocation
                  key={id}
                  category={category.emoji + "  " + category.name}
                  value={category.value}
                  onValueChange={(newValue: string) =>
                    handleValue(category.id, newValue)
                  }
                  onDelete={() => handleDelete(category.id)}
                />
              ))
            )}
          </ScrollView>

          {/* Floating or Fixed Button */}
          {categories.length !== 0 && !isKeyboardVisible && (
            <View
              style={{
                position: "absolute",
                bottom: 20,
                right: 20,
              }}
            >
              <CustomButton
                title="Finish"
                handlePress={() => {
                  //@ts-ignore
                  router.push("/(budgetScreens)/budgetSummary");
                }}
                containerStyle="bg-[#05603A] h-[50px] w-[140px]"
                textStyle={"text-[#FCFCFC]"}
              />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BudgetCalculation;
