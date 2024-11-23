import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type ModalCategory = {
  modalCategoryVisible: boolean;
  setModalCategoryVisible: (value: boolean) => void;
};

const ModalCategory = (props: ModalCategory) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalCategoryVisible}
      onRequestClose={() => props.setModalCategoryVisible(false)}
    >
      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        className="flex-1 justify-end"
      >
        <View className="h-[90%] bg-white rounded-tl-3xl rounded-tr-3xl p-4 border-black">
          <View className="w-full flex-row justify-between items-center">
            <View />
            <Text className="font-pmedium text-lg">New Category</Text>
            <TouchableOpacity
              onPress={() => props.setModalCategoryVisible(false)}
            >
              <MaterialCommunityIcons
                name="window-close"
                size={28}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View className="mt-5 flex items-center"></View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCategory;
