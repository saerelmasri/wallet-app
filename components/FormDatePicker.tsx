import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import Fontisto from "@expo/vector-icons/Fontisto";

const FormDatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [hiddeText, setHiddeText] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const isToday = (selectedDate: {
    getDate: () => number;
    getMonth: () => number;
    getFullYear: () => number;
  }) => {
    const today = new Date();
    return (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    );
  };

  const onChange = (event: any, selectedDate: React.SetStateAction<Date>) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View
      className={`bg-white w-full h-16 flex-row justify-between items-center p-3`}
    >
      {/* Title above the form field */}
      <Text
        className="text-base text-black font-psemibold "
        style={{ width: 100, paddingLeft: 20 }}
      >
        Date
      </Text>

      <View className="flex-row  items-center w-full">
        <Fontisto name="date" size={20} color="#A9A9A9" />

        <TouchableOpacity
          onPress={() => {
            setShowPicker(true);
            setHiddeText(true);
          }}
          style={{ marginLeft: 10 }}
        >
          {hiddeText === true && showPicker ? (
            <DateTimePicker
              value={date}
              mode={"date"}
              display="default"
              onChange={onChange}
            />
          ) : (
            <Text className="text-[#A9A9A9] text-base">
              {isToday(date) ? "Today" : date.toLocaleDateString()}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormDatePicker;
