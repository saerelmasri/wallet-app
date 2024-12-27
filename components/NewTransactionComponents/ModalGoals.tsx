import { View, Text, Modal, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getAllUserGoals, GoalType } from "../../api/database/goalFunctions";

type ModalGoalTypes = {
  modalGoalVisible: boolean;
  setModalGoalVisible: (value: boolean) => void;
  handleGoalChange: any;
  selectedGoal: any;
  userId: string;
};

const ModalGoals = (props: ModalGoalTypes) => {
  const [usersGoal, setUsersGoal] = useState<GoalType[] | null>(null);

  // Fetch user's category from db
  useEffect(() => {
    const usersGoal = async () => {
      const result = await getAllUserGoals(props.userId as string);
      if (result instanceof Error) {
        console.log("Error fetching user:", result.message);
        return;
      }
      setUsersGoal(result as any);
    };
    usersGoal();
  }, [props.userId]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalGoalVisible}
      onRequestClose={() => props.setModalGoalVisible(false)}
    >
      <View
        style={{
          backgroundColor: "transparent",
        }}
        className="flex-1 justify-end"
      >
        <View className="h-[50%] bg-white rounded-tl-3xl rounded-tr-3xl p-4 border border-black">
          <View className="w-full flex-row justify-between items-center">
            <View />
            <Text className="font-pmedium text-lg">Repeats</Text>
            <TouchableOpacity onPress={() => props.setModalGoalVisible(false)}>
              <MaterialCommunityIcons
                name="window-close"
                size={28}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View className="mt-5 flex items-center">
            {usersGoal?.map((item, index) => (
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
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalGoals;
