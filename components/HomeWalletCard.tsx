import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type WalletsType = {
  title: string;
  amount: number | undefined; // Ensure amount is a number or undefined
  colorCard: string;
};

const HomeWalletCard = ({ title, amount, colorCard }: WalletsType) => {
  // Format the amount with commas and two decimal places
  const displayAmount =
    typeof amount === "number"
      ? amount.toLocaleString("en-US", { minimumFractionDigits: 2 })
      : "0.00";

  return (
    <View
      style={{ backgroundColor: colorCard }}
      className="w-[150px] h-[120px] rounded-2xl p-4 m-2 justify-between shadow-lg"
    >
      {/* Wallet Icon at the top */}
      <View className="flex-row justify-between items-center">
        <Ionicons name="wallet-outline" size={20} color="white" />
      </View>

      {/* Wallet Information */}
      <View>
        <Text className="font-medium text-white text-sm mb-1">{title}</Text>
        <Text className="font-bold text-white text-lg">$ {displayAmount}</Text>
      </View>
    </View>
  );
};

export default HomeWalletCard;
