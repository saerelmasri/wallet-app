import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { currencySigns, displayAmount } from "@/helpers/common-helper";

type WalletsType = {
  id: string;
  accountName: string;
  colorCard: string;
  currency: "dolar" | "euro";
  balance?: number;
  cardStyle?: string;
  onSelect?: (walletInfo: { id: string; accountName: string }) => void;
  selected?: boolean;
};

const HomeWalletCard = ({
  id,
  accountName,
  balance,
  colorCard,
  currency,
  cardStyle,
  onSelect,
  selected,
}: WalletsType) => {
  const handlePress = () => {
    if (onSelect) {
      // Use the onSelect callback to send wallet info for filtering
      onSelect({
        id,
        accountName,
      });
    } else {
      // Default to navigating to the wallet details screen
      router.push({
        pathname: "/wallet",
        params: {
          accountName: accountName,
          balance: balance,
          currency: currency,
          cardColor: colorCard,
        },
      });
    }
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        backgroundColor: colorCard,
        borderWidth: selected ? 2 : 0, // Show border if selected
        borderColor: selected ? "#FFD700" : "transparent", // Gold color for selection
      }}
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
