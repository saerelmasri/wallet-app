import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import BudgetAllocation from "@/components/BudgetScreenComponents/BudgetAllocation";
import { router, useLocalSearchParams } from "expo-router";
import { CategoryTypes } from "@/constants/Category";
import { displayAmount, getRandomColor } from "@/helpers/common-helper";

type BudgetCategory = CategoryTypes & { value: string; isEditable?: boolean };

const BudgetCalculation = () => {
  const { needsCategory, wantsCategory, savingsCategory } =
    useLocalSearchParams();
  const selectedCategories = [needsCategory, wantsCategory];
  const selectedSavings = [savingsCategory];

  const [expenses, setExpenses] = useState<BudgetCategory[]>([]);
  const [savings, setSavings] = useState<BudgetCategory[]>([]);
  const [remainingIncome, setRemainingIncome] = useState<number>(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const initialIncome = 3000;

  useEffect(() => {
    const parseCategories = (categoryArray: any[]) =>
      categoryArray
        .map((categoryString) => JSON.parse(categoryString as string))
        .flat()
        .map((category: CategoryTypes) => ({
          ...category,
          value: "",
          isEditable: false, // Predefined categories are not editable by default
        }));

    setExpenses(parseCategories(selectedCategories));
    setSavings(parseCategories(selectedSavings));
  }, []);

  useEffect(() => {
    const totalAllocated = [...expenses, ...savings].reduce(
      (sum, category) => sum + (parseFloat(category.value) || 0),
      0
    );
    setRemainingIncome(initialIncome - totalAllocated);
  }, [expenses, savings]);

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

  const handleValueChange = (
    id: string,
    newValue: string,
    isSavings: boolean
  ) => {
    const updateCategories = (categories: BudgetCategory[]) =>
      categories.map((category) =>
        category.id === id ? { ...category, value: newValue } : category
      );

    if (isSavings) setSavings((prev) => updateCategories(prev));
    else setExpenses((prev) => updateCategories(prev));
  };

  const handleNameChange = (
    id: string,
    newName: string,
    isSavings: boolean
  ) => {
    const updateCategories = (categories: BudgetCategory[]) =>
      categories.map((category) =>
        category.id === id ? { ...category, name: newName } : category
      );

    if (isSavings) setSavings((prev) => updateCategories(prev));
    else setExpenses((prev) => updateCategories(prev));
  };

  const handleEmojiChange = (
    id: string,
    newEmoji: string,
    isSavings: boolean
  ) => {
    const updateCategories = (categories: BudgetCategory[]) =>
      categories.map((category) =>
        category.id === id ? { ...category, emoji: newEmoji } : category
      );

    if (isSavings) setSavings((prev) => updateCategories(prev));
    else setExpenses((prev) => updateCategories(prev));
  };

  const handleDelete = (id: string, isSavings: boolean) => {
    const filterCategories = (categories: BudgetCategory[]) =>
      categories.filter((category) => category.id !== id);

    if (isSavings) setSavings((prev) => filterCategories(prev));
    else setExpenses((prev) => filterCategories(prev));
  };

  const handleAddNewCategory = (isSavings: boolean) => {
    const newCategory = {
      id: `${Date.now()}`, // Generate unique ID
      name: "",
      emoji: "🙂", // Default emoji
      value: "",
      color: `${getRandomColor()}`, // Default color
      isEditable: true, // New categories are editable
    };

    if (isSavings) setSavings((prev) => [...prev, newCategory]);
    else setExpenses((prev) => [...prev, newCategory]);
  };

  const handleFinish = () => {
    Alert.alert("Budget Allocation", "Budget allocation is complete!");
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
            <Text className="text-black font-pregular text-xs">
              Update the allocated money on each category. We'll ensure it
              doesn't exceed the budget.
            </Text>
            <TouchableOpacity onPress={() => router.push("/budgetIncome")} className="border w-full p-3 flex-row items-center rounded-md">
              <Text className="text-black font-psemibold text-base">
                Your Income:{" "}
              </Text>
              <Text className="text-black font-pbold text-base">
                ${displayAmount(remainingIncome)} left
              </Text>
            </TouchableOpacity>
          </View>

          {/* Scrollable Categories */}
          <ScrollView
            style={{ padding: 20 }}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {/* Expenses Section */}
            <Text className="text-black font-pregular text-sm pb-3">
              Expenses
            </Text>
            <TouchableOpacity
              onPress={() => handleAddNewCategory(false)}
              className="border border-black-200 border-dashed w-full h-[50px] rounded-lg flex-row justify-center items-center mb-3"
            >
              <Text className="text-gray-400 font-plight text-xs">
                Add a new category
              </Text>
            </TouchableOpacity>
            {expenses.map((category, id) => (
              <BudgetAllocation
                key={id}
                emoji={category.emoji}
                category={category.name}
                color={category.color}
                value={category.value}
                isEditable={category.isEditable}
                onValueChange={(newValue: string) =>
                  handleValueChange(category.id, newValue, false)
                }
                onNameChange={(newName: string) =>
                  handleNameChange(category.id, newName, false)
                }
                onEmojiChange={(newEmoji: string) =>
                  handleEmojiChange(category.id, newEmoji, false)
                }
                onDelete={() => handleDelete(category.id, false)}
              />
            ))}

            {/* Savings Section */}
            <Text className="text-black font-pregular text-sm pb-3 mt-6">
              Savings
            </Text>
            <TouchableOpacity
              onPress={() => handleAddNewCategory(true)}
              className="border border-black-200 border-dashed w-full h-[50px] rounded-lg flex-row justify-center items-center mb-3"
            >
              <Text className="text-gray-400 font-plight text-xs">
                Add a new category
              </Text>
            </TouchableOpacity>
            {savings.map((category, id) => (
              <BudgetAllocation
                key={id}
                emoji={category.emoji}
                category={category.name}
                color={category.color}
                value={category.value}
                isEditable={category.isEditable}
                onValueChange={(newValue: string) =>
                  handleValueChange(category.id, newValue, true)
                }
                onNameChange={(newName: string) =>
                  handleNameChange(category.id, newName, true)
                }
                onEmojiChange={(newEmoji: string) =>
                  handleEmojiChange(category.id, newEmoji, true)
                }
                onDelete={() => handleDelete(category.id, true)}
              />
            ))}
          </ScrollView>

          {/* Floating or Fixed Button */}
          {!isKeyboardVisible && (
            <View
              style={{
                position: "absolute",
                bottom: 20,
                right: 20,
              }}
            >
              <CustomButton
                title="Finish"
                handlePress={handleFinish}
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
