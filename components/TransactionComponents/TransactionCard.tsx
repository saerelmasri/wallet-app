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
          <Text className="text-sm font-pmedium text-black">
            {props.transactionTitle !== "" && props.goalName === ""
              ? props.transactionTitle
              : props.transactionTitle === "" && props.goalName !== ""
              ? props.goalName
              : "📈"}
          </Text>
          <View style={styles.row}>
            <Text className="text-xs text-black font-pregular opacity-70">
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
        <Text className="text-base font-psemibold text-[#FF000F]">
          {`- $${props.transactionAmount}`}
        </Text>
        {props.transactionDate && (
          <Text className="text-xs text-black opacity-70">{props.transactionDate}</Text>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  amountContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  income: {
    color: "#04EE7E",
  },
  leftAmount: {
    fontSize: 13,
    color: "black",
    opacity: 1,
    margin: 3,
  },
});

export default TransactionCard;
