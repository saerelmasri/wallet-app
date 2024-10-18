import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import GoalProgressCard from "./GoalProgressCard";

const GoalsWidget = () => {
  return (
    <View className="rounded-xl w-[90%] mt-3 p-4 bg-[#363636]">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="font-psemibold text-lg text-white">Goals</Text>
        <TouchableOpacity>
          <Text className="font-pregular text-sm text-white">See All</Text>
        </TouchableOpacity>
      </View>
      <View className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

      <GoalProgressCard goalTitle="Madrid Trip" goalProgress={0.9} />
      <GoalProgressCard goalTitle="Ferrari F40" goalProgress={0.2} />
      <GoalProgressCard goalTitle="Beach house" goalProgress={0.5} />
    </View>
  );
};

export default GoalsWidget;
