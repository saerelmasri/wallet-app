import { View, Text } from "react-native";
import React from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

const LoanCard = () => {
  return (
    <View className="w-[190px] h-[180px] bg-white border border-black rounded-xl flex">
      <View className="h-[70%] w-full flex justify-center p-3">
        <View className="w-[50px] h-[50px] rounded-xl bg-[#D3D3D3] flex justify-center items-center mt-3">
          <Ionicons name="wallet" size={32} color="black" />
        </View>
        <Text className="font-pregular text-lg uppercase text-black">
          Car Loan
        </Text>
        <Text className="font-psemibold text-2xl text-black">$ 1,500.20</Text>
      </View>
      <View className="h-[30%] w-full p-3">
        <View className="rounded-md bg-[#416546] w-full h-full flex justify-center items-center">
          <Text className="text-[#32D74B] opacity-100">
            Next payment in 6 days
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoanCard;
