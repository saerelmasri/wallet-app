import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ProgressCircle from "./ProgressCircle";
import { router } from "expo-router";

const GoalProgressCircle = () => {
  return (
    <TouchableOpacity
      className="w-[190px] h-[180px] border border-black bg-white rounded-xl flex justify-center"
      onPress={() => {
        router.push("/goals");
      }}
    >
      <View className=" w-full flex justify-center p-3">
        <Text className="font-pregular text-xs text-black">Total Savings</Text>
        <Text className="font-psemibold text-2xl text-black mt-2">
          $1,358.90
        </Text>
      </View>
      <View className="w-full flex p-3 justify-center">
        <View className=" flex-row">
          <ProgressCircle
            progress={0.4}
            size={37}
            thickness={3}
            icon="✈️"
            extraStyle="mr-1"
          />
          <ProgressCircle
            progress={0.4}
            size={37}
            thickness={3}
            icon="🏠"
            extraStyle="mr-1"
          />
          <ProgressCircle
            progress={0.4}
            size={37}
            thickness={3}
            icon="🚗"
            extraStyle="mr-1"
          />
          <ProgressCircle
            progress={0.4}
            size={37}
            thickness={3}
            icon="👕"
            extraStyle="mr-1"
          />
        </View>
        <View className=" flex-row p-1">
          <Text className="text-black text-xs font-pmedium">
            4 active goals
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GoalProgressCircle;
