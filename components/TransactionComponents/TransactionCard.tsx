import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

type TransactionCardType = {
  transactionTitle: string;
  transactionAmount: string;
  transactionDate?: string;
  categoryName?: string;
  categoryColor?: string;
  categoryEmoji?: string;
  goalName?: string;
  goalColor?: string;
  goalEmoji?: string;
};

const TransactionCard = (props: TransactionCardType) => {
  const handlePress = () => {
    router.push({
      pathname: "/newTransaction",
      params: {
        transactionTitle: props.transactionTitle,
        transactionAmount: props.transactionAmount,
        transactionDate: props.transactionDate,
      },
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.cardContent}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor:
              props.categoryColor !== "" && props.goalColor === ""
                ? props.categoryColor
                : props.categoryColor === "" && props.goalColor !== ""
                ? props.goalColor
                : "#F0F0F0",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text className="text-3xl">
            {props.categoryEmoji !== "" && props.goalEmoji === ""
              ? props.categoryEmoji
              : props.categoryEmoji === "" && props.goalEmoji !== ""
              ? props.goalEmoji
              : "📈"}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.transactionTitle}>
            {props.transactionTitle !== "" && props.goalName === ""
              ? props.transactionTitle
              : props.transactionTitle === "" && props.goalName !== ""
              ? props.goalName
              : "📈"}
          </Text>
          <View style={styles.row}>
            <Text style={styles.categoryText}>
              {props.categoryName !== "" && props.goalName === ""
                ? props.categoryName
                : props.categoryName === "" && props.goalName !== ""
                ? ""
                : "📈"}
            </Text>
          </View>
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
