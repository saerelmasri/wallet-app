import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

type RadioButtonGroupType = {
  label: string;
  selected: boolean;
  onSelect: any;
};

const RadioButtonGroup = (props: RadioButtonGroupType) => {
  return (
    <View className="w-full flex-row justify-between items-center space-y-4 pl-5 pr-5">
      <Text>{props.label}</Text>
      <TouchableOpacity
        className="w-14 h-14 justify-center items-center"
        onPress={props.onSelect}
      >
        <View className="border border-[#A9A9A9] w-6 h-6 rounded-full justify-center items-center">
          <View
            className={`w-4 h-4 rounded-full ${
              props.selected ? "bg-black" : "bg-white"
            }`}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RadioButtonGroup;
