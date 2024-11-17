import { View, Text, SafeAreaView, StatusBar, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import BudgetAllocation from "@/components/BudgetScreenComponents/BudgetAllocation";
import { useLocalSearchParams } from "expo-router";
import { CategoryTypes } from "@/constants/Category";

type BudgetCategory = CategoryTypes & { value: string };

const BudgetCalculation = () => {
  const { needsCategory, wantsCategory, savingsCategory } =
    useLocalSearchParams();
  const selectedCategories = [needsCategory, wantsCategory, savingsCategory];

  const [categories, setCategories] = useState<BudgetCategory[]>([]);

  console.log("needsCategory:", needsCategory);
  console.log("wantsCategory:", wantsCategory);
  console.log("savingsCategory:", savingsCategory);

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
      <View className="w-full h-full p-3">
        {/*Title*/}
        <View className="p-4 flex items-start space-y-3">
          <Text className="text-black font-psemibold text-xl">
            Let's allocate some money
          </Text>
          <Text className="text-black font-pregular text-xs ">
            The following amounts are just suggestions. You can update the
            allocated money on each category, don't worry we will let you knw if
            might exceed the budget
          </Text>
        </View>

        <ScrollView style={{ padding: 20 }}>
          {categories.map((category, id) => (
            <BudgetAllocation
              key={id}
              category={category.name + " " + category.emoji}
              value={category.value}
              onValueChange={(newValue: string) =>
                handleValue(category.id, newValue)
              }
              onDelete={() => handleDelete(category.id)}
            />
          ))}
        </ScrollView>
        <CustomButton
          title="Finish"
          handlePress={() => {
            console.log("Finish");
          }}
          containerStyle="bg-[#05603A] absolute bottom-0 right-0 mr-5 mb-5 h-[50px] w-[140px]"
          textStyle={"text-[#FCFCFC]"}
        />
      </View>
    </SafeAreaView>
  );
};

export default BudgetCalculation;
