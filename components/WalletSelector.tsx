import React, { useRef } from "react";
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

const WalletSelector = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  // Fixed renderItem to return the JSX
  const renderItem = ({ item }: { item: any }) => {
    return (
      <HomeWalletCard
        accountName={item.accountName}
        colorCard={item.colorCard}
        currency={item.currency}
        cardStyle="h-[80px]"
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
