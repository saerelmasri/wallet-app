import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { displayAmount } from "../../helpers/common-helper";
import { router } from "expo-router";

type GoalProgressType = {
  goalId?: string;
  goalTitle?: string;
  goalProgress?: number;
  goalEmoji?: string;
  goalAmount?: number;
  amountSaved?: number;
  color?: string
};

const GoalProgressCard = (props: GoalProgressType) => {
  const {
    goalId= "",
    goalTitle = "Untitled Goal",
    goalProgress = 0,
    goalEmoji = "🎯",
    goalAmount = 0,
    amountSaved = 0,
    color = "",
  } = props;

  const progressPercentage = (goalProgress * 100).toFixed(2);
  const amountLeft = goalAmount - amountSaved;
  const leftPercentage = (100 - goalProgress * 100).toFixed(2);
  
  return (
    <TouchableOpacity
      className="flex-row w-full h-[9vh]"
      onPress={() =>
        router.push({
          pathname: "/newGoal",
          params: {
            goalId,
            goalTitle,
            goalEmoji,
            goalAmount,
            color
          },
        })
      }
    >
      <View className="w-[100%] flex-row space-x-3 items-center">
        <View
          className="w-[60px] h-[60px] rounded-full justify-center items-center"
          style={{ backgroundColor: color }}
        >
          <Text className="text-3xl">{goalEmoji}</Text>
        </View>
        <View className="w-[80%] p-2 justify-around">
          <Text className="font-pmedium text-base text-black mb-2">
            {goalTitle}
          </Text>
          <Progress.Bar
            progress={goalProgress}
            width={280}
            color="#04EE7E"
            unfilledColor="#D3D3D3"
            animated
            borderColor="transparent"
          />
          <View className="w-full flex-row justify-between mt-2">
            <Text className="font-pmedium text-xs text-[#04EE7E]">
              Saved ${displayAmount(amountSaved)} / {progressPercentage}%
            </Text>
            <Text className="font-pregular text-xs text-black">
              Left ${displayAmount(amountLeft)} / {leftPercentage}%
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GoalProgressCard;
