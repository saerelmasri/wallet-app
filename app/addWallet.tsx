import {
  View,
  SafeAreaView,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import images from "@/constants/images";
import FormFieldApp from "@/components/FormFieldApp";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const AddWallet = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#2C2C2C" }}>
      {/* Set the status bar style */}
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Background Image */}
      <Image
        source={images.effect}
        resizeMode="cover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />

      {/* SafeAreaView only for the content */}
      <SafeAreaView className="flex-1 h-full">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }}
        >
          <View className="w-full p-5 items-center">
            <Image
              source={images.wallet}
              resizeMode="contain"
              className="w-[100px] h-[100px]"
            />
            <Text className="font-pmedium text-2xl text-white text-center">
              Create a New Wallet
            </Text>
            <FormFieldApp
              title="Wallet Name"
              value={""}
              placeHolder="Personal Savings"
              handleTextChange={""}
              otherStyles="mt-5"
            />
            <FormFieldApp
              title="Initial Balance"
              value={""}
              placeHolder="0.00"
              handleTextChange={""}
              otherStyles="mt-5"
            />
            <FormFieldApp
              title="Currency"
              value={""}
              placeHolder="USD"
              handleTextChange={""}
              otherStyles="mt-5"
            />
          </View>
          <View className="w-full pl-10">
            <Text className="font-pregular text-base text-white mt-2 text-left">
              Choose your color
            </Text>
          </View>
          <View className="w-full p-10 flex-row justify-center items-center space-x-5">
            <TouchableOpacity className="w-[50px] h-[50px] rounded-full bg-[#32D74B]" />
            <TouchableOpacity className="w-[50px] h-[50px] rounded-full bg-[#2F7E79]" />
            <TouchableOpacity className="w-[50px] h-[50px] rounded-full bg-[#05603A]" />
            <TouchableOpacity className="w-[50px] h-[50px] rounded-full bg-black" />
            <TouchableOpacity className="w-[50px] h-[50px] rounded-full bg-white" />
          </View>
          <CustomButton
            title="Create"
            handlePress={() => {}}
            containerStyle="mt-7 w-[90%] bg-[#05603A]"
            textStyle={"text-[#FCFCFC]"}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AddWallet;
