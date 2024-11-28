import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type NotificationOptionType = {
  emoji: string;
  title: string;
  description: string;
  isSelected?: boolean;
  onPress: () => void;
};

const NotificationOption = (props: NotificationOptionType) => {
  return (
    <TouchableOpacity onPress={props.onPress} className={`${props.isSelected ? "border border-blue-800" : "border border-black"} flex-row p-3 rounded-2xl mb-2`}>
      <View className="bg-gray-200 w-[60px] h-[60px] rounded-full justify-center items-center">
        <Text className="text-3xl">{props.emoji}</Text>
      </View>
      <View className="flex justify-center p-3">
        <Text className="text-base font-pmedium">{props.title}</Text>
        <Text className="text-xs font-plight">{props.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationOption;
