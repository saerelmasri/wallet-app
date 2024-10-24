import { View, Text } from "react-native";
import React from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

const AllTransactionCard = () => {
  return (
    <View className="w-[190px] h-[180px] bg-[#D3D3D3] rounded-xl flex">
      <View className="h-[60%] w-full flex justify-center p-3">
        <View className="mt-3 w-[50px] h-[50px] rounded-xl bg-white flex justify-center items-center">
          <Ionicons name="wallet" size={32} color="black" />
        </View>
        <Text className="font-pregular text-lg uppercase text-black mt-3">
          All Operation
        </Text>
      </View>
      <View className="h-[40%] w-full flex justify-end p-3">
        <Text className="font-pregular text-sm text-black opacity-70">
          Expenses in Sep, 2024
        </Text>
        <Text className="font-psemibold text-2xl text-black">$ 1,500.20</Text>
      </View>
    </View>
  );
};

export default AllTransactionCard;
