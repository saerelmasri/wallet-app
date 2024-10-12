import {
  View,
  Text,
  SafeAreaView,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import images from "@/constants/images";
import { Link } from "expo-router";
import WalletSlider from "@/components/WalletSlide";

import Ionicons from "@expo/vector-icons/Ionicons";
import AllTransactionCard from "@/components/AllTransactionCard";
import LoanCard from "@/components/LoanCard";
import Chip from "@/components/Chip";
import TransactionCard from "@/components/TransactionCard";

import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const Home = () => {
  return (
    <SafeAreaView className="bg-[#2C2C2C] h-full w-full">
      <View className="flex-1 relative items-center">
        <Image
          source={images.effect}
          resizeMode="cover"
          className="absolute top-[-100px] left-0 w-full h-full z-[-1]"
        />
        <View className="w-full flex-col p-3">
          <View className="w-full flex-row justify-between items-center p-2">
            <Text className="font-pmedium text-base text-white">
              Total Balance
            </Text>
            <Link href={"/home"} className="font-pregular text-sm text-white">
              View All
            </Link>
          </View>
          <View className="w-full justify-end items-start">
            <Text className="font-psemibold text-5xl text-white p-2">
              $950,400
            </Text>
          </View>
        </View>

        <WalletSlider />

        {/* <View className=" w-full flex-row justify-around p-3">
          <AllTransactionCard />
          <LoanCard />
        </View> */}

        <View className="w-full flex-row justify-around p-3">
          <Chip title="Overview" />
          <Chip title="Report" />
          <Chip title="Investment" />
        </View>

        <View className="rounded-xl w-[90%] mt-3 p-4 bg-[#363636]">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="font-psemibold text-lg text-white">
              Transactions history
            </Text>
            <TouchableOpacity>
              <SimpleLineIcons name="options" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
          <TransactionCard
            transactionTitle="AirPods Pro 2"
            transactionAmount="200.00"
            transactionCategory="Shopping"
            transactionDate="12 October 2024"
            transactionType="Expense"
            usedWallet="Savings"
          />
          <TransactionCard
            transactionTitle="Blanco Cafe"
            transactionAmount="10.00"
            transactionCategory="Bar & Cafe"
            transactionDate="10 October 2024"
            transactionType="Expense"
            usedWallet="Wallet"
          />
          <TransactionCard
            transactionTitle="Blanco Cafe"
            transactionAmount="10.00"
            transactionCategory="Bar & Cafe"
            transactionDate="10 October 2024"
            transactionType="Expense"
            usedWallet="Wallet"
          />
          <TransactionCard
            transactionTitle="Monthly Salary"
            transactionAmount="1000.00"
            transactionCategory="Income"
            transactionDate="09 October 2024"
            transactionType="Income"
            usedWallet="Savings"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
