import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import TransactionCard from "./TransactionCard";
import { router } from "expo-router";

const TransactionHistoryWidget = () => {
  return (
    <View className="rounded-xl w-[90%] mt-3 p-4 bg-[#363636]">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="font-psemibold text-lg text-white">
          Transactions history
        </Text>
        <TouchableOpacity onPress={() => router.push("/transactions")}>
          <Text className="font-pregular text-sm text-white">See All</Text>
        </TouchableOpacity>
      </View>
      <View className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
      <TransactionCard
        transactionTitle="AirPods Pro 2"
        transactionAmount="200.00"
        transactionCategory="Shopping"
        transactionDate="12 October 2024"
        transactionType="Expense"
        usedWallet="Savings"
      />
      <TransactionCard
        transactionTitle="Blanco Cafe"
        transactionAmount="10.00"
        transactionCategory="Bar & Cafe"
        transactionDate="10 October 2024"
        transactionType="Expense"
        usedWallet="Wallet"
      />
      <TransactionCard
        transactionTitle="Blanco Cafe"
        transactionAmount="10.00"
        transactionCategory="Bar & Cafe"
        transactionDate="10 October 2024"
        transactionType="Expense"
        usedWallet="Wallet"
      />
      <TransactionCard
        transactionTitle="Monthly Salary"
        transactionAmount="1000.00"
        transactionCategory="Income"
        transactionDate="09 October 2024"
        transactionType="Income"
        usedWallet="Savings"
      />
    </View>
  );
};

export default TransactionHistoryWidget;
