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
import ModalType from "@/components/NewTransactionComponents/ModalType";
import ModalRepeat from "@/components/ModalRepeat";
import { Categories } from "@/constants/Category";

const AddTransaction = () => {
  //Information from other Routes: Numnpad or existing transaction
  const {
    amountOfTransaction,
    transactionTitle,
    transactionCategory,
    transactionAmount,
    transactionType,
    transactionDate,
    repeat = "what",
  } = useLocalSearchParams();

  // State variables
  const [modalRepeatVisible, setModalRepeatVisible] = useState(false);
  const [modalTypeVisible, setModalTypeVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedRepeat, setSelectedRepeat] = useState("Never");
  const [selectedType, setSelectedType] = useState("Expenses");
  const [category, setCategory] = useState({ id: "", name: "" });

  // Handle Functions
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
    const initialCategory = Categories.find(
      (cat) => cat.name === transactionCategory
    );
    if (initialCategory) {
      setCategory(initialCategory);
    }

    if (transactionType) {
      setSelectedType(transactionType as string);
    }

    if (repeat) {
      setSelectedRepeat(repeat as string);
    }
  }, [transactionCategory, transactionType]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const CategoryButton = ({
    id,
    emoji,
    name,
    color,
  }: {
    id: string;
    emoji: string;
    name: string;
    color: string;
  }) => (
    <TouchableOpacity
      className={`w-full flex-row items-center p-4 space-x-3`}
      style={{
        borderColor: category.id === id ? "green" : "transparent",
        borderWidth: category.id === id ? 2 : 1,
        borderRadius: category.id === id ? 7 : 0,
      }}
      onPress={() => {
        setCategory({ id: id, name: name });
      }}
    >
      <View
        style={{ backgroundColor: color }}
        className={`w-[40px] h-[40px] rounded-full flex justify-center items-center`}
      >
        <Text className="text-lg">{emoji}</Text>
      </View>
      <Text className="text-base font-pmedium">{name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flexGrow: 1 }}>
        <View className="w-full items-center">
          {/* Amount of transaction */}
          <View className="w-full justify-center items-center p-3">
            <Text className="text-black font-psemibold text-3xl">
              ${amountOfTransaction || transactionAmount}
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
            value={transactionTitle as string}
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
                <Text
                  className={`${
                    selectedRepeat === "Never" ? "text-[#A9A9A9]" : "text-black"
                  }`}
                >
                  {selectedRepeat || "Never"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="border-[0.3px] border-black opacity-20 w-[90%]" />

          {/* Categories List */}
          <View className="m-3 w-full h-[34vh] flex-col">
            <Text className="text-black font-pregular text-xs p-5">
              Based on your preference
            </Text>
            <FlatList
              data={Categories}
              renderItem={({ item }) => (
                <CategoryButton
                  id={item.id}
                  color={item.color}
                  emoji={item.emoji}
                  name={item.name}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>

          {/* Create Button */}
          <View className="w-full justify-end flex items-center">
            {transactionAmount ? (
              <CustomButton
                title="Delete"
                handlePress={() => {
                  console.log("Delete");
                }}
                containerStyle="mt-7 w-[90%] bg-[#FF000F]"
                textStyle={"text-[#FCFCFC]"}
              />
            ) : (
              <CustomButton
                title="Create"
                handlePress={() => {
                  console.log("Create");
                }}
                containerStyle="mt-7 w-[90%] bg-[#05603A]"
                textStyle={"text-[#FCFCFC]"}
              />
            )}
          </View>
        </View>
      </View>

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
    </SafeAreaView>
  );
};

export default AddTransaction;
