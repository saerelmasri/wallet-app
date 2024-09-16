import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { isLoaded } from "expo-font";

type CustomButtonTypes = {
  title: string;
  handlePress: () => void;
  containerStyle: string;
  actionPerformed: string
  textStyle?: any;
  loading?: boolean;
};

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  actionPerformed,
  textStyle,
  loading,
}: CustomButtonTypes) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      className={`w-[170] h-[70px] rounded-[16px] justify-center items-center ${actionPerformed} ${containerStyle} ${
        loading ? "opacity-50" : ""
      }`}
      disabled={loading}
    >
      <Text className={`font-psemibold text-lg ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
