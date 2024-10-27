import { View, Text } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

type GoalProgressType = {
  goalTitle: string;
  goalProgress: number;
};

const GoalProgressCard = ({ goalTitle, goalProgress }: GoalProgressType) => {
  return (
    <View className="flex-row w-full h-[9vh]">
      <View className="w-[100%] flex-row space-x-3 items-center">
        <View className="w-[60px] h-[60px] rounded-full bg-slate-600 justify-center items-center">
          <Text>Logo</Text>
        </View>
        <View className=" w-[80%] p-2 justify-around">
          <Text className="font-pmedium text-base text-black mb-2">
            {goalTitle}
          </Text>
          <Progress.Bar
            progress={goalProgress}
            width={270}
            color="#04EE7E"
            unfilledColor="#D3D3D3"
            animated
            borderColor="transparent"
          />
          <View className="w-full flex-row justify-between mt-2">
            <Text className="font-pmedium text-xs text-[#04EE7E]">
              Saved $2,200 / 80%
            </Text>
            <Text className="font-pregular text-xs text-black">
              left $1,000 / 20%
            </Text>
          </View>
        </View>
      </View>
      {/* <View className="w-[40%] flex justify-center">
        <Text></Text>
        <Text className="font-pregular text-xs text-black text-right">r</Text>
      </View> */}
    </View>
  );
};

export default GoalProgressCard;
