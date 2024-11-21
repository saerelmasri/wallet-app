import { View, Text } from "react-native";
import React from "react";
import TransactionCard from "../TransactionComponents/TransactionCard";

type RecordTypes = {
  recordDate: string;
};

const Records = ({ recordDate }: RecordTypes) => {
  return (
    <View className="w-full  p-3">
      <Text className="font-pmedium text-black text-base">{recordDate}</Text>
      <TransactionCard
        transactionTitle="AirPods Pro 2"
        transactionAmount="200.00"
        transactionCategory="Shopping"
        transactionType="Expense"
      />
      <TransactionCard
        transactionTitle="Groceries Happy"
        transactionAmount="50.00"
        transactionCategory="Food"
        transactionType="Expense"
      />
    </View>
  );
};

export default Records;