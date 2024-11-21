import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

type TransactionCardType = {
  transactionTitle: string;
  transactionCategory: string;
  transactionAmount: string;
  transactionType: "Income" | "Expense";
  transactionDate?: string;
};

const TransactionCard = (props: TransactionCardType) => {
  const handlePress = () => {
    router.push({
      pathname: "/newTransaction",
      params: {
        transactionTitle: props.transactionTitle,
        transactionCategory: props.transactionCategory,
        transactionAmount: props.transactionAmount,
        transactionType: props.transactionType,
        transactionDate: props.transactionDate,
      },
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.cardContent}>
        <View style={styles.iconContainer}>
          <Text>Logo</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.transactionTitle}>{props.transactionTitle}</Text>
          <View style={styles.row}>
            <AntDesign name="shoppingcart" size={18} color="black" />
            <Text style={styles.categoryText}>{props.transactionCategory}</Text>
          </View>
        </View>
      </View>
      <View style={styles.amountContainer}>
        <Text
          style={[
            styles.amount,
            props.transactionType === "Expense"
              ? styles.expense
              : styles.income,
          ]}
        >
          {props.transactionType === "Expense"
            ? `- $${props.transactionAmount}`
            : `+ $${props.transactionAmount}`}
        </Text>
        <Text style={styles.leftAmount}>left $200.00</Text>
        {props.transactionDate && (
          <Text style={styles.date}>{props.transactionDate}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
    paddingHorizontal: 10,
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    marginLeft: 10,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  categoryText: {
    fontSize: 12,
    color: "black",
    opacity: 0.7,
    marginLeft: 4,
  },
  amountContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  amount: {
    fontSize: 18,
    fontWeight: "600",
  },
  expense: {
    color: "#FF000F",
  },
  income: {
    color: "#04EE7E",
  },
  date: {
    fontSize: 10,
    color: "black",
    opacity: 0.7,
  },
  leftAmount: {
    fontSize: 13,
    color: "black",
    opacity: 1,
    margin: 3,
  },
});

export default TransactionCard;
