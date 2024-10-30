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
import FormInputText from "@/components/FormInputText";
import CustomButton from "@/components/CustomButton";
import FormInputDropdown from "@/components/FormInputDropdown";

const optionData = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];
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
          <View className="w-full p-3justify-center items-center flex">
            <TouchableOpacity
              onPress={() => setIsModalOpen(true)}
              className="border w-[80px] h-[80px] rounded-full justify-center items-center mt-6"
            >
              <Text className="text-4xl">{selectedEmoji.emoji || "🏆"}</Text>
            </TouchableOpacity>
            <Text className="text-black text-sm font-pregular m-5">
              Select an emoji to describe your goal
            </Text>
            <View className="border-[0.5px] border-black w-full" />
            <FormInputText
              handleTextChange={() => {}}
              title="Goal Name"
              value=""
              placeHolder="Madrid Trip"
              otherStyles="border-black m-2 w-full mt-5"
            />
            <View className="border-[0.5px] border-black w-full" />
            <FormInputText
              handleTextChange={() => {}}
              title="Goal Amount"
              value=""
              placeHolder="$1,300.00"
              otherStyles="border-black m-2 w-full"
            />
            <View className="border-[0.5px] border-black w-full" />
            <FormInputDropdown
              icon="Wallet"
              placeholder="Yes"
              title="Repeat"
              values={optionData}
            />
            <View className="border-[0.5px] border-black w-full" />
            <View className="w-full h-[25vh] justify-end flex p-3">
              <View className="border hidden"></View>
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
