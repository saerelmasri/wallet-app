import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import EmojiPicker, { type EmojiType } from "rn-emoji-keyboard";
import FormInputText from "@/components/FormInputText";
import CustomButton from "@/components/CustomButton";
import ModalRepeat from "@/components/ModalRepeat";
import { useLocalSearchParams } from "expo-router";
import { displayAmount } from "@/helpers/common-helper";

const AddGoal = () => {
  const { goalTitle, goalEmoji, goalAmount } = useLocalSearchParams();

  const [modalRepeatVisible, setModalRepeatVisible] = useState(false);
  const [selectedRepeat, setSelectedRepeat] = useState("Never");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState({ emoji: "" });

  const handlePick = (emoji: EmojiType) => {
    setSelectedEmoji({
      emoji: emoji.emoji,
    });
    setIsModalOpen((prev) => !prev);
  };

  const handleRepeatChange = (option: string) => {
    setSelectedRepeat(option);
    setTimeout(() => {
      setModalRepeatVisible(false);
    }, 200);
  };

  useEffect(() => {
    if (goalEmoji) {
      setSelectedEmoji({ emoji: goalEmoji as string });
    }
  }, []);

  return (
    <SafeAreaView
      className="flex-1 h-full"
      style={{
        flex: 1,
        backgroundColor: modalRepeatVisible ? "rgba(0, 0, 0, 0.5)" : "white",
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
            handleTextChange={() => {}}
            title="Name"
            value={"" || goalTitle}
            placeHolder="Madrid Trip"
          />
          <View className="border-[0.5px] border-black w-full" />
          <FormInputText
            handleTextChange={() => {}}
            title="Amount"
            value={""}
            placeHolder="$1,300.00"
          />
          <View className="border-[0.5px] border-black w-full" />
          <View
            className={`bg-white p-3 flex-row justify-between items-center w-full`}
          >
            <Text
              className="text-base text-black font-psemibold "
              style={{ width: 100, paddingLeft: 20 }}
            >
              Repeat
            </Text>

            <View className="w-full h-12 flex-row items-center">
              <MaterialCommunityIcons
                name="calendar-clock"
                size={24}
                color="#A9A9A9"
              />
              <TouchableOpacity
                className="ml-3"
                onPress={() => setModalRepeatVisible(true)}
              >
                <Text
                  className={`${
                    selectedRepeat === "Never" ? "text-[#A9A9A9]" : "text-black"
                  }`}
                >
                  {selectedRepeat || "Never"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

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
      <ModalRepeat
        modalRepeatVisible={modalRepeatVisible}
        setModalRepeatVisible={setModalRepeatVisible}
        handleRepeatChange={handleRepeatChange}
        selectedRepeat={selectedRepeat}
      />
    </SafeAreaView>
  );
};

export default AddGoal;
