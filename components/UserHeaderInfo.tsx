import { View, Text } from "react-native";
import React from "react";

import AntDesign from "@expo/vector-icons/AntDesign";

const UserHeaderInfo = () => {
  return (
    <View className="w-full flex-row p-1">
      <View className="w-[20%] flex justify-center items-center">
        <View className=" w-[50px] h-[50px] rounded-full border-[2px] border-[#32D74B] flex justify-center items-center bg-white">
          <AntDesign name="user" size={40} color="black" />
        </View>
      </View>
      <View className="w-[80%] flex justify-center">
        <Text className="font-pmedium text-base text-white">Hello</Text>
        <Text className="font-pmedium text-lg text-white">Saer El Masri</Text>
      </View>
    </View>
  );
};

export default UserHeaderInfo;
