import { View, Text, Modal, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Calendar } from "react-native-calendars";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type ModalDatePickerTypes = {
  modalDatePickerVisible: boolean;
  setModalDatePickerVisible: (value: boolean) => void;
  onDateChange: (selectedDate: string) => void;
  initialDate?: string;
};

const ModalDatePicker = (props: ModalDatePickerTypes) => {
  const todayDate = new Date().toISOString().split("T")[0];
  const [selected, setSelected] = useState(props.initialDate || todayDate);

    const fadeAnim = useSharedValue(0); // Initial opacity set to 0
  
  const handleDayPress = (day: any) => {
    setSelected(day.dateString);
    props.onDateChange(day.dateString);
    props.setModalDatePickerVisible(false);
  };

  useEffect(() => {
      if (props.modalDatePickerVisible) {
        fadeAnim.value = withTiming(1, { duration: 300 }); // Fade in
      } else {
        fadeAnim.value = withTiming(0, { duration: 300 }); // Fade out
      }
    }, [props.modalDatePickerVisible, fadeAnim]);
  
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
      visible={props.modalDatePickerVisible}
      onRequestClose={() => props.setModalDatePickerVisible(false)}
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
      </Animated.View>
    </Modal>
  );
};

export default ModalDatePicker;
