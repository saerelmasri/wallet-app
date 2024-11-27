import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { isLoaded } from "expo-font";

type CustomButtonTypes = {
  title: string;
  handlePress: () => void;
  containerStyle: string;
  textStyle?: any;
  isLoading?: boolean;
};

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  textStyle,
  isLoading,
}: CustomButtonTypes) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      className={`w-[170] h-[70px] rounded-[16px] justify-center items-center ${containerStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`font-pmedium text-base ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
