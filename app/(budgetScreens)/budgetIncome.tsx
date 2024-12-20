import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

const BudgetIncome = () => {
  const [income, setIncome] = useState("");

  const handleIncome = () => {
    if (income === "") {
      Alert.alert(
        "Invalid Input",
        "Please enter a valid income before proceeding."
      );
      return;
    }

    router.push({
      pathname: "/budgetCategories",
      params: {
        incomingIncome: income,
      }});

   
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        className="flex-1 h-full"
        style={{
          paddingBottom: 20,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "white",
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
            value={income} // Properly bind state here
            placeholder={"Your income after taxes"}
            placeholderTextColor="#A9A9A9"
            onChangeText={(value) => setIncome(value)} // Update state on text change
            keyboardType="number-pad" // Optional: Numeric keyboard for income
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View className="absolute bottom-4 right-4">
            <CustomButton
              title="Continue"
              handlePress={() => handleIncome()}
              containerStyle="w-[150px] bg-[#05603A] rounded-4xl"
              textStyle={"text-[#FCFCFC]"}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default BudgetIncome;
