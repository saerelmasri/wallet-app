import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import RadioButtonGroup from "./RadioButtonGroup";

const recurrentOption = [
  "Never",
  "Weekly",
  "Every other week",
  "Monthly",
  "Every 2 months",
  "Every 3 months",
  "Every 6 months",
  "Yearly",
];

type ModalRepeat = {
  modalRepeatVisible: boolean;
  setModalRepeatVisible: (value: boolean) => void;
  handleRepeatChange: any;
  selectedRepeat: string;
};

const ModalRepeat = (props: ModalRepeat) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalRepeatVisible}
      onRequestClose={() => props.setModalRepeatVisible(false)}
    >
      <View
        style={{
          backgroundColor: "transparent",
        }}
        className="flex-1 justify-end"
      >
        <View className="h-[90%] bg-white rounded-tl-3xl rounded-tr-3xl p-4 border border-black">
          <View className="w-full flex-row justify-between items-center">
            <View />
            <Text className="font-pmedium text-lg">Repeats</Text>
            <TouchableOpacity
              onPress={() => props.setModalRepeatVisible(false)}
            >
              <MaterialCommunityIcons
                name="window-close"
                size={28}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View className="mt-5 flex items-center">
            {recurrentOption.map((item) => (
              <RadioButtonGroup
                key={item}
                label={item}
                onSelect={() => props.handleRepeatChange(item)}
                selected={props.selectedRepeat === item}
              />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalRepeat;
