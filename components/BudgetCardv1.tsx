import { View, Text } from "react-native";
import ProgressCircleText from "./ProgressCircleText";
import React from "react";

const BudgetCardV1 = () => {
  return (
    <View className="w-[190px] h-[180px] bg-white rounded-xl  justify-center items-center flex border">
      <ProgressCircleText
        progress={0.4}
        size={150}
        thickness={15}
        icon="✈️"
        extraStyle="mr-1"
      />
    </View>
  );
};

export default BudgetCardV1;
