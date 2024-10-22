import { View, Text } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";

type TransactionCardType = {
  transactionTitle: string;
  transactionCategory: string;
  usedWallet: string;
  transactionAmount: string;
  transactionType: "Income" | "Expense";
  transactionDate?: string;
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
            {transactionTitle}
          </Text>
          <View className="flex-row items-center space-x-2 p-1">
            <AntDesign name="shoppingcart" size={18} color="white" />
            <Text className="font-pregular text-xs text-white opacity-70">
              {transactionCategory}
            </Text>
          </View>
          <View className="flex-row items-center space-x-2 p-1">
            <Ionicons name="wallet-outline" size={18} color={"white"} />
            <Text className="font-pregular text-xs text-white opacity-70">
              {usedWallet}
            </Text>
          </View>
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
        {transactionDate && (
          <Text className="font-pregular text-xs text-white text-right">
            {transactionDate}
          </Text>
        )}
      </View>
    </View>
  );
};

export default TransactionCard;
