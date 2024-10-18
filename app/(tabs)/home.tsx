import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import React from "react";
import images from "@/constants/images";
import { Link } from "expo-router";
import WalletSlider from "@/components/WalletSlide";
import Chip from "@/components/Chip";
import TransactionHistoryWidget from "@/components/TransactionHistoryWidget";
import GoalsWidget from "@/components/GoalsWidget";
import UserHeaderInfo from "@/components/UserHeaderInfo";
import LoanCard from "@/components/LoanCard";
import AllTransactionCard from "@/components/AllTransactionCard";

const Home = () => {
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
          {/* Profile */}
          <UserHeaderInfo />

          {/* Balance and Wallet Slider Section */}
          <View className="w-full flex-col p-3">
            <View className="w-full flex-row justify-between items-center p-2">
              <Text className="font-pregular text-sm text-white">
                Total Balance
              </Text>
              <Link href={"/wallets"} className="font-pregular text-sm text-white">
                View All
              </Link>
            </View>
            <View className="w-full justify-end items-start">
              <Text className="font-psemibold text-4xl text-white pl-2">
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
