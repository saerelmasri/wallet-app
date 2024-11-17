import { View, Text, SafeAreaView, StatusBar, TextInput } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const BudgetPeriod = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView
        className="flex-1 h-full"
        style={{
          paddingBottom: 20,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View className="justify-center items-center w-full h-full p-3 space-y-5">
          <View className="p-4 flex justify-center items-center ">
            <Text className="text-black font-psemibold text-3xl text-center">
              Your Income
            </Text>
            <Text className="text-black font-pregular text-sm mt-3 text-center">
              Your regular income will be the amount you have to budget for.
              Feel free to make an estimation as you can update this later.
            </Text>
          </View>
          <View className="w-full justify-center items-center p-3">
            <TextInput
              className="w-[90%] border h-18 text-black font-pmedium text-base p-3 rounded-xl"
              value={""}
              placeholder={"Your income after taxes"}
              placeholderTextColor="#A9A9A9"
              onChangeText={() => console.log("Test")}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View className="w-full justify-center items-center pt-3 pb-3">
            <CustomButton
              title="Continue"
              handlePress={() => {
                //@ts-ignore
                router.push("/(budgetScreens)/budgetCategories");
              }}
              containerStyle="w-[90%] bg-[#05603A]"
              textStyle={"text-[#FCFCFC]"}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default BudgetPeriod;
