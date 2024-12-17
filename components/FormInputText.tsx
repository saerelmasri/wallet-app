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
    <View className={`p-3 flex-row justify-between items-center w-full`}>
      {/* Title above the form field */}
      <Text
        className="text-base text-black font-psemibold "
        style={{ width: 100, paddingLeft: 20 }}
      >
        {title}
      </Text>

      {/* TextInput Field */}
      {isNumber ? (
        <TextInput
          className="w-full h-12 text-black font-pmedium text-base"
          value={value}
          placeholder={placeHolder}
          placeholderTextColor="#A9A9A9"
          onChangeText={handleTextChange}
          inputMode="numeric"
        />
      ) : (
        <TextInput
          className="w-full h-12 text-black font-pmedium text-base"
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
