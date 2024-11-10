import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { displayAmount, getRandomColor } from "@/helpers/common-helper";
import { router } from "expo-router";

type GoalProgressType = {
  goalTitle: string;
  goalProgress: number;
  goalEmoji: string;
  goalAmount: number;
  amountSaved: number;
};

const GoalProgressCard = (props: GoalProgressType) => {
  return (
    <TouchableOpacity
      className="flex-row w-full h-[9vh]"
      onPress={() =>
        router.push({
          pathname: "/newGoal",
          params: {
            goalTitle: props.goalTitle,
            goalEmoji: props.goalEmoji,
            goalAmount: props.goalAmount,
          },
        })
      }
    >
      <View className="w-[100%] flex-row space-x-3 items-center">
        <View
          className="w-[60px] h-[60px] rounded-full justify-center items-center"
          style={{ backgroundColor: getRandomColor() }}
        >
          <Text className="text-3xl">{props.goalEmoji}</Text>
        </View>
        <View className=" w-[80%] p-2 justify-around">
          <Text className="font-pmedium text-base text-black mb-2">
            {props.goalTitle}
          </Text>
          <Progress.Bar
            progress={props.goalProgress}
            width={270}
            color="#04EE7E"
            unfilledColor="#D3D3D3"
            animated
            borderColor="transparent"
          />
          <View className="w-full flex-row justify-between mt-2">
            <Text className="font-pmedium text-xs text-[#04EE7E]">
              Saved ${displayAmount(props.amountSaved)} /{" "}
              {props.goalProgress * 100}%
            </Text>
            <Text className="font-pregular text-xs text-black">
              left ${displayAmount(props.goalAmount - props.amountSaved)} /{" "}
              {100 - props.goalProgress * 100}%
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GoalProgressCard;
