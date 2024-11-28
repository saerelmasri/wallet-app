import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type ModalNotification = {
  modalNotificationVisible: boolean;
  setModalNotificationVisible: (value: boolean) => void;
};

const ModalNotification = (props: ModalNotification) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalNotificationVisible}
      onRequestClose={() => props.setModalNotificationVisible(false)}
    >
      <View
        style={{
          backgroundColor: "transparent",
        }}
        className="flex-1 justify-end"
      >
        <View className="h-[90%] bg-white rounded-tl-3xl rounded-tr-3xl p-4 border-black">
          <View className="w-full flex-row justify-end items-center p-2">
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
          <View className="mt-5 flex items-center border p-3 space-y-2">
            <Text className="text-2xl font-psemibold">Need a reminder?</Text>
            <Text className="text-[14px] font-plight text-center">
              We can seend helpful reminders throughtout the day to remind you
              to track your spending!
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalNotification;
