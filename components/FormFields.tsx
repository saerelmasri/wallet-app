import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

type FormFieldsTypes = {
  title: string;
  value: string;
  handleTextChange: any;
  placeHolder?: string;
  otherStyles: string;
  keyboardType?: string;
};

import icons from "../constants/icons";

const FormFields = ({
  title,
  value,
  placeHolder,
  handleTextChange,
  otherStyles,
  keyboardType,
}: FormFieldsTypes) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="border border-black-200 w-full h-16 px-4 bg-[#D6D6D6] opacity-50 rounded-2xl focus:border-green-500 flex-row items-center">
        <TextInput
          className="flex-1 text-black font-psemibold text-base"
          value={value}
          placeholder={placeHolder}
          placeholderTextColor="#7b78b"
          onChangeText={handleTextChange}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={{uri: !showPassword ? icons.eye : icons.eyeHide}}
              resizeMode="contain"
              className={"w-[30px] h-[30px]"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormFields;
