import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

const AddHomeWalletCard = () => {
  return (
    <TouchableOpacity
      onPress={() => router.push("/addWallet")}
      className="w-[70px] h-[120px] rounded-2xl p-4 m-2 flex justify-center items-center shadow-lg border border-dashed border-[#D3D3D3]"
    >
      {/* Wallet Icon at the top */}
      <Ionicons name="add-circle-outline" size={25} color="#D3D3D3" />
    </TouchableOpacity>
  );
};

export default AddHomeWalletCard;
