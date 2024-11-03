import { View, Text, TextInput } from "react-native";
import React from "react";

type FormFieldsTypes = {
  title: string;
  value: string;
  handleTextChange: any;
  placeHolder?: string;
};

const FormInputText = ({
  title,
  value,
  placeHolder,
  handleTextChange,
}: FormFieldsTypes) => {
  return (
    <View
      className={`bg-white p-3 flex-row justify-between items-center w-full`}
    >
      {/* Title above the form field */}
      <Text className="text-base text-black font-psemibold " style={{ width: 100, paddingLeft: 20 }}>{title}</Text>

      {/* TextInput Field */}
      <TextInput
        className="w-full h-12 text-black font-pmedium text-base"
        value={value}
        placeholder={placeHolder}
        placeholderTextColor="#A9A9A9"
        onChangeText={handleTextChange}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

export default FormInputText;
