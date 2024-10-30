import * as Progress from "react-native-progress";
import React from "react";
import { View, Text } from "react-native";

type ProgressCircleType = {
  progress: number;
  size: number;
  thickness: number;
  icon: string;
  extraStyle?: string;
  textStyle?: string;
};

const ProgressCircleText = ({
  progress,
  size,
  thickness,
}: ProgressCircleType) => {
  return (
    <View
      style={{ width: size, height: size }}
      className="relative justify-center items-center"
    >
      <Progress.Circle
        progress={progress}
        size={size}
        color="#04EE7E"
        unfilledColor="#EFEFEF"
        thickness={thickness}
        strokeCap="round"
        animated
        borderColor="transparent"
        showsText={false}
      />
      {/* Custom Text Overlay */}
      <View className="absolute items-center">
        <Text className="text-base font-bold tracking-tighter text-black">
          $10,500,00 <Text className="text-xs ml-1">left</Text>
        </Text>
        <Text className="text-xs font-plight tracking-tighter text-black">
          9 days left in Oct
        </Text>
      </View>
    </View>
  );
};

export default ProgressCircleText;
