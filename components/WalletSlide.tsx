import React, { useRef } from "react";
import { View, FlatList, Animated } from "react-native";
import HomeWalletCard from "./HomeWalletCard";
import AddHomeWalletCard from "./AddHomeWalletCard";

const data: any = [
  {
    id: "1",
    accountName: "Personal Wallet",
    balance: 2548,
    colorCard: "#2F7E79",
    currency: "dolar",
  },
  {
    id: "2",
    accountName: "Savings Wallet",
    balance: 248,
    colorCard: "#32D74B",
    currency: "dolar",
  },
  {
    id: "3",
    accountName: "Savings Wallet",
    balance: 2520,
    colorCard: "#05603A",
    currency: "euro",
  },
  {
    id: "4",
    accountName: "Example Wallet",
    balance: 252710,
    colorCard: "#000000",
    currency: "euro",
  },
  {
    id: "5",
    accountName: "Example Wallet",
    balance: 852710,
    colorCard: "#D3D3D3",
    currency: "euro",
  },
];

const addWalletCard = { id: 0, type: "add" };

const WalletSlider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const combinedData = [addWalletCard, ...data];

  // @ts-ignore
  const renderItem = ({ item }) => {
    // Check if the item is the "Add Wallet" card or a regular wallet card
    if (item.type === "add") {
      return <AddHomeWalletCard />;
    } else {
      return (
        <HomeWalletCard
          accountName={item.accountName}
          balance={item.balance}
          colorCard={item.colorCard}
          currency={item.currency}
        />
      );
    }
  };

  return (
    <View className="w-full flex justify-start items-start pl-3">
      <FlatList
        data={combinedData}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ alignItems: "flex-start" }}
        scrollEnabled={combinedData.length > 1}
      />
    </View>
  );
};

export default WalletSlider;
