import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { currencySigns, displayAmount } from "@/helpers/common-helper";

type WalletsType = {
  accountName: string;
  colorCard: string;
  currency: "dolar" | "euro";
  balance?: number;
  cardStyle?: string
};

const HomeWalletCard = ({
  accountName,
  balance,
  colorCard,
  currency,
  cardStyle
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
      className={`w-[150px] rounded-2xl p-4 m-2 justify-between ${cardStyle}`}
    >
      {/* Wallet Icon at the top */}
      <View className="flex-row justify-between items-center">
        <Ionicons
          name="wallet-outline"
          size={20}
          color={colorCard === "#D3D3D3" ? "black" : "white"}
        />
      </View>

      {/* Wallet Information */}
      <View>
        <Text
          className={`font-medium text-${
            colorCard === "#D3D3D3" ? "black" : "white"
          } text-sm mb-1`}
        >
          {accountName}
        </Text>
        {balance && (
          <Text
            className={`font-bold text-${
              colorCard === "#D3D3D3" ? "black" : "white"
            } text-lg`}
          >
            {currencySigns[currency]} {displayAmount(balance)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default HomeWalletCard;
