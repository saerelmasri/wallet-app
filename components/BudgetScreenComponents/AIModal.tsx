import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CustomButton from "../CustomButton";
import { router } from "expo-router";

type AIModalTypes = {
  modalTypeVisible: boolean;
  setModalTypeVisible: (value: boolean) => void;
};

const AIModal = (props: AIModalTypes) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalTypeVisible}
      onRequestClose={() => props.setModalTypeVisible(false)}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            backgroundColor: "white",
            borderRadius: 16,
            padding: 20,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
            elevation: 5,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 18,
                color: "#333",
              }}
            >
              AI Assistance
            </Text>
            <TouchableOpacity onPress={() => props.setModalTypeVisible(false)}>
              <MaterialCommunityIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Body Text */}
          <Text
            style={{
              fontFamily: "Poppins-Light",
              fontSize: 14,
              color: "#555",
              lineHeight: 20,
              textAlign: "justify",
              marginBottom: 20,
            }}
          >
            Would you like to use AI to get personalized suggestions based on
            the categories you've selected? The AI will help allocate your
            budget, providing a starting point you can adjust to suit your
            needs.
          </Text>

          {/* Action Buttons */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <CustomButton
              title="Suggest Me"
              handlePress={() => {}}
              containerStyle="w-[48%] h-[48px] bg-[#05603A] rounded-md"
              textStyle={"text-[#FCFCFC]"}
            />
            <CustomButton
              title="Cancel"
              handlePress={() => {
                props.setModalTypeVisible(false);
                router.push("/(budgetScreens)/budgetCalculation");
              }}
              containerStyle="w-[48%] h-[48px] bg-[#D3D3D3] rounded-md"
              textStyle={"text-[#333]"}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AIModal;
