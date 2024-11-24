import { View, Text, SafeAreaView, StatusBar, TextInput } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const BudgetIncome = () => {
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
        <View className="justify-start w-full h-full p-6 space-y-5">
          <Text className="text-black font-psemibold text-3xl">
            Your Income
          </Text>
          <Text className="text-black font-pregular text-sm mt-3">
            Enter your income after taxes, including any deductions, to ensure
            your budget reflects your actual take-home pay.
          </Text>
          <TextInput
            className="w-[250px] border h-12 text-black font-pmedium text-base p-3 rounded-xl"
            value={""}
            placeholder={"Your income after taxes"}
            placeholderTextColor="#A9A9A9"
            onChangeText={() => console.log("Test")}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View className="absolute bottom-4 right-4">
            <CustomButton
              title="Continue"
              handlePress={() => {
                //@ts-ignore
                router.push("/(budgetScreens)/budgetCategories");
              }}
              containerStyle="w-[150px] bg-[#05603A] rounded-4xl"
              textStyle={"text-[#FCFCFC]"}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default BudgetIncome;
