import { View, Text } from "react-native";
import React from "react";

type TransactionCardType = {
  transactionTitle: string;
  transactionCategory: string;
  usedWallet: string;
  transactionAmount: string;
  transactionDate: string;
  transactionType: "Income" | "Expense";
};

const TransactionCard = ({
  transactionTitle,
  transactionCategory,
  usedWallet,
  transactionAmount,
  transactionDate,
  transactionType,
}: TransactionCardType) => {
  return (
    <View className="flex-row w-full h-[9vh]">
      <View className="w-[60%] flex-row items-center space-x-3">
        <View className="w-[60px] h-[60px] rounded-full bg-white justify-center items-center">
          <Text>Logo</Text>
        </View>
        <View>
          <Text className="font-pmedium text-base text-white">
            {usedWallet}
          </Text>
          <Text className="font-pregular text-xs text-white opacity-70">
            {transactionTitle}
          </Text>
          <Text className="font-pregular text-xs text-white opacity-70">
            {transactionCategory}
          </Text>
        </View>
      </View>
      <View className="w-[40%] flex justify-center">
        {transactionType === "Expense" ? (
          <Text className="font-psemibold text-xl text-[#FF000F] text-right">
            - ${transactionAmount}
          </Text>
        ) : (
          <Text className="font-psemibold text-xl text-[#04EE7E] text-right">
            + ${transactionAmount}
          </Text>
        )}
        <Text></Text>
        <Text className="font-pregular text-xs text-white text-right">
          {transactionDate}
        </Text>
      </View>
    </View>
  );
};

export default TransactionCard;
