import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TransactionTypeCard from "./TransactionTypeCard";

type ModalTypes = {
  modalTypeVisible: boolean;
  setModalTypeVisible: (value: boolean) => void;
  setSelectedType: (type: string) => void;
};

const ModalType = (props: ModalTypes) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.modalTypeVisible}
      onRequestClose={() => props.setModalTypeVisible(false)}
    >
      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        className="flex-1 justify-end items-center"
      >
        <View className=" h-[40%] w-full bg-white rounded-[40%] p-6 border-black flex space-y-6">
          <View className="w-full flex-row justify-between items-center">
            <Text className="font-pmedium text-lg">Transaction Type</Text>
            <TouchableOpacity onPress={() => props.setModalTypeVisible(false)}>
              <MaterialCommunityIcons
                name="window-close"
                size={28}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View className="w-full flex-col">
            <TransactionTypeCard
              color="green"
              type="Income"
              onSelect={() => {
                props.setSelectedType("Income");
                props.setModalTypeVisible(false); 
              }}
            />
            <TransactionTypeCard
              color="red"
              type="Expense"
              onSelect={() => {
                props.setSelectedType("Expense");
                props.setModalTypeVisible(false);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalType;
