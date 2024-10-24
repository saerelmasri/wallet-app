import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type ChipTypes = {
  title: string;
  containerStyle?: string;
};

const Chip = ({ title, containerStyle }: ChipTypes) => {
  return (
    <TouchableOpacity
      className={`p-3 h-[43px] border-black border-[2px] bg-white rounded-md flex justify-center items-center ${containerStyle}`}
    >
      <Text className="font-psemibold text-xs">{title}</Text>
    </TouchableOpacity>
  );
};

export default Chip;
