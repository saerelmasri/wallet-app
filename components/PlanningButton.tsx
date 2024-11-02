import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Href, router } from "expo-router";

type PlanningButtonType = {
  icon: "Budget" | "Goals" | "Scheduled";
  title: string;
  description: string;
  color: string;
  redirectUrl: string
};

const PlanningButton = (props: PlanningButtonType) => {
  const iconMap = {
    Budget: <Text>💰</Text>,
    Goals: <Text>🎯</Text>,
    Scheduled: <Text>🗓️</Text>,
  };
  
  return (
    <TouchableOpacity 
      onPress={() => router.push(props.redirectUrl as Href<string | object>)}
      className="w-[90%] h-[100px] border rounded-lg flex-row justify-center items-center m-2">
      <View
      style={{backgroundColor: props.color}}
        className={`w-[70px] h-[70px] rounded-lg justify-center items-center mr-3`}
      >
        <Text className="text-3xl">{iconMap[props.icon]}</Text>
      </View>
      <View className="w-[70%]">
        <Text className="text-black text-xl font-pmedium">{props.title}</Text>
        <Text className="text-black text-xs font-pregular">
          {props.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlanningButton;
