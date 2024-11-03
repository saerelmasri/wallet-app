import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import FormInputText from "@/components/FormInputText";
import FormDatePicker from "@/components/FormDatePicker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const AddTransaction = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [repeat, setRepeat] = useState({
    repeat: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleFilterOption = (key: string, option: string) => {
    setRepeat((prevOptions) => ({
      ...prevOptions,
      [key]: prevOptions[key] === option ? "" : option, // Toggle the selected option
    }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* SafeAreaView only for the content */}
      <SafeAreaView className="flex-1 h-full items-center">
        <View className="w-full items-center">
          <Text className="font-pmedium text-2xl text-white text-center">
            Create a New Wallet
          </Text>
          <View className="border-[0.3px] border-black opacity-20 w-[90%]" />
          <FormInputText
            title="For"
            value={""}
            placeHolder="Rent"
            handleTextChange={""}
          />
          <View className="border-[0.3px] border-black opacity-20 w-[90%]" />
          <FormDatePicker />
          <View className="border-[0.3px] border-black opacity-20 w-[90%]" />
          <View
            className={`bg-white p-3 flex-row justify-between items-center w-full`}
          >
            {/* Title above the form field */}
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
                onPress={() => setModalVisible(true)}
              >
                <Text className="text-[#A9A9A9]">Never Repeat</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="border-[0.3px] border-black opacity-20 w-[90%]" />
        </View>
        <View className="w-full h-[25vh] justify-end flex items-center">
          <View className="border hidden"></View>
          <CustomButton
            title="Create"
            handlePress={() => {}}
            containerStyle="mt-7 w-[90%] bg-[#05603A]"
            textStyle={"text-[#FCFCFC]"}
          />
        </View>
      </SafeAreaView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-[#A9A9A9] bg-opacity-10">
          <View className="h-[90%] bg-white rounded-tl-3xl rounded-tr-3xl p-4 border-black">
            <View className="w-full flex-row justify-between items-center">
              <View />
              <Text className="font-pmedium text-lg">Repeats</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons
                  name="window-close"
                  size={28}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View className="border mt-5 flex">
              <View>
                <Text>Never</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddTransaction;
