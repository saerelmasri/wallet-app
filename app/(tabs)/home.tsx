import { View, Text, SafeAreaView, ScrollView, StatusBar } from "react-native";
import React, { useCallback } from "react";
import GoalProgressCircle from "@/components/HomeComponents/GoalProgressCircle";
import UpcomingPayments from "@/components/HomeComponents/nextPayments";
import { useFocusEffect, useRouter } from "expo-router";
import BudgetCard from "@/components/HomeComponents/BudgetCard";
import { Categories } from "@/constants/Category";

const Home = () => {
  // Clean up the stack by replacing it with only the home screen
  const router = useRouter();
  useFocusEffect(
    useCallback(() => {
      router.replace("/(tabs)/home");
    }, [router])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView className="flex-1 h-full">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }}
        >
          <View className="w-full flex-row p-3 items-center">
            {/*Profile Pic*/}
            {/* <View className="w-[60%] flex-row">
              <View className="w-[30%] flex justify-center items-center">
                <View className=" w-[50px] h-[50px] rounded-full border-[2px] border-[#32D74B] flex justify-center items-center bg-white">
                  <MaterialCommunityIcons
                    name="account"
                    size={30}
                    color="black"
                  />
                </View>
              </View>
            </View> */}

            {/* Remaining budget of the month*/}
            <View className="bg-white p-3">
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
                09 days left in Nov
              </Text>
            </View>
          </View>

          <View className="w-full flex-row justify-around p-3">
            <GoalProgressCircle />
            <UpcomingPayments />
          </View>

          {/* Transaction History Widgets */}
          <View className="p-3">
            {Categories.slice(0, 3).map((item, key) => (
              <BudgetCard
                budgetCategory={item.name}
                budgetColor={item.color}
                budgetEmoji={item.emoji}
                budgetInitialAmount={2300}
                budgetUsedAmount={1230}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;
