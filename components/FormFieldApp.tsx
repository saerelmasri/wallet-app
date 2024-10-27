import { View, Text, TextInput } from "react-native";
import React from "react";

type FormFieldsTypes = {
  title: string;
  value: string;
  handleTextChange: any;
  placeHolder?: string;
  otherStyles: string;
};

const FormFieldApp = ({
  title,
  value,
  placeHolder,
  handleTextChange,
  otherStyles,
}: FormFieldsTypes) => {
  return (
    <View
      className={`border border-white bg-white rounded-2xl px-4 py-2 ${otherStyles}`}
    >
      {/* Title above the form field */}
      <Text className="text-base text-black font-pmedium mb-1">{title}</Text>

      {/* TextInput Field */}
      <TextInput
        className="w-full h-10 text-black font-psemibold text-base"
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

export default FormFieldApp;
