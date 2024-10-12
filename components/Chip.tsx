import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type ChipTypes = {
  title: string;
};

const Chip = ({ title }: ChipTypes) => {
  return (
    <TouchableOpacity className="border border-white w-28 h-[30px] bg-white rounded-xl flex justify-center items-center">
      <Text className="font-psemibold text-xs">{title}</Text>
    </TouchableOpacity>
  );
};

export default Chip;
