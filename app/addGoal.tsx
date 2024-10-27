import GoalProgressCard from "@/components/GoalProgressCard";
import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { router } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import EmojiPicker, { type EmojiType } from "rn-emoji-keyboard";
import FormFieldApp from "@/components/FormFieldApp";
import CustomButton from "@/components/CustomButton";

const AddGoal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState({
    emoji: "",
    name: "",
  });

  const handlePick = (emoji: EmojiType) => {
    console.log(emoji);
    setSelectedEmoji({
      emoji: emoji.emoji,
      name: emoji.name,
    });
    setIsModalOpen((prev) => !prev);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="black" />
      <SafeAreaView className="flex-1 h-full">
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <View className="w-full p-3justify-center items-center p-3 flex">
            <TouchableOpacity
              onPress={() => setIsModalOpen(true)}
              className="border w-[80px] h-[80px] rounded-full justify-center items-center mt-6"
            >
              <Text className="text-4xl">{selectedEmoji.emoji || "🏆"}</Text>
            </TouchableOpacity>
            <Text className="text-black text-sm font-pregular mt-1">
              Select an emoji to describe your goal
            </Text>

            <FormFieldApp
              handleTextChange={() => {}}
              title="Goal Name"
              value=""
              placeHolder="Madrid Trip"
              otherStyles="border-black m-2 w-full mt-5"
            />
            <FormFieldApp
              handleTextChange={() => {}}
              title="Goal Amount"
              value=""
              placeHolder="$1,300.00"
              otherStyles="border-black m-2 w-full"
            />
            <FormFieldApp
              handleTextChange={() => {}}
              title="Goal Amount"
              value=""
              placeHolder="$1,300.00"
              otherStyles="border-black m-2 w-full"
            />

            <FormFieldApp
              handleTextChange={() => {}}
              title="Repeat"
              value=""
              placeHolder="Yes"
              otherStyles="border-black m-2 w-full"
            />

            <View className="w-full h-[25vh] justify-end flex">
              <View className="border"></View>
              <CustomButton
                title="Save Goal"
                handlePress={() => {}}
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
    </View>
  );
};

export default AddGoal;
