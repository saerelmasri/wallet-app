import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import CollapsibleView from "@/components/BudgetScreenComponents/CollapsibleView";
import { TestData } from "@/constants/MockData";
import { displayAmount } from "@/helpers/common-helper";
import { router } from "expo-router";

const BudgetSummary = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }} // Add bottom padding to avoid overlap with the button
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View className="p-4 flex items-center space-y-3 justify-center">
          <Text className="text-black font-psemibold text-3xl text-center">
            You're all set up!
          </Text>
          <Text className="text-black font-pregular text-base text-center">
            Great job! Remember, you can edit everything you've just entered
            and add new categories later on.
          </Text>
        </View>

        {/* Summary Section */}
        <View>
          {TestData.map((item, index) => (
            <CollapsibleView
              key={index} // Add key for each mapped element
              title={item.title}
              breakdown={item.breakdown}
              usedPercentage={item.usedPercentage}
            />
          ))}
        </View>

        {/* Budget Summary */}
        <View className="w-full mt-5 p-3 space-y-2">
          <Text className="text-black font-pmedium text-sm">
            Your initial income: ${displayAmount(1200)}
          </Text>
          <Text className="text-black font-pmedium text-sm">
            Remaining unallocated funds: ${displayAmount(150)}
          </Text>
          <Text className="font-pmedium text-xs text-gray-600">
            Great job! You’ve left some money unallocated. Consider saving
            this amount for emergencies or future goals.
          </Text>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View
        style={{
          position: "absolute",
          bottom: 20, // Use spacing that fits your design
          right: 20,
        }}
      >
        <CustomButton
          title="Finish"
          handlePress={() => {
            router.push("/(tabs)/home");
          }}
          containerStyle="bg-[#05603A] h-[50px] w-[140px]"
          textStyle={"text-[#FCFCFC]"}
        />
      </View>
    </SafeAreaView>
  );
};

export default BudgetSummary;