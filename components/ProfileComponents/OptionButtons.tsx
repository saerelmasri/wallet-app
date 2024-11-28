import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type OptionButtonType = {
  title: string;
  emoji: string;
  onPress?: () => {};
  icon?: boolean;
};

const OptionButtons = (props: OptionButtonType) => {
  return (
    <TouchableOpacity
      onPress={() => {}}
      className="border flex-row justify-between items-center p-2 rounded-md space-x-5 h-16 mb-3"
    >
      <View className="flex-row space-x-2">
        {props.icon ? (
          <FontAwesome5 name="question-circle" size={24} color="red" />
        ) : (
          <Text className="font-psemibold text-base">{props.emoji}</Text>
        )}

        <Text className="font-psemibold text-sm text-red-600">
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OptionButtons;
