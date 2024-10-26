import React, { useRef, useState } from "react";
import { View, FlatList, Animated } from "react-native";
import HomeWalletCard from "./HomeWalletCard";

const data: any = [
  {
    id: "1",
    accountName: "Personal Wallet",
    colorCard: "#2F7E79",
    currency: "dolar",
  },
  {
    id: "2",
    accountName: "Savings Wallet",
    colorCard: "#32D74B",
    currency: "dolar",
  },
  {
    id: "3",
    accountName: "Savings Wallet",
    colorCard: "#05603A",
    currency: "euro",
  },
  {
    id: "4",
    accountName: "Example Wallet",
    colorCard: "#000000",
    currency: "euro",
  },
  {
    id: "5",
    accountName: "Example Wallet",
    colorCard: "#D3D3D3",
    currency: "euro",
  },
];

const WalletSelector = ({ updateFilterOptions, selected }: any) => {
  const [selectedWalletId, setSelectedWalletId] = useState("");
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleWalletSelect = (walletInfo: {
    id: string;
    accountName: string;
  }) => {
    setSelectedWalletId(walletInfo.id);
    updateFilterOptions((prev: any) => ({
      ...prev,
      wallet: {
        id: walletInfo.id,
        accountName: walletInfo.accountName,
      },
    }));
  };

  // Fixed renderItem to return the JSX
  const renderItem = ({ item }: { item: any }) => {
    return (
      <HomeWalletCard
        id={item.id}
        accountName={item.accountName}
        colorCard={item.colorCard}
        currency={item.currency}
        cardStyle="h-[80px]"
        onSelect={handleWalletSelect}
        selected={item.id === selectedWalletId}
      />
    );
  };

  return (
    <View className="w-full flex justify-start items-start mt-3">
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false } // You can set this to true for better performance
        )}
        contentContainerStyle={{ alignItems: "flex-start" }}
      />
    </View>
  );
};

export default WalletSelector;
