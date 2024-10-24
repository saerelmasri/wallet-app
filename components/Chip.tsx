import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type ChipTypes = {
  title: string;
};

const Chip = ({ title }: ChipTypes) => {
  return (
    <TouchableOpacity className="w-28 h-[30px] bg-[#D3D3D3] rounded-xl flex justify-center items-center">
      <Text className="font-psemibold text-xs">{title}</Text>
    </TouchableOpacity>
  );
};

export default Chip;
