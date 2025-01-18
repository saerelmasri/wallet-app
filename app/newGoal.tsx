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
import { createNewGoal, updateGoalDesc } from "../api/database/goalFunctions";
import { getRandomColor, showAlert } from "../helpers/common-helper";
import { getAuth } from "@firebase/auth";

const AddGoal = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid as string;

  //Information of an existing goal to update
  const { goalId, goalTitle, goalEmoji, goalAmount, color } =
    useLocalSearchParams();

  // Modal Variables
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Selected Variables
  const [selectedEmoji, setSelectedEmoji] = useState<{ emoji: string }>({
    emoji: "",
  });
  const [newGoalProp, setNewGoalProp] = useState({
    title: "",
    amount: "",
  });
  const [bgColor, setBgColor] = useState<string>(getRandomColor());

  // Loading State
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle save new goal function
  const handleSaveNewGoal = async () => {
    if (selectedEmoji.emoji === "") {
      return Alert.alert("Error", "Please select an emoji");
    }
    if (newGoalProp.title.trim() === "") {
      return Alert.alert("Error", "Please give it a name");
    }
    if (newGoalProp.amount.trim() === "" || isNaN(Number(newGoalProp.amount))) {
      return Alert.alert("Error", "Please give it a goal amount");
    }

    try {
      setIsLoading(true);
      const goalData = {
        goalName: newGoalProp.title,
        target: Number(newGoalProp.amount),
        emoji: selectedEmoji.emoji,
        saved: 0,
        userId: userId,
      };

      // Exisiting goal
      if (goalId) {
        const updateError = await updateGoalDesc(goalId as string, goalData);

        if (updateError instanceof Error) {
          console.log("Error updating goal:", updateError.message);
          showAlert("Error", "An error occurred while updating the goal.");
          return;
        }

        showAlert("Success", "Goal updated successfully");
        router.back();
      } else {
        const createError = await createNewGoal({
          ...goalData,
          color: bgColor,
        });

        if (createError instanceof Error) {
          console.log("Error creating goal:", createError.message);
          showAlert("Error", "An error occurred while updating the goal.");
          return;
        }

        showAlert("Success", "Goal created successfully");
        router.back();
      }
    } catch (error) {
      console.log("Error saving goal:", error);
      showAlert("Error", "An error occurred while saving the goal.");
    } finally {
      setIsLoading(false);
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
    if (goalTitle) {
      setNewGoalProp((prev) => ({ ...prev, title: goalTitle as string }));
    }
    if (goalAmount) {
      setNewGoalProp((prev) => ({ ...prev, amount: goalAmount as string }));
    }
    if (goalEmoji) {
      setSelectedEmoji({ emoji: goalEmoji as string });
    }

    if (color) {
      setBgColor(color as string);
    }
  }, [goalTitle, goalAmount, goalEmoji]);

  return (
    <SafeAreaView
      className="flex-1 h-full"
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View className="w-full h-full p-3 items-center flex">
        <TouchableOpacity
          onPress={() => setIsModalOpen(true)}
          className="w-[80px] h-[80px] rounded-full justify-center items-center mt-6"
          style={{ backgroundColor: bgColor }}
        >
          <Text className="text-4xl">{selectedEmoji.emoji || "🏆"}</Text>
        </TouchableOpacity>
        <Text className="text-black text-sm font-pregular m-5">
          Select an emoji to describe your goal
        </Text>
        <FormInputText
          handleTextChange={(e: any) =>
            setNewGoalProp({ ...newGoalProp, title: e })
          }
          title="Name"
          value={newGoalProp.title}
          placeHolder="Madrid Trip"
        />
        <FormInputText
          handleTextChange={(e: any) =>
            setNewGoalProp({ ...newGoalProp, amount: e })
          }
          title="Amount"
          value={newGoalProp.amount}
          placeHolder="$1,300.00"
          isNumber
        />

        <View className="w-full flex justify-center items-center p-3 absolute bottom-10">
          <CustomButton
            title={goalId !== undefined ? "Update Goal" : "Save Goal"}
            handlePress={handleSaveNewGoal}
            containerStyle="w-[90%] bg-[#2F7E79]"
            textStyle="text-white"
            isLoading={isLoading}
          />
        </View>
      </View>
      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </SafeAreaView>
  );
};

export default AddGoal;
