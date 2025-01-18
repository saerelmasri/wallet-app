import { View, Text, Modal, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getAllUserGoals, GoalType } from "../../api/database/goalFunctions";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Skeleton from "../SkeletonLoader";

type ModalGoalTypes = {
  modalGoalVisible: boolean;
  setModalGoalVisible: (value: boolean) => void;
  handleGoalChange: any;
  selectedGoal: any;
  userId: string;
};

const ModalGoals = (props: ModalGoalTypes) => {
  const [usersGoal, setUsersGoal] = useState<GoalType[] | null>(null);
  const [ isLoading, setIsLoading] = useState<boolean>(false);

    const fadeAnim = useSharedValue(0); // Initial opacity set to 0
  
  // Fetch user's category from db
  useEffect(() => {
    const usersGoal = async () => {
      setIsLoading(true)
      try {
        const result = await getAllUserGoals(props.userId as string);
      if (result instanceof Error) {
        console.log("Error fetching user:", result.message);
        return;
      }
      setUsersGoal(result as any);
      } catch (error) {
        console.error("Unexpected error:", error);
        return new Error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        setIsLoading(false);
      }
    };
    usersGoal();
  }, [props.userId]);

  useEffect(() => {
      if (props.modalGoalVisible) {
        fadeAnim.value = withTiming(1, { duration: 300 }); // Fade in
      } else {
        fadeAnim.value = withTiming(0, { duration: 300 }); // Fade out
      }
    }, [props.modalGoalVisible, fadeAnim]);
  
    // Animated style for modal background opacity
    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: fadeAnim.value,
      };
    });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalGoalVisible}
      onRequestClose={() => props.setModalGoalVisible(false)}
    >
      <Animated.View
        style={[
          {
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
          },
          animatedStyle, // Apply animated style
        ]}
      >
        <View className="h-[50%] bg-white rounded-tl-3xl rounded-tr-3xl p-4 border border-black">
          <View className="w-full flex-row justify-between items-center p-3">
            <Text className="font-pmedium text-lg">Your goals</Text>
            <TouchableOpacity onPress={() => props.setModalGoalVisible(false)}>
              <MaterialCommunityIcons
                name="window-close"
                size={28}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View className="flex items-center">
          {isLoading ? (
            <View className="w-full">
              {[1, 2].map((_, index) => (
                <Skeleton
                  key={index}
                  height={60}
                  width="100%"
                  style={{ marginBottom: 10, borderRadius: 8 }}
                />
              ))}
            </View>
          ) : usersGoal === null || usersGoal.length === 0 ? (
            <View className="w-full items-center justify-center mt-5">
              <Text className="text-gray-500">No goals</Text>
            </View>
          ) : (
            usersGoal?.map((item, index) => (
              <TouchableOpacity
                key={item.id || index}
                className={`w-full flex-row items-center p-4 space-x-3`}
                style={{
                  borderColor:
                    props.selectedGoal?.id === item.id
                      ? "green"
                      : "transparent",
                  borderWidth: props.selectedGoal?.id === item.id ? 2 : 1,
                  borderRadius: props.selectedGoal?.id === item.id ? 7 : 0,
                }}
                onPress={() => {
                  props.handleGoalChange(item);
                }}
              >
                <View
                  style={{ backgroundColor: item.color }}
                  className={`w-[40px] h-[40px] rounded-full flex justify-center items-center`}
                >
                  <Text className="text-lg">{item.emoji}</Text>
                </View>
                <Text className="text-base font-pmedium">{item.goalName}</Text>
              </TouchableOpacity>
            ))
          )}
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default ModalGoals;
