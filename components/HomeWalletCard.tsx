import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { currencySigns, displayAmount } from "@/helpers/common-helper";

type WalletsType = {
  accountName: string;
  balance: number;
  colorCard: string;
  currency: "dolar" | "euro";
};

const HomeWalletCard = ({
  accountName,
  balance,
  colorCard,
  currency,
}: WalletsType) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/wallet",
          params: {
            accountName: accountName,
            balance: balance,
            currency: currency,
            cardColor: colorCard,
          },
        })
      }
      style={{ backgroundColor: colorCard }}
      className="w-[150px] h-[120px] rounded-2xl p-4 m-2 justify-between shadow-lg"
    >
      {/* Wallet Icon at the top */}
      <View className="flex-row justify-between items-center">
        <Ionicons
          name="wallet-outline"
          size={20}
          color={colorCard === "#FFFFFF" ? "black" : "white"}
        />
      </View>

      {/* Wallet Information */}
      <View>
        <Text
          className={`font-medium text-${
            colorCard === "#FFFFFF" ? "black" : "white"
          } text-sm mb-1`}
        >
          {accountName}
        </Text>
        <Text
          className={`font-bold text-${
            colorCard === "#FFFFFF" ? "black" : "white"
          } text-lg`}
        >
          {currencySigns[currency]} {displayAmount(balance)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeWalletCard;
