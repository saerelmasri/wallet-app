import { View, Text, TextInput } from "react-native";
import React from "react";

type FormFieldsTypes = {
  title: string;
  value: string;
  handleTextChange: any;
  placeHolder?: string;
  isNumber?: boolean;
};

const FormInputText = ({
  title,
  value,
  placeHolder,
  handleTextChange,
  isNumber,
}: FormFieldsTypes) => {
  return (
    <View className={`p-3 flex w-[90%] space-y-3`}>
      {/* Title above the form field */}
      <Text
        className="text-base w-[150px] text-black font-psemibold"
      >
        {title}
      </Text>

      {/* TextInput Field */}
      {isNumber ? (
        <TextInput
          className="w-full h-12 text-black font-pmedium text-base border rounded-lg p-3"
          value={value}
          placeholder={placeHolder}
          placeholderTextColor="#A9A9A9"
          onChangeText={handleTextChange}
          inputMode="numeric"
        />
      ) : (
        <TextInput
          className="w-full h-12 text-black font-pmedium text-base border rounded-lg p-3"
          value={value}
          placeholder={placeHolder}
          placeholderTextColor="#A9A9A9"
          onChangeText={handleTextChange}
          autoCapitalize="sentences"
          autoCorrect={false}
        />
      )}
    </View>
  );
};

export default FormInputText;
