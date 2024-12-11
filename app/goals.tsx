import GoalProgressCard from "@/components/PlanningComponents/GoalProgressCard";
import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { MockGoals } from "@/constants/MockData";
import { displayAmount } from "@/helpers/common-helper";
import { getAuth } from "firebase/auth";
import { getAllUserGoals, getSavingAmount } from "@/api/database/goalFunctions";

const Goals = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const [error, setError] = useState<string | null>(null);
  const [totalSaved, setTotalSaved] = useState<number>(0);
  const [userGoals, setUserGoals] = useState<any>([]);

  useEffect(() => {
    const fetchTotalSavings = async () => {
      const result = await getSavingAmount(userId as string);
      if (result instanceof Error) {
        setError(result.message);
      } else {
        setTotalSaved(result);
      }
    };

    fetchTotalSavings();
  }, []);

  useEffect(() => {
    const fetchUserGoals = async () => {
      const result = await getAllUserGoals(userId as string);
      if (result instanceof Error) {
        setError(result.message);
      } else {
        setUserGoals(result);
      }
    };

    fetchUserGoals();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView className="flex-1 h-full">
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <View className="w-full p-3 space-y-2">
            {/* Goal completed message */}
            {/* <View className="border w-full flex-row p-3 rounded-lg justify-center items-center">
              <View className="w-[60px] h-[60px] rounded-lg bg-slate-600 justify-center items-center">
                <Text>Logo</Text>
              </View>
              <View className="ml-2 w-[80%] p-1">
                <Text className="text-black text-sm font-psemibold ">
                  You've hit your goal!🎉
                </Text>
                <Text className="text-black text-sm font-pregular ">
                  Big win today, Saer. You saved your entire Madrid Trip goal of
                  $1,200.00
                </Text>
              </View>
            </View> */}
            <View className="border w-full p-3 rounded-lg">
              <Text className="text-black text-xl font-pmedium  mt-1">
                Savings
              </Text>
              <Text className="text-black text-lg font-plight  mt-1">
                Total Savings
              </Text>
              <Text className="text-black text-2xl font-psemibold  mt-1">
                ${displayAmount(totalSaved)}
              </Text>

              <View className="w-full h-[1px] mt-4 mb-4 bg-black" />

              {userGoals.length > 0 ? (
                userGoals.map(
                  (
                    item: {
                      goalTitle: string;
                      amountSaved: number;
                      goalEmoji: string;
                      goalProgress: number;
                      goalAmount: number;
                    },
                    key: React.Key | null | undefined
                  ) => (
                    <GoalProgressCard
                      key={key}
                      goalTitle={item.goalTitle}
                      amountSaved={item.amountSaved}
                      goalEmoji={item.goalEmoji}
                      goalProgress={item.goalProgress}
                      goalAmount={item.goalAmount}
                    />
                  )
                )
              ) : (
                <View className="w-full justify-center items-center p-3">
                  <Text className="text-black font-psemibold text-xs text-center">
                    No goals yet! Create some and keep track of them!
                  </Text>
                </View>
              )}

              <TouchableOpacity
                onPress={() => {
                  router.push("/newGoal");
                }}
                className="border mt-4 flex-row p-3 rounded-xl justify-between items-center"
              >
                <View className="flex-row items-center space-x-2">
                  <Ionicons name="add-circle-outline" size={35} color="black" />
                  <Text className="text-black text-xl font-pmedium">
                    Create goal
                  </Text>
                </View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Goals;
