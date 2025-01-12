import { View, Text } from "react-native";
import React from "react";

const CategorySwitch = ({ title }: { title: string }) => {
  return (
    <View className={`p-3 flex w-[90%] space-y-3`}>
      {/* Title above the form field */}
      <Text className="text-base w-[150px] text-black font-psemibold">
        {title}
      </Text>

      <View className="border w-full h-12 rounded-lg flex-row justify-around">
        <View className="border bg-black w-[50%] rounded-lg justify-center items-center">
          <Text className="text-white font-pbold text-base">Expenses</Text>
        </View>
        <View className="w-[50%] rounded-lg justify-center items-center">
          <Text className="text-black font-pbold text-base">Savings</Text>
        </View>
      </View>
    </View>
  );
};

export default CategorySwitch;
