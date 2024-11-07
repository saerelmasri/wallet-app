import { View, Text, SafeAreaView, ScrollView, StatusBar } from "react-native";
import React, { useCallback } from "react";
import GoalProgressCircle from "@/components/GoalProgressCircle";
import UpcomingPayments from "@/components/nextPayments";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFocusEffect, useRouter } from "expo-router";
import { MockBudgetTransaction } from "@/constants/MockTransactions";
import TransactionCard from "@/components/TransactionCard";

const Home = () => {
  // Clean up the stack by replacing it with only the home screen
  const router = useRouter();
  useFocusEffect(
    useCallback(() => {
      router.replace("/home");
    }, [router])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView className="flex-1 h-full">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }}
        >
          <View className="w-full flex-row p-3 justify-between items-center">
            <View className="w-[60%] flex-row">
              <View className="w-[30%] flex justify-center items-center">
                <View className=" w-[50px] h-[50px] rounded-full border-[2px] border-[#32D74B] flex justify-center items-center bg-white">
                  <MaterialCommunityIcons
                    name="account"
                    size={30}
                    color="black"
                  />
                </View>
              </View>
              <View className="w-[80%] flex justify-center">
                <Text className="font-pmedium text-base text-black">Hello</Text>
                <Text className="font-pmedium text-lg text-black">
                  Saer El Masri
                </Text>
              </View>
            </View>
            <View className=" bg-white p-3">
              <Text className="font-pregular text-xs text-black text-right">
                My budget for Nov
              </Text>
              <Text className="font-psemibold text-xl text-black tracking-tighter text-right">
                $ 1,500.20{" "}
                <Text className="font-pmedium text-xs text-black text-right">
                  left
                </Text>
              </Text>
              <Text className="font-pregular text-xs text-black tracking-tighter text-right">
                9 days left in Nov
              </Text>
            </View>
          </View>

          <View className="w-full flex-row justify-around p-3">
            <GoalProgressCircle />
            <UpcomingPayments />
          </View>

          {/* Transaction History Widgets */}
          <View className="rounded-lg mt-3 p-4 bg-white">
            {MockBudgetTransaction.map((item) => (
              <TransactionCard
                transactionDate={item.transactionDate}
                transactionType={item.transactionType}
                transactionTitle={item.transactionTitle}
                transactionAmount={item.transactionAmount}
                transactionCategory={item.transactionCategory}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;
