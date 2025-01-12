import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

import EmojiPicker, { type EmojiType } from "rn-emoji-keyboard";
import FormInputText from "../components/FormInputText";
import CustomButton from "../components/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import { getRandomColor, showAlert } from "../helpers/common-helper";
import CategorySwitch from "../components/CategorySwitch";
import {
  createCategories,
  updateExistingCategory,
} from "../api/database/categoryFunctions";
import { getAuth } from "@firebase/auth";

const CategoryEditor = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid as string;

  //Information of an existing goal to update
  const { stringifyCategoryParam } = useLocalSearchParams();

  const parsedCategoryParam =
    typeof stringifyCategoryParam === "string"
      ? JSON.parse(stringifyCategoryParam)
      : stringifyCategoryParam;

  const { name, budgetEmoji, budgetInitialAmount, categoryColor } =
    parsedCategoryParam;
  const incomingUserId = parsedCategoryParam.userId;
  const incomingCategoryId = parsedCategoryParam.id;

  // Modal Variables
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Selected Variables
  const [selectedEmoji, setSelectedEmoji] = useState<{ emoji: string }>({
    emoji: "",
  });
  const [newCategoryProp, setNewCategoryProp] = useState({
    categoryName: "",
    amountAllocated: 0,
    categoryType: "Expenses",
  });
  const [bgColor, setBgColor] = useState<string>(getRandomColor());

  // Handle save new category function
  const handleSaveNewCategory = async () => {
    if (selectedEmoji.emoji === "") {
      return Alert.alert("Error", "Please select an emoji");
    }
    if (newCategoryProp.categoryName.trim() === "") {
      return Alert.alert("Error", "Please don't forget to give it a name");
    }
    if (
      newCategoryProp.amountAllocated === undefined ||
      isNaN(Number(newCategoryProp.amountAllocated))
    ) {
      return Alert.alert("Error", "Please give it a goal amount");
    }

    try {
      const categoryData = {
        categoryName: newCategoryProp.categoryName,
        allocatedMoney: Number(newCategoryProp.amountAllocated),
      };

      // Exisiting category
      if (incomingCategoryId) {
        const updateCategoryData = await updateExistingCategory(
          incomingUserId,
          incomingCategoryId,
          categoryData
        );

        if (updateCategoryData instanceof Error) {
          console.log("Error updating category:", updateCategoryData.message);
          showAlert("Error", "An error occurred while updating the category.");
          return;
        }

        showAlert("Success", "Category updated successfully");
        router.back();
      } else {
        const createNewCategory = await createCategories(
          userId,
          categoryData.categoryName,
          selectedEmoji.emoji,
          "Expenses",
          bgColor,
          categoryData.allocatedMoney,
          0
        );

        if (createNewCategory instanceof Error) {
          console.log("Error creating goal:", createNewCategory.message);
          showAlert("Error", "An error occurred while updating the category.");
          return;
        }

        showAlert("Success", "Category created successfully");
        router.back();
      }
    } catch (error) {
      console.log("Error saving category:", error);
      showAlert("Error", "An error occurred while saving the category.");
    }
  };

  // Handle to pick emoji
  const handlePick = (emoji: EmojiType) => {
    setSelectedEmoji({
      emoji: emoji.emoji,
    });
    setIsModalOpen((prev) => !prev);
  };

  // Populate screen if existing goal
  useEffect(() => {
    if (name) {
      setNewCategoryProp((prev) => ({
        ...prev,
        categoryName: name as string,
      }));
    }
    if (budgetInitialAmount) {
      setNewCategoryProp((prev) => ({
        ...prev,
        amountAllocated: budgetInitialAmount as number,
      }));
    }
    if (budgetEmoji) {
      setSelectedEmoji({ emoji: budgetEmoji as string });
    }
    if (categoryColor) {
      setBgColor(categoryColor as string);
    }

    setNewCategoryProp((prev) => ({
      ...prev,
      categoryType: "Expenses",
    }));
  }, [name, budgetInitialAmount, budgetEmoji, categoryColor]);

  return (
    <SafeAreaView
      className="flex-1 h-full"
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View className="w-full justify-center items-center flex">
          <TouchableOpacity
            onPress={() => setIsModalOpen(true)}
            className="w-[80px] h-[80px] rounded-full justify-center items-center mt-6"
            style={{ backgroundColor: bgColor }}
          >
            <Text className="text-4xl">{selectedEmoji.emoji || "🏆"}</Text>
          </TouchableOpacity>
          <Text className="text-black text-sm font-pregular m-5">
            Select an emoji to describe your category
          </Text>
          <FormInputText
            handleTextChange={(e: any) =>
              setNewCategoryProp({ ...newCategoryProp, categoryName: e })
            }
            title="Category Name"
            value={newCategoryProp.categoryName}
            placeHolder="Madrid Trip"
          />
          <FormInputText
            handleTextChange={(e: any) =>
              setNewCategoryProp({ ...newCategoryProp, amountAllocated: e })
            }
            title="Amount allocated"
            value={newCategoryProp.amountAllocated.toString()}
            placeHolder="$1,300.00"
            isNumber
          />

          <CategorySwitch
            locked={newCategoryProp.categoryType === "Expenses" ? true : false}
          />
        </View>
      </ScrollView>
      <View
        className={`flex justify-center items-center w-full absolute bottom-14 `}
      >
        <CustomButton
          title="Save Goal"
          handlePress={() => {}}
          containerStyle="w-[90%] bg-[#2F7E79] p-3"
          textStyle="text-white"
        />
      </View>
      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </SafeAreaView>
  );
};

export default CategoryEditor;
