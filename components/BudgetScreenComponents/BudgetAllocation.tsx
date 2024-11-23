import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import EmojiPicker, { type EmojiType } from "rn-emoji-keyboard";

type BudgetAllocationType = {
  category: string;
  emoji: string;
  value: string;
  color: string;
  isEditable?: boolean; // New flag to toggle editability
  onValueChange: (newValue: string) => void;
  onNameChange?: (newName: string) => void;
  onEmojiChange?: (newEmoji: string) => void;
  onDelete?: () => void;
};

const BudgetAllocation = (props: BudgetAllocationType) => {
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const handlePick = (emoji: EmojiType) => {
    props.onEmojiChange?.(emoji.emoji); // Update emoji in parent state
    setEmojiPickerVisible(false); // Close picker
  };

  return (
    <View className="border border-black-200 w-full rounded-lg flex-row justify-between items-center mb-3">
      {/* Left Section: Emoji & Category Name */}
      <View className="justify-center p-3 flex-row items-center space-x-3">
        {/* Editable Emoji */}
        <TouchableOpacity
          onPress={() => props.isEditable && setEmojiPickerVisible(true)}
          style={{ backgroundColor: props.color }}
          className="w-[40px] h-[40px] justify-center items-center rounded-full"
        >
          <Text className="text-black font-psemibold text-sm">
            {props.emoji || "🙂"}
          </Text>
        </TouchableOpacity>

        {/* Editable or Static Category Name */}
        <View className="w-[100px]">
          <TextInput
            className={`text-black font-psemibold text-sm w-full ${
              props.isEditable ? "" : "border-transparent"
            }`}
            value={props.category}
            placeholder="Category"
            placeholderTextColor="#A9A9A9"
            onChangeText={props.onNameChange}
            editable={props.isEditable}
          />
        </View>
      </View>

      {/* Right Section: Value Input & Delete Button */}
      <View className="flex-row space-x-1 pt-3 pb-3">
        {/* Budget Value Input */}
        <TextInput
          className="w-[130px] h-[55px] border text-black font-pmedium text-base p-3 rounded-lg"
          value={
            props.isEditable
              ? `$ ${props.value || ""}`
              : `$ ${props.value || ""}`
          }
          placeholder="Budget"
          placeholderTextColor="#A9A9A9"
          onChangeText={(text) => {
            const cleanedText = text.replace(/^(\$?\s?)/, "");
            props.onValueChange(cleanedText);
          }}
          keyboardType="numeric"
        />

        {/* Delete Button */}
        <TouchableOpacity
          onPress={props.onDelete}
          className="justify-center items-center p-3"
        >
          <FontAwesome5 name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>

      {/* Emoji Picker */}
      {props.isEditable && isEmojiPickerVisible && (
        <EmojiPicker
          onEmojiSelected={handlePick}
          open={isEmojiPickerVisible}
          onClose={() => setEmojiPickerVisible(false)}
        />
      )}
    </View>
  );
};

export default BudgetAllocation;
