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
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import BudgetAllocation from "../../components/BudgetScreenComponents/BudgetAllocation";
import { router, useLocalSearchParams } from "expo-router";
import { CategoryTypes } from "../../constants/Category";
import { getRandomColor, showAlert } from "../../helpers/common-helper";
import { createCategories } from "../../api/database/categoryFunctions";
import { updateBudgetMetadata } from "../../api/database/userFunctions";
import { getAuth } from "@firebase/auth";

type BudgetCategory = CategoryTypes & {
  allocatedMoney: number;
  isEditable?: boolean;
};

const BudgetCalculation = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid as string;

  // Incoming info
  const { needsCategory, wantsCategory, savingsCategory, userIncome } =
    useLocalSearchParams();
  const selectedCategories = [needsCategory, wantsCategory, savingsCategory];

  // Initial State
  const initialIncome = Number(userIncome);

  // State Variables
  const [expenses, setExpenses] = useState<BudgetCategory[]>([]);
  const [remainingIncome, setRemainingIncome] = useState<number>(initialIncome);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [newCategoryType, setNewCategoryType] = useState<string>("");

  // Parse and set categories to be displayed
  useEffect(() => {
    const parseCategories = (categoryArray: any[]) =>
      categoryArray
        .map((categoryString) => JSON.parse(categoryString as string))
        .flat()
        .map((category: CategoryTypes) => ({
          ...category,
          allocatedMoney: 0,
          isEditable: false, // Predefined categories are not editable by default
        }));

    setExpenses(parseCategories(selectedCategories));
  }, []);

  // Real time update of allocated money
  useEffect(() => {
    const totalAllocated = expenses.reduce(
      (sum, category) => sum + (category.allocatedMoney || 0),
      0
    );
    setRemainingIncome(initialIncome - totalAllocated);
  }, [expenses]);

  // Logic to hide keyboard
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

  // Function to set new cateogry
  const handleValueChange = (name: string, newValue: number) => {
    const updateCategories = (categories: BudgetCategory[]) =>
      categories.map((category) =>
        category.name === name
          ? { ...category, allocatedMoney: newValue }
          : category
      );

    setExpenses((prev) => updateCategories(prev));
  };

  // Function to set new cateogry name
  const handleNameChange = (name: string, newName: string) => {
    const updateCategories = (categories: BudgetCategory[]) =>
      categories.map((category) =>
        category.name === name ? { ...category, name: newName } : category
      );

    setExpenses((prev) => updateCategories(prev));
  };

  // Function to set new cateogry emoji
  const handleEmojiChange = (name: string, newEmoji: string) => {
    const updateCategories = (categories: BudgetCategory[]) =>
      categories.map((category) =>
        category.name === name ? { ...category, emoji: newEmoji } : category
      );

    setExpenses((prev) => updateCategories(prev));
  };

  // Function to delete category
  const handleDelete = (name: string) => {
    const filterCategories = (categories: BudgetCategory[]) =>
      categories.filter((category) => category.name !== name);

    setExpenses((prev) => filterCategories(prev));
  };

  // Handle new category
  const handleAddNewCategory = () => {
    if (!newCategoryType) {
      showAlert("Select Category Type", "Please select a category type first.");
      return;
    }

    const newCategory: BudgetCategory = {
      name: `New Category`,
      emoji: "🙂",
      allocatedMoney: 0,
      color: getRandomColor(),
      isEditable: true,
      categorySection: "Needs",
    };

    // Add the new category based on selected section
    setExpenses((prev) => [...prev, newCategory]);

    // Reset category type after adding
    setNewCategoryType("");
  };

  // Function check and finish budget building
  const handleFinish = async () => {
    const hasEmptyExpense = expenses.some(
      (category) => !category.allocatedMoney || category.allocatedMoney <= 0
    );

    if (hasEmptyExpense) {
      showAlert(
        "Incomplete Allocation",
        "All categories must have money allocated or be removed before proceeding."
      );
      return;
    }

    if (remainingIncome < 0) {
      showAlert(
        "Invalid Budget",
        "Your allocated amounts exceed your income. Please adjust the values."
      );
      return;
    }

    try {
      const budgetMetadata = {
        totalAllocated: remainingIncome,
        initialIncome: initialIncome,
      };

      const result = await updateBudgetMetadata(
        userId as string,
        budgetMetadata
      );
      if (result instanceof Error) {
        showAlert("Error", "Something unexpected happened. Please try again.");
        return;
      }
    } catch (error) {
      console.error(error);
      showAlert("Error", "An unexpected error occurred. Please try again.");
    }

    try {
      for (const item of expenses) {
        const result = await createCategories(
          userId as string,
          item.name,
          item.emoji,
          item.categorySection,
          item.color,
          item.allocatedMoney,
          0
        );

        if (result instanceof Error) {
          showAlert(
            "Error",
            "Something unexpected happened. Please try again."
          );
          return;
        }
      }
      showAlert("Budget Allocation", "Budget allocation is complete!");

      router.push({
        pathname: "/(budgetScreens)/budgetSummary",
        params: {
          initialIncome: userIncome,
          remainingIncome: remainingIncome,
          expenses: JSON.stringify(expenses),
        },
      });
    } catch (error) {
      console.error(error);
      showAlert("Error", "An unexpected error occurred. Please try again.");
    }
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

            {/* Show remaining budget */}
            <View className="mt-4">
              <Text className="text-black font-pregular text-lg">
                Remaining Income: ${remainingIncome.toFixed(2)}
              </Text>
            </View>

            {/* Category Type Selector */}
            <View className="flex-row space-x-4">
              {["Wants", "Needs", "Savings"].map((section) => (
                <TouchableOpacity
                  key={section}
                  onPress={() => setNewCategoryType(section)}
                  style={{
                    backgroundColor:
                      newCategoryType === section ? "#05603A" : "#ddd",
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color: newCategoryType === section ? "#fff" : "#000",
                      fontWeight: "bold",
                    }}
                  >
                    {section}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
              onPress={handleAddNewCategory}
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
                value={category.allocatedMoney}
                isEditable={category.isEditable}
                onValueChange={(newValue) =>
                  handleValueChange(category.name, Number(newValue))
                }
                onNameChange={(newName: string) =>
                  handleNameChange(category.name, newName)
                }
                onEmojiChange={(newEmoji: string) =>
                  handleEmojiChange(category.name, newEmoji)
                }
                onDelete={() => handleDelete(category.name)}
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
