import { View, Text, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Calendar } from "react-native-calendars";

type ModalDatePickerTypes = {
  modalDatePickerVisible: boolean;
  setModalDatePickerVisible: (value: boolean) => void;
  onDateChange: (selectedDate: string) => void;
  initialDate?: string;
};

const ModalDatePicker = (props: ModalDatePickerTypes) => {
  const todayDate = new Date().toISOString().split("T")[0];
  const [selected, setSelected] = useState(props.initialDate || todayDate);

  const handleDayPress = (day: any) => {
    setSelected(day.dateString);
    props.onDateChange(day.dateString);
    props.setModalDatePickerVisible(false);
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.modalDatePickerVisible}
      onRequestClose={() => props.setModalDatePickerVisible(false)}
    >
      <View
        style={{
          backgroundColor: "transparent",
        }}
        className="flex-1 justify-end items-center"
      >
        <View className="h-[50%] w-full bg-white rounded-2xl p-6 border border-black flex space-y-6">
          <View className="w-full flex-row justify-between items-center">
            <Text className="font-pmedium text-lg">Date</Text>
            <TouchableOpacity
              onPress={() => props.setModalDatePickerVisible(false)}
            >
              <MaterialCommunityIcons
                name="window-close"
                size={28}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View className="w-full flex-col">
            {/* Show the DateTimePicker directly */}
            <Calendar
              onDayPress={handleDayPress}
              style={{
                height: 350,
              }}
              markedDates={{
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: "orange",
                },
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalDatePicker;
