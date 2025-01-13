import { View, Text, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import NotificationOption from "./NotificationOption";

type ModalNotification = {
  modalNotificationVisible: boolean;
  setModalNotificationVisible: (value: boolean) => void;
  handleNotificationChange: (value: string) => void;
  currentNotification: string;
};

const ModalNotification = (props: ModalNotification) => {
  const notificationOptions = [
    { emoji: "😶", title: "Don't send", description: "Turn off all reminders" },
    { emoji: "🫡", title: "Gentle", description: "1-2 notifications daily" },
    { emoji: "🫨", title: "Aggressive", description: "4-5 notifications daily" },
    {
      emoji: "😤",
      title: "Relentless",
      description: "You'll feel it (10+ daily)",
    },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalNotificationVisible}
      onRequestClose={() => props.setModalNotificationVisible(false)}
    >
      <View className="flex-1 justify-end">
        <View className="h-[80%] bg-white rounded-tl-3xl rounded-tr-3xl border-black">
          <View className="w-full flex-row justify-end items-center p-5">
            <TouchableOpacity
              onPress={() => props.setModalNotificationVisible(false)}
            >
              <MaterialCommunityIcons
                name="window-close"
                size={28}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View className="mt-5 flex items-center p-4 space-y-2">
            <Text className="text-2xl font-psemibold">Need a reminder?</Text>
            <Text className="text-[14px] font-plight text-center">
              We can seend helpful reminders throughtout the day to remind you
              to track your spending!
            </Text>
          </View>
          <View className="w-full flex p-4">
            {notificationOptions.map((item) => (
              <NotificationOption
                emoji={item.emoji}
                title={item.title}
                description={item.description}
                isSelected={props.currentNotification === item.title}
                onPress={() => props.handleNotificationChange(item.title)}
              />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalNotification;
