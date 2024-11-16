import { Text, TouchableOpacity } from "react-native";
import React from "react";

type ChipTypes = {
  title: string;
  selected: boolean;
  onPress: () => void;
  containerStyle?: string;
  emoji: string;
};

const ChipCategory = ({ title, containerStyle, emoji, selected, onPress }: ChipTypes) => {
  return (
    <TouchableOpacity
      onPress={onPress} 
      className={`p-3 h-[45px] border-[2px] ${
        selected ? "border-[#2F7E79] bg-[#2F7E79]" : "border-black bg-white"
      } rounded-md flex-row justify-center items-center space-x-1 ${containerStyle}`}
    >
      <Text>
        {emoji}
      </Text>
      <Text className={`font-psemibold text-xs ${selected ? "text-white" : "text-black"}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ChipCategory;
