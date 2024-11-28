import { View, Text, SafeAreaView, ScrollView, StatusBar } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import GoalProgressCircle from "@/components/HomeComponents/GoalProgressCircle";
import UpcomingPayments from "@/components/HomeComponents/nextPayments";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import BudgetCard from "@/components/HomeComponents/BudgetCard";
import { Categories } from "@/constants/Category";
import { displayAmount } from "@/helpers/common-helper";

const Home = () => {
  // Clean up the stack by replacing it with only the home screen
  const router = useRouter();
  useFocusEffect(
    useCallback(() => {
      router.replace("/(tabs)/home");
    }, [router])
  );

  const [monthly, setMonthly] = useState<number | null>(null);
  const [unallocated, setUnallocated] = useState<number | null>(null);

  useEffect(() => {
    const monthlyFromParams = 1500;
    const unallocatedFromParams = 500;

    setMonthly(Number(monthlyFromParams));
    setUnallocated(Number(unallocatedFromParams));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView className="flex-1 h-full">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }}
        >
          <View className="w-full flex-row p-3 items-center">
            {/* Remaining budget of the month*/}
            <View className="bg-white p-3 w-full">
              {monthly && unallocated ? (
                <>
                  <View className=" flex-row justify-between">
                    <View>
                      <Text className="font-pregular text-xs text-black text-left">
                        My budget for Nov
                      </Text>
                      <Text className="font-psemibold text-xl text-black tracking-tighter text-left">
                        $ {displayAmount(monthly)}
                        <Text className="font-pmedium text-xs text-black text-left">
                          {" "}
                          left
                        </Text>
                      </Text>
                      <Text className="font-pregular text-xs text-black tracking-tighter text-left">
                        09 days left in Nov
                      </Text>
                    </View>
                    <View>
                      <Text className="font-pregular text-xs text-black text-right">
                        Unallocated Money
                      </Text>
                      <Text className="font-psemibold text-xl text-black tracking-tighter text-right">
                        $ {displayAmount(unallocated)}
                      </Text>
                    </View>
                  </View>
                </>
              ) : (
                <Text className="font-psemibold text-sm text-black tracking-tighter text-left">
                  Your monthly budget has not been set up yet. Please build your
                  budget
                </Text>
              )}
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
