import { View, SafeAreaView, StatusBar, Text } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import FormInputText from "@/components/FormInputText";
import FormInputDropdown from "@/components/FormInputDropdown";
import FormDatePicker from "@/components/FormDatePicker";

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

const AddTransaction = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* SafeAreaView only for the content */}
      <SafeAreaView className="flex-1 h-full items-center">
        <View className="w-full items-center">
          <Text className="font-pmedium text-2xl text-white text-center">
            Create a New Wallet
          </Text>
          <View className="border-[0.3px] border-black opacity-20 w-[90%]" />
          <FormInputText
            title="For"
            value={""}
            placeHolder="Rent"
            handleTextChange={""}
          />
          <View className="border-[0.3px] border-black opacity-20 w-[90%]" />
          <FormDatePicker />
          <View className="border-[0.3px] border-black opacity-20 w-[90%]" />
          <View
            className={`bg-white p-3 flex-row justify-between items-center w-full`}
          >
            {/* Title above the form field */}
            <Text
              className="text-base text-black font-psemibold "
              style={{ width: 100, paddingLeft: 20 }}
            >
              Repeat
            </Text>

            {/* TextInput Field */}
            
          </View>
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

export default AddTransaction;
