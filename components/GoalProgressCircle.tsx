import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ProgressCircle from "./ProgressCircle";
import { router } from "expo-router";
import { MockGoals } from "@/constants/MockData";
import { displayAmount } from "@/helpers/common-helper";

const GoalProgressCircle = () => {
  const totalSaved = MockGoals.reduce(
    (accum, goal) => accum + goal.amountSaved,
    0
  );

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
          ${displayAmount(totalSaved)}
        </Text>
      </View>
      <View className="w-full flex p-3 justify-center">
        <View className=" flex-row">
          {MockGoals.slice(0, 4).map((item, key) => (
            <ProgressCircle
              progress={item.goalProgress}
              size={37}
              thickness={3}
              icon={item.goalEmoji}
              extraStyle="mr-1"
            />
          ))}
        </View>
        <View className=" flex-row p-1">
          <Text className="text-black text-xs font-pmedium">
            {MockGoals.length > 4
              ? "+4 active goals"
              : `${MockGoals.length} active goals`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GoalProgressCircle;
