import { View, Text, TextInput } from "react-native";
import React from "react";

type FormFieldsVerticalTypes = {
  title: string;
  value: string;
  handleTextChange: any;
  placeHolder?: string;
  isNumber?: boolean;
};

const FormInputTextVertical = ({
  title,
  value,
  placeHolder,
  handleTextChange,
  isNumber,
}: FormFieldsVerticalTypes) => {
  return (
    <View className={`flex flex-row w-[90%] items-center`}>
      {/* TextInput Field */}
      {isNumber ? (
        <TextInput
          className="w-full h-12 text-black font-pmedium text-base border rounded-lg"
          value={value}
          placeholder={placeHolder}
          placeholderTextColor="#A9A9A9"
          onChangeText={handleTextChange}
          inputMode="numeric"
        />
      ) : (
        <TextInput
          className="h-12 text-black font-pmedium text-base rounded-lg"
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

export default FormInputTextVertical;
