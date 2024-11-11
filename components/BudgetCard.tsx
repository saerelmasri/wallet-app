import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

type BudgetCardType = {
  budgetColor: string;
  budgetEmoji: string;
  budgetInitialAmount: string;
  budgetUsedAmount: string;
  budgetCategory: string;
  transactionDate?: string;
};

const BudgetCard = () => {
  return (
    <TouchableOpacity
      className="w-full h-20 mb-2.5 bg-white rounded-lg flex-row px-2.5 overflow-hidden"
      onPress={() => {
        console.log("Budget");
      }}
    >
      <View className="flex-1 flex-row items-center">
        <View className="w-16 h-16 rounded-full bg-gray-200 justify-center items-center">
          <Text>Logo</Text>
        </View>
        <View className="ml-2.5 border-black">
          <Text className="text-lg font-pmedium text-black">Groceries</Text>
          <Text className="text-xs font-plight text-black">Last Transaction date</Text>
        </View>
      </View>
      <View className="justify-center items-end px-2.5">
        <Text
          className="text-base font-pmedium text-black"
        >
          Left $40,563.90
        </Text>
        <Text className="text-sm text-black opacity-100 mt-1">
          Used $200000.00
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BudgetCard;
