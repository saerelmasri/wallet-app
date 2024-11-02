import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import TransactionCard from "./TransactionCard";
import { router } from "expo-router";

const BudgetTransaction = [
  {
    transactionTitle: "Tennis Session",
    transactionAmount: "15.00",
    transactionCategory: "Fitness & Sports",
    transactionDate: "Nov 02, 2024",
    transactionType: "Expense",
    swipeEnabled: false,
  },
  {
    transactionTitle: "Arguile",
    transactionAmount: "7.00",
    transactionCategory: "Bar & Cafe",
    transactionDate: "Nov 01, 2024",
    transactionType: "Expense",
    swipeEnabled: false,
  },
  {
    transactionTitle: "Bershka Shopping",
    transactionAmount: "150.00",
    transactionCategory: "Shopping",
    transactionDate: "Oct 22, 2024",
    transactionType: "Expense",
    swipeEnabled: false,
  },
  {
    transactionTitle: "Gas",
    transactionAmount: "10.00",
    transactionCategory: "Vehicule & Transportation",
    transactionDate: "Oct 15, 2024",
    transactionType: "Expense",
    swipeEnabled: false,
  },
];

const TransactionHistoryWidget = () => {
  return (
    <View className="rounded-lg mt-3 p-4 bg-white">
      {BudgetTransaction.map((item) => (
        <TransactionCard
          transactionDate={item.transactionDate}
          transactionType={item.transactionType}
          transactionTitle={item.transactionTitle}
          transactionAmount={item.transactionAmount}
          transactionCategory={item.transactionCategory}
        />
      ))}
    </View>
  );
};

export default TransactionHistoryWidget;
