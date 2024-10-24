import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import React from "react";
import WalletSlider from "@/components/WalletSlide";
import Chip from "@/components/Chip";
import TransactionHistoryWidget from "@/components/TransactionHistoryWidget";
import GoalsWidget from "@/components/GoalsWidget";
import UserHeaderInfo from "@/components/UserHeaderInfo";
import LoanCard from "@/components/LoanCard";
import AllTransactionCard from "@/components/AllTransactionCard";

const Home = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Set the status bar style */}
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* SafeAreaView only for the content */}
      <SafeAreaView className="flex-1 h-full">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }}
        >
          {/* Profile */}
          <UserHeaderInfo />

          {/* Balance and Wallet Slider Section */}
          <View className="w-full flex-col p-3">
            <View className="w-full flex-row justify-between items-center p-2">
              <Text className="font-pregular text-sm text-black">
                Total Balance
              </Text>
            </View>
            <View className="w-full justify-end items-start">
              <Text className="font-psemibold text-4xl text-black pl-2">
                $950,400
              </Text>
            </View>
          </View>

          {/* Wallet Slider */}
          <WalletSlider />

          <View className="w-full flex-row justify-around p-3">
            <AllTransactionCard />
            <LoanCard />
          </View>

          {/* Chip Section */}
          <View className="w-full flex-row justify-around p-3">
            <Chip title="Overview" />
            <Chip title="Report" />
            <Chip title="Investment" />
          </View>

          {/* Transaction History Widgets */}
          <TransactionHistoryWidget />

          {/* Goals Widget */}
          <GoalsWidget />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;
