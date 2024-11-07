import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import Feather from "@expo/vector-icons/Feather";

type TransactionType = {
  type: "Expense" | "Income";
  color: "red" | "green";
  onSelect: () => void;
};

const TransactionTypeCard = (props: TransactionType) => {
  return (
    <TouchableOpacity
      onPress={props.onSelect}
      className={`w-full ${
        props.color === "red" ? "bg-[#FF000F]" : "bg-[#04EE7E]"
      } p-3 rounded-lg flex-row items-center space-x-3 m-1`}
    >
      <View className="w-[60px] h-[60px] rounded-lg bg-white justify-center items-center">
        {props.type === "Expense" ? (
          <Feather name="arrow-up-right" size={35} color="black" />
        ) : (
          <Feather name="arrow-down-left" size={35} color="black" />
        )}
      </View>
      <Text className="text-white font-psemibold text-xl">{props.type}</Text>
    </TouchableOpacity>
  );
};

export default TransactionTypeCard;
