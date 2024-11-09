import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import FormInputText from "@/components/FormInputText";
import FormDatePicker from "@/components/FormDatePicker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams } from "expo-router";
import ModalType from "@/components/ModalType";
import ModalRepeat from "@/components/ModalRepeat";
import { Categories } from "@/constants/Category";

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

  const CategoryButton = ({ emoji, name, color }: any) => (
    <View className="w-full flex-row items-center p-4 space-x-3">
      <View
        style={{ backgroundColor: color }}
        className={`w-[40px] h-[40px] rounded-full justify-center items-center`}
      >
        <Text>{emoji}</Text>
      </View>
      <Text className="text-base font-pmedium">{name}</Text>
    </View>
  );

  return (
    <View >
   
    </View>
  );
};

export default AddTransaction;
