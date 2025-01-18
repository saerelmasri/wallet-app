import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import ProgressCircle from "../ProgressCircle";
import { router } from "expo-router";
import { displayAmount, showAlert } from "../../helpers/common-helper";
import {
  getAllUserGoals,
  getSavingAmount,
} from "../../api/database/goalFunctions";
import { getAuth } from "firebase/auth";

const GoalProgressCircleV2 = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const [totalSaved, setTotalSaved] = useState<number>(0);
  const [userGoals, setUserGoals] = useState<any>([]);

  useEffect(() => {
    const fetchTotalSavings = async () => {
      try {
        const result = await getSavingAmount(userId as string);
        if (result instanceof Error) {
          showAlert("Error", result.message);
        }
        setTotalSaved(result as number);
      } catch (error) {
        console.error("Unexpected error:", error);
        return new Error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      }
    };

    const fetchUserGoals = async () => {
      try {
        const result = await getAllUserGoals(userId as string);
        if (result instanceof Error) {
          showAlert("Error", result.message);
        }
        setUserGoals(result);
      } catch (error) {
        console.error("Unexpected error:", error);
        return new Error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      }
    };

    fetchTotalSavings();
    fetchUserGoals();
  }, [userId]);

  return (
    <TouchableOpacity
      className="w-full border border-black bg-white rounded-xl flex-row justify-center"
      onPress={() => {
        router.push("/goals");
      }}
    >
      <View className="w-[40%] flex justify-center p-3">
        <Text className="font-pregular text-xs text-black">Total Savings</Text>
        <Text className="font-psemibold text-2xl text-black mt-2">
          ${displayAmount(totalSaved)}
        </Text>
      </View>
      <View className="w-[60%] flex p-3 justify-center">
        <View className=" flex-row">
          {userGoals
            .slice(0, 4)
            .map((item: { emoji: string; saved: number; target: number }) => (
              <ProgressCircle
                progress={item.target > 0 ? item.saved / item.target : 0}
                size={37}
                thickness={3}
                icon={item.emoji}
                extraStyle="mr-1"
              />
            ))}
        </View>
        <View className=" flex-row p-1">
          <Text className="text-black text-xs font-pmedium">
            {userGoals.length > 4
              ? "+4 active goals"
              : `${userGoals.length} active goals`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GoalProgressCircleV2;
