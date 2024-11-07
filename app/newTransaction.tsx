import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import FormInputText from "@/components/FormInputText";
import FormDatePicker from "@/components/FormDatePicker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams } from "expo-router";
import ModalType from "@/components/ModalType";
import ModalRepeat from "@/components/ModalRepeat";

const AddTransaction = () => {
  const { amountOfTransaction } = useLocalSearchParams();

  const [modalRepeatVisible, setModalRepeatVisible] = useState(false);
  const [modalTypeVisible, setModalTypeVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRepeat, setSelectedRepeat] = useState("Never");
  const [selectedType, setSelectedType] = useState("Expenses");

  const handleRepeatChange = (option: string) => {
    setSelectedRepeat(option);
    setTimeout(() => {
      setModalRepeatVisible(false);
    }, 200);
  };

  const handleTypeChange = (option: string) => {
    setSelectedType(option);
    setTimeout(() => {
      setModalTypeVisible(false);
    }, 200);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView className="flex-1 h-full items-center">
        <View className="w-full items-center">
          {/* Amount of transaction */}
          <View className="w-full justify-center items-center p-3">
            <Text className="text-black font-psemibold text-3xl">
              ${amountOfTransaction}
            </Text>
          </View>

          {/* Type of transaction */}
          <View
            className={`bg-white p-3 flex-row justify-between items-center w-full`}
          >
            <Text
              className="text-base text-black font-psemibold "
              style={{ width: 100, paddingLeft: 20 }}
            >
              Type
            </Text>
            <View className="w-full h-12 flex-row items-center">
              <TouchableOpacity
                className={`p-2 rounded-md ${
                  selectedType === "Income" ? "bg-[#04EE7E]" : "bg-[#FF000F]"
                }`}
                onPress={() => setModalTypeVisible(true)}
              >
                <Text className="text-white font-pmedium text-sm">
                  {selectedType}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Category */}
          <View className="border-[0.3px] border-black opacity-20 w-[90%]" />
          <FormInputText
            title="For"
            value={""}
            placeHolder="Rent"
            handleTextChange={""}
          />
          <View className="border-[0.3px] border-black opacity-20 w-[90%]" />

          {/* Date Picker */}
          <View className="border-[0.3px] border-black opacity-20 w-[90%]" />
          <FormDatePicker />
          <View className="border-[0.3px] border-black opacity-20 w-[90%]" />

          {/* Repeat */}
          <View
            className={`bg-white p-3 flex-row justify-between items-center w-full`}
          >
            <Text
              className="text-base text-black font-psemibold "
              style={{ width: 100, paddingLeft: 20 }}
            >
              Repeat
            </Text>

            <View className="w-full h-12 flex-row items-center">
              <MaterialCommunityIcons
                name="calendar-clock"
                size={24}
                color="#A9A9A9"
              />
              <TouchableOpacity
                className="ml-3"
                onPress={() => setModalRepeatVisible(true)}
              >
                <Text className="text-[#A9A9A9]">{selectedRepeat}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="border-[0.3px] border-black opacity-20 w-[90%]" />
        </View>
        <View className="border m-3 w-full p-3">
            <Text>Based on your </Text>
        </View>
        <View className="w-full justify-end flex items-center">
          <View className="border hidden"></View>
          <CustomButton
            title="Create"
            handlePress={() => {}}
            containerStyle="mt-7 w-[90%] bg-[#05603A]"
            textStyle={"text-[#FCFCFC]"}
          />
        </View>
      </SafeAreaView>

      <ModalType
        modalTypeVisible={modalTypeVisible}
        setModalTypeVisible={setModalTypeVisible}
        setSelectedType={handleTypeChange}
      />

      <ModalRepeat
        modalRepeatVisible={modalRepeatVisible}
        setModalRepeatVisible={setModalRepeatVisible}
        handleRepeatChange={handleRepeatChange}
        selectedRepeat={selectedRepeat}
      />
    </View>
  );
};

export default AddTransaction;
