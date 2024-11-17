import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
const BudgetSummary = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <View className="w-full h-full p-3">
          {/* Title Section */}
          <View className="p-4 flex items-start space-y-3 justify-center items-center">
            <Text className="text-black font-psemibold text-3xl text-center">
              You're all set up!
            </Text>
            <Text className="text-black font-pregular text-base text-center">
              Great job! Remember, you can edit everything you've just entered
              and add new categories later on
            </Text>
          </View>

          <CustomButton
            title="Finish"
            handlePress={() => {
              console.log("Finish");
            }}
            containerStyle="bg-[#05603A] h-[50px] w-[140px]"
            textStyle={"text-[#FCFCFC]"}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BudgetSummary;
