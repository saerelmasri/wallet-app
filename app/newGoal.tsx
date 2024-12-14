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
import FormInputText from "@/components/FormInputText";
import CustomButton from "@/components/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import { displayAmount } from "@/helpers/common-helper";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { database } from "@/configs/firebaseConfig";

const AddGoal = () => {
  const { goalId, goalTitle, goalEmoji, goalAmount } = useLocalSearchParams();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<{ emoji: string }>({
    emoji: "",
  });
  const [newGoalProp, setNewGoalProp] = useState({
    title: "",
    amount: "",
  });

  const handleSaveNewGoal = async () => {
    if (selectedEmoji.emoji === "") {
      return Alert.alert("Validation Error", "Please select an emoji");
    }
    if (newGoalProp.title.trim() === "") {
      return Alert.alert("Validation Error", "Please give it a name");
    }
    if (newGoalProp.amount.trim() === "" || isNaN(Number(newGoalProp.amount))) {
      return Alert.alert("Validation Error", "Please give it a goal amount");
    }

    try {
      const goalData = {
        goalName: newGoalProp.title,
        target: Number(newGoalProp.amount),
        emoji: selectedEmoji.emoji,
        saved: 0,
      };

      // Exisiting goal
      if (goalId) {
        const goalDocRef = doc(database, "goals", goalId as string);
        await setDoc(goalDocRef, goalData, { merge: true });
        Alert.alert("Success", "Goal updated successfully");
        router.back();
      } else {
        const goalDocRef = collection(database, "goals");
        await addDoc(goalDocRef, goalData);
        Alert.alert("Success", "New goal created successfully");
      }
    } catch (error) {
      console.log("Error saving goal:", error);
      Alert.alert("Error", "An error occurred while saving the goal.");
    }
  };

  const handlePick = (emoji: EmojiType) => {
    setSelectedEmoji({
      emoji: emoji.emoji,
    });
    setIsModalOpen((prev) => !prev);
  };

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
  }, [goalTitle, goalAmount, goalEmoji]);

  console.log("Goals:", newGoalProp);

  return (
    <SafeAreaView
      className="flex-1 h-full"
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View className="w-full p-3justify-center items-center flex">
          <TouchableOpacity
            onPress={() => setIsModalOpen(true)}
            className="w-[80px] h-[80px] rounded-full justify-center items-center mt-6 bg-[#05603A]"
          >
            <Text className="text-4xl">{selectedEmoji.emoji || "🏆"}</Text>
          </TouchableOpacity>
          <Text className="text-black text-sm font-pregular m-5">
            Select an emoji to describe your goal
          </Text>
          <View className="border-[0.5px] border-black w-full" />
          <FormInputText
            handleTextChange={() => () => (e: any) =>
              setNewGoalProp({ ...newGoalProp, title: e })}
            title="Name"
            value={newGoalProp.title}
            placeHolder="Madrid Trip"
          />
          <View className="border-[0.5px] border-black w-full" />
          <FormInputText
            handleTextChange={() => (e: any) =>
              setNewGoalProp({ ...newGoalProp, amount: e })}
            title="Amount"
            value={newGoalProp.amount}
            placeHolder="$1,300.00"
          />
          <View className="border-[0.5px] border-black w-full" />

          <View className="border-[0.5px] border-black w-full" />
          <View className="w-full h-[25vh] justify-end flex p-3">
            <View className="border hidden"></View>
            <CustomButton
              title="Save Goal"
              handlePress={handleSaveNewGoal}
              containerStyle="w-full bg-[#2F7E79]"
              textStyle="text-white"
            />
          </View>

          <EmojiPicker
            onEmojiSelected={handlePick}
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddGoal;
