import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";

type TransactionCardType = {
  transactionTitle: string;
  transactionCategory: string;
  transactionAmount: string;
  transactionType: "Income" | "Expense";
  transactionDate?: string;
  swipeEnabled?: boolean;
};

const TransactionCard = (
  props: TransactionCardType) => {
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (props.swipeEnabled) {
        // Set translation with a limit up to -120 (width of Delete button)
        translateX.value = Math.max(event.translationX, -120);
      }
    })
    .onEnd(() => {
      // Snap open if swiped more than halfway, otherwise close to start position
      if (props.swipeEnabled) {
        translateX.value =
          translateX.value < -60
            ? withSpring(-120, { damping: 12, stiffness: 150 })
            : withSpring(0, { damping: 12, stiffness: 150 });
      }
    });

  // Animated style for card movement
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Animated style for delete button background color fade-in
  const deleteButtonStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      [-120, 0],
      ["red", "rgba(255,0,0,0)"]
    );
    return { backgroundColor };
  });

  return (
    <View style={styles.container}>
      {/* Delete Button */}
      <Animated.View style={[styles.deleteButton, deleteButtonStyle]}>
        <Pressable onPress={() => console.log("Delete")}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </Animated.View>

      {/* Swipeable Card */}
      <GestureDetector gesture={props.swipeEnabled ? panGesture : Gesture.Pan()}>
        <Animated.View style={[styles.card, animatedStyle]}>
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
                props.transactionType === "Expense" ? styles.expense : styles.income,
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
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: 80,
    marginBottom: 10,
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 120,
    height: 60,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
    borderRadius: 8,
  },
  deleteText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    flexDirection: "row",
    paddingHorizontal: 10,
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
    margin: 3
  },
});

export default TransactionCard;
