import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { displayAmount } from "../../helpers/common-helper";

type BudgetCardType = {
  budgetColor: string;
  budgetEmoji: string;
  budgetInitialAmount: number;
  budgetUsedAmount: number;
  budgetCategory: string;
  // transactionDate?: string;
};

const BudgetCard = (props: BudgetCardType) => {
  const budgetLeft = props.budgetInitialAmount - props.budgetUsedAmount;
  return (
    <TouchableOpacity
      className="w-full h-20 mb-2.5 bg-white rounded-lg flex-row px-2.5 overflow-hidden"
      onPress={() => {
        console.log("Budget");
      }}
    >
      <View className="flex-1 flex-row items-center">
        <View style={{backgroundColor: props.budgetColor}} className="w-12 h-12 rounded-full justify-center items-center">
          <Text className="text-lg">{props.budgetEmoji}</Text>
        </View>
        <View className="ml-2.5 border-black">
          <Text className="text-base font-pmedium text-black">{props.budgetCategory}</Text>
          <Text className="text-xs font-pextralight text-black">Last Transaction date</Text>
        </View>
      </View>
      <View className="justify-center items-end px-2.5">
        <Text
          className="text-sm font-pmedium text-black"
        >
          Left ${displayAmount(budgetLeft)}
        </Text>
        <Text className="text-xs text-black opacity-100 mt-1">
          Used ${displayAmount(props.budgetInitialAmount)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BudgetCard;
