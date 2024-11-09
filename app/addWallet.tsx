import { View, SafeAreaView, StatusBar, Text } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import FormInputText from "@/components/FormInputText";

const colorData = [
  { label: "Green 1", value: "1", color: "#32CD32" },
  { label: "Green 2", value: "2", color: "#228B22" },
  { label: "Green 3", value: "3", color: "#006400" },
  { label: "Black", value: "4", color: "#000000" },
  { label: "White", value: "5", color: "#FFFFFF" },
  { label: "Grey", value: "6", color: "#808080" },
];

const currencyData = [
  { label: "$ USD", value: "dollar" },
  { label: "€ EUR", value: "euro" },
  { label: "£ LBP", value: "lebanese pounds" },
];

const AddWallet = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* SafeAreaView only for the content */}
      <SafeAreaView className="flex-1 h-full items-center">
        <View className="w-full items-center">
          <Text className="font-pmedium text-2xl text-white text-center">
            Create a New Wallet
          </Text>
          <View className="border-[0.5px] border-black w-full" />
          <FormInputText
            title="Wallet Name"
            value={""}
            placeHolder="Personal Savings"
            handleTextChange={""}
          />
          <View className="border-[0.5px] border-black w-full" />
          <FormInputText
            title="Initial Balance"
            value={""}
            placeHolder="0.00"
            handleTextChange={""}
          />
          <View className="border-[0.5px] border-black w-full" />

          <View className="border-[0.5px] border-black w-full" />

          <View className="border-[0.5px] border-black w-full" />
        </View>
        <View className="w-full h-[25vh] justify-end flex items-center">
          <View className="border hidden"></View>
          <CustomButton
            title="Create"
            handlePress={() => {}}
            containerStyle="mt-7 w-[90%] bg-[#05603A]"
            textStyle={"text-[#FCFCFC]"}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AddWallet;
