import React, { useState, useRef } from "react";
import { View, Text, FlatList, Dimensions, Animated } from "react-native";
import HomeWalletCard from "./HomeWalletCard";

const { width, height } = Dimensions.get("window");

const data = [
  {
    id: "1",
    title: "Personal Wallet",
    amount: 2548,
    colorCard: "#32D74B",
  },
  {
    id: "2",
    title: "Savings Wallet",
    amount: 2548,
    colorCard: "#2F7E79",
  },
  {
    id: "3",
    title: "Savings Wallet",
    amount: 2548,
    colorCard: "#32D74B",
  },
  {
    id: "4",
    title: "Savings Wallet",
    amount: 222548,
    colorCard: "#2F7E79",
  },
];

const WalletSlider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  // @ts-ignore
  const renderItem = ({ item }) => (
    <HomeWalletCard
      title={item.title}
      amount={item.amount}
      colorCard={item.colorCard}
    />
  );

  return (
    <View className="w-full flex justify-start items-center pl-3">
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
          { useNativeDriver: false }
        )}
      />

      {/* Pagination Dots */}
      {/* <View className="flex-row mt-4">
        {[...Array(Math.ceil(data.length / 2))].map((_, i) => (
          <View
            key={i}
            className={`w-2 h-2 rounded-full mx-1 ${
              i === activeIndex ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </View> */}
    </View>
  );
};

export default WalletSlider;
