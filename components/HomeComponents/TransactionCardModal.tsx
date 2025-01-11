import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
// import { router } from "expo-router";

type TransactionCardModelType = {
  transactionTitle: string;
  transactionAmount: string;
  transactionDate?: string;
  categoryName?: string;
  categoryColor?: string;
  categoryEmoji?: string;
};

const TransactionCardModel = (props: TransactionCardModelType) => {
  // const handlePress = () => {
  //   router.push({
  //     pathname: "/newTransaction",
  //     params: {
  //       transactionTitle: props.transactionTitle,
  //       transactionAmount: props.transactionAmount,
  //       transactionDate: props.transactionDate,
  //     },
  //   });
  // };

  return (
    <TouchableOpacity style={styles.container} className="border">
      <View style={styles.cardContent}>
        <View style={styles.details}>
          <Text style={styles.transactionTitle}>
            {props.transactionTitle !== ""
              ? props.transactionTitle
              : "Transaction Title"}
          </Text>
        </View>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[styles.amount, styles.expense]}>
          {`- $${props.transactionAmount}`}
        </Text>
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
    height: 60,
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

export default TransactionCardModel;
