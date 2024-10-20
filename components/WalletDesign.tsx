import { View, Text, Image } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  cardDesign,
  currencySigns,
  displayAmount,
} from "@/helpers/common-helper";

type WalletDesignType = {
  accountName: string;
  balance: number;
  currency: "dolar" | "euro";
  cardColor: "#2F7E79" | "#32D74B" | "#05603A" | "#000000" | "#FFFFFF";
  income?: number;
  expense?: number;
};

const WalletDesign = ({
  accountName,
  balance,
  currency,
  cardColor,
  income,
  expense,
}: WalletDesignType) => {
  const getTailwindBgClass = (cardColor: string) => {
    switch (cardColor) {
      case "#2F7E79":
        return "bg-[#2F7E79]";
      case "#32D74B":
        return "bg-[#32D74B]";
      case "#05603A":
        return "bg-[#05603A]";
      case "#000000":
        return "bg-black";
      case "#FFFFFF":
        return "bg-white";
      default:
        return "bg-transparent"; // Fallback if color not found
    }
  };
  return (
    <View className=" w-[92%] h-[230px] rounded-2xl flex-row">
      <View
        className={`w-[65%] h-full rounded-tl-[16px] rounded-bl-[16px] ${getTailwindBgClass(
          cardColor
        )} flex justify-center p-4`}
      >
        <Text
          className={`font-plight text-${
            cardColor === "#FFFFFF" ? "black" : "white"
          } text-base uppercase`}
        >
          Account Name
        </Text>
        <Text
          className={`font-pregular text-${
            cardColor === "#FFFFFF" ? "black" : "white"
          } text-xl mb-2`}
        >
          {accountName}
        </Text>
        <Text
          className={`font-plight text-${
            cardColor === "#FFFFFF" ? "black" : "white"
          } text-base uppercase`}
        >
          Balance
        </Text>
        <Text
          className={`font-pregular text-${
            cardColor === "#FFFFFF" ? "black" : "white"
          } text-xl`}
        >
          {currencySigns[currency]} {displayAmount(balance)}
        </Text>
        <View className="w-full h-[40%] mt-2 flex">
          <View className="h-[50%] flex-row justify-between items-center">
            <View className="flex-row items-center space-x-1">
              <View
                className="w-[30px] h-[30px] rounded-full justify-center items-center"
                style={{
                  backgroundColor: ` ${
                    cardColor === "#FFFFFF"
                      ? "rgba(0, 0, 0, 0.4)"
                      : "rgba(255, 255, 255, 0.4)"
                  }`,
                }}
              >
                <AntDesign
                  name="arrowdown"
                  size={15}
                  color="white"
                  style={{ opacity: 1 }}
                />
              </View>
              <Text
                className={`font-pregular text-${
                  cardColor === "#FFFFFF" ? "black" : "white"
                }`}
              >
                Income
              </Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <View
                className="w-[30px] h-[30px] rounded-full justify-center items-center"
                style={{
                  backgroundColor: ` ${
                    cardColor === "#FFFFFF"
                      ? "rgba(0, 0, 0, 0.4)"
                      : "rgba(255, 255, 255, 0.4)"
                  }`,
                }} // Semi-transparent white background
              >
                <AntDesign
                  name="arrowup"
                  size={15}
                  color="white"
                  style={{ opacity: 1 }}
                />
              </View>
              <Text
                className={`font-pregular text-${
                  cardColor === "#FFFFFF" ? "black" : "white"
                }`}
              >
                Expenses
              </Text>
            </View>
          </View>
          <View className="h-[50%] flex-row justify-between items-center">
            <Text
              className={`font-pmedium text-${
                cardColor === "#FFFFFF" ? "black" : "white"
              } text-lg`}
            >
              $ 1,840.00
            </Text>
            <Text
              className={`font-pmedium text-${
                cardColor === "#FFFFFF" ? "black" : "white"
              } text-lg`}
            >
              $ 1,840.00
            </Text>
          </View>
        </View>
      </View>
      <View className="w-[35%] h-full">
        <Image
          source={cardDesign[cardColor]}
          resizeMode="cover"
          style={{
            borderTopRightRadius: "16px",
            borderBottomRightRadius: "16px",
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        />
      </View>
    </View>
  );
};

export default WalletDesign;
