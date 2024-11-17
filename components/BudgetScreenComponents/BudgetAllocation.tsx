import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type BudgetAllocationType = {
  category: string;
  value: string;
  onValueChange: any;
  onDelete?: any;
};

const BudgetAllocation = (props: BudgetAllocationType) => {
  return (
    <View className="border border-black-200 w-full rounded-lg flex-row justify-between items-center mb-3">
      <View className="justify-center p-3 w-[160px]">
        <Text className="text-black font-psemibold text-sm">
          {props.category}
        </Text>
      </View>
      <View className="flex-row space-x-1 pt-3 pb-3">
        <TextInput
          className="w-[150px] h-[55px] border text-black font-pmedium text-base p-3 rounded-lg"
          value={"$ " + (props.value || "")}
          placeholder="Budget"
          placeholderTextColor="#A9A9A9"
          onChangeText={(text) => {
            const cleanedText = text.replace(/^(\$?\s?)/, "");
            props.onValueChange(cleanedText);
          }}
          keyboardType="numeric"
        />
        <TouchableOpacity
          onPress={props.onDelete}
          className="justify-center items-center p-3 "
        >
          <FontAwesome5 name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BudgetAllocation;
