import { View, Text, Dimensions } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");

type WalletsType = {
  title: string;
  amount: number;
  colorCard: string;
};

const HomeWalletCard = ({ title, amount, colorCard }: WalletsType) => {
  const CARD_WIDTH = width / 2.3;
  return (
    <View
      className={`bg-[${colorCard}] w-[${CARD_WIDTH}px] h-[100px] rounded-xl p-5 m-3 justify-center items-center`}
    >
      <Text className="font-psemibold text-white text-lg mb-1">{title}</Text>
      <Text className="font-psemibold text-white text-2xl">$ {amount}</Text>
    </View>
  );
};

export default HomeWalletCard;
