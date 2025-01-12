import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import FormInputText from "../components/FormInputText";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useLocalSearchParams } from "expo-router";
import ModalRepeat from "../components/ModalRepeat";
import ModalDatePicker from "../components/NewTransactionComponents/ModalCalendar";
import {
  BudgetData,
  getUserCategories,
  updatedUsedMoneyOnCategory,
} from "../api/database/categoryFunctions";
import { showAlert } from "../helpers/common-helper";
import { createTransaction } from "../api/database/transactionFunctions";
import { GoalType, updateSavedAmount } from "../api/database/goalFunctions";
import ModalGoals from "../components/NewTransactionComponents/ModalGoals";
import { getAuth } from "@firebase/auth";

const AddTransaction = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid as string;

  //Information from other Routes: Numnpad or existing transaction
  const {
    newAmountIncoming,
    transactionTitle,
    transactionCategory,
    transactionAmount,
    transactionDate,
    repeat = "Never",
  } = useLocalSearchParams();

  // Loading Variable
  const [isLoading, setIsLoading] = useState(true);

  // Modal Variables
  const [modalRepeatVisible, setModalRepeatVisible] = useState(false);
  const [modalDatePickerVisible, setModalDatePickerVisible] = useState(false);
  const [modalGoalVisible, setModalGoalVisible] = useState(false);

  // Incoming user's category
  const [category, setCategory] = useState<BudgetData[] | null>(null);

  // Selected Variables
  const [selectedGoal, setselectedGoal] = useState<GoalType | null>(null);
  const [selectedRepeat, setSelectedRepeat] = useState<string>("Never");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [transactionData, setTransactionData] = useState({
    title: "",
    amount: newAmountIncoming,
  });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());

  // Handle Date Change
  const handleDateChange = (date: string) => {
    setSelectedDate(new Date(date).toISOString());
  };

  // Handle Repeat Change
  const handleRepeatChange = (option: string) => {
    setSelectedRepeat(option);
    setTimeout(() => {
      setModalRepeatVisible(false);
    }, 200);
  };

  // Handle Goal Change
  const handleGoal = (goal: GoalType) => {
    setselectedGoal(goal);
    setTimeout(() => {
      setModalGoalVisible(false);
    }, 200);
  };

  // Handle Create Transaction
  const handleCreateTransaction = async () => {
    if (transactionData.title.trim() === "" && selectedGoal === null) {
      showAlert("No name?", "Please provide a name for this transaction");
      return;
    }
    if (selectedCategory === null && selectedGoal === null) {
      showAlert(
        "Categoy no found",
        "Please select a category for this transaction"
      );
      return;
    }
    if (selectedGoal && selectedCategory) {
      showAlert(
        "Transaction Problem",
        "A transaction should be either for a goal or a category"
      );
      return;
    }

    try {
      if (selectedGoal) {
        const newTransaction = await createTransaction(
          userId as string,
          "",
          selectedGoal.id,
          Number(transactionData.amount),
          transactionData.title,
          selectedRepeat === "Never" ? false : true,
          selectedDate
        );
        if (newTransaction instanceof Error) {
          console.log("Error saving transaction:", newTransaction.message);
          showAlert("Error", "An error occured while saving the transaction");
          return;
        }

        const updateSavingsGoal = await updateSavedAmount(
          selectedGoal.id,
          userId as string,
          Number(newAmountIncoming)
        );
        if (updateSavingsGoal instanceof Error) {
          console.log("Error saving transaction:", newTransaction.message);
          showAlert("Error", "An error occured while saving the transaction");
          return;
        }
        showAlert("Success", "Transaction saved successfully");
        router.replace("/(tabs)/home");
      } else {
        const newTransaction = await createTransaction(
          userId as string,
          selectedCategory,
          "",
          Number(transactionData.amount),
          transactionData.title,
          selectedRepeat === "Never" ? false : true,
          selectedDate
        );
        if (newTransaction instanceof Error) {
          console.log("Error saving transaction:", newTransaction.message);
          showAlert("Error", "An error occured while saving the transaction");
          return;
        }
        const updatedUsedMoney = await updatedUsedMoneyOnCategory(
          userId as string,
          selectedCategory,
          Number(transactionData.amount)
        );
        if (updatedUsedMoney instanceof Error) {
          console.log("Error saving transaction:", newTransaction.message);
          showAlert("Error", "An error occured while saving the transaction");
          return;
        }
        showAlert("Success", "Transaction saved successfully");
        router.replace("/(tabs)/home");
      }
    } catch (error) {
      console.log("Error saving transaction:", error);
      showAlert("Error", "An error occured while saving the transaction");
    }
  };

  // Populate screen if transaction wants to be updated
  useEffect(() => {
    if (transactionTitle) {
      setTransactionData((prev) => ({
        ...prev,
        title: transactionTitle as string,
      }));
    }
    if (transactionCategory) {
      setSelectedCategory(() => JSON.parse(transactionCategory as string));
    }
    if (transactionAmount) {
      setTransactionData((prev) => ({
        ...prev,
        amount: transactionAmount as string,
      }));
    }
    if (transactionDate) {
      setSelectedDate(() => transactionDate as string);
    }
    if (repeat) {
      setSelectedRepeat(() => repeat as string);
    }
  }, [
    transactionTitle,
    transactionCategory,
    transactionAmount,
    transactionDate,
    repeat,
  ]);

  // Fetch user's category from db
  useEffect(() => {
    const usersCategory = async () => {
      const result = await getUserCategories(userId as string);
      if (result instanceof Error) {
        console.log("Error fetching user:", result.message);
        return;
      }
      setCategory(result);
    };
    usersCategory();
  }, [userId]);

  // Populate recurrent variable
  useEffect(() => {
    if (repeat) {
      setSelectedRepeat(repeat as string);
    }
  }, [transactionCategory]);

  // Loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flexGrow: 1 }}>
        <View className="w-full items-center">
          {/* Amount of transaction */}
          <View className="w-full justify-center items-center p-3">
            <Text className="text-black font-psemibold text-3xl">
              ${newAmountIncoming || transactionAmount}
            </Text>
          </View>
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
              <View className="p-2 rounded-md bg-[#FF000F]">
                {" "}
                <Text className="text-white font-pmedium text-sm">
                  Expenses
                </Text>
              </View>
            </View>
          </View>

          {/* Transaction Title */}
          <View className="border-[0.3px] border-black opacity-20 w-[90%]" />
          <FormInputText
            title="For"
            value={transactionTitle as string}
            placeHolder="Rent"
            handleTextChange={(e: any) =>
              setTransactionData({ ...transactionData, title: e })
            }
          />
          <View className="border-[0.3px] border-black opacity-20 w-[90%]" />

          {/* Date Picker */}
          <View className="border-[0.3px] border-black opacity-20 w-[90%]" />
          <View
            className={`bg-white p-3 flex-row justify-between items-center w-full`}
          >
            <Text
              className="text-base text-black font-psemibold "
              style={{ width: 100, paddingLeft: 20 }}
            >
              Date
            </Text>

            <View className="w-full h-12 flex-row items-center">
              <AntDesign name="calendar" size={24} color="#A9A9A9" />
              <TouchableOpacity
                className="ml-3"
                onPress={() => setModalDatePickerVisible(true)}
              >
                <Text
                  className={`${
                    selectedDate.split("T")[0] ===
                    new Date().toISOString().split("T")[0]
                      ? "text-[#A9A9A9]"
                      : "text-black"
                  }`}
                >
                  {selectedDate.split("T")[0] ===
                  new Date().toISOString().split("T")[0]
                    ? "Today"
                    : selectedDate}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="border-[0.3px] border-black opacity-20 w-[90%]" />

          {/* Repeat */}
          {/* <View
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
          </View> */}
          <View className="border-[0.3px] border-black opacity-20 w-[90%]" />

          <View
            className={`bg-white p-3 flex-row justify-between items-center w-full`}
          >
            <Text
              className="text-base text-black font-psemibold "
              style={{ width: 100, paddingLeft: 20 }}
            >
              Goal
            </Text>
            <View className="w-full h-12 flex-row items-center">
              <View className="p-2 rounded-md bg-[#FF000F]">
                {" "}
                <TouchableOpacity onPress={() => setModalGoalVisible(true)}>
                  <Text className="text-white font-pmedium text-sm">
                    {selectedGoal !== null
                      ? `${selectedGoal.goalName}`
                      : "Select a Goal"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Categories List */}
          <View className="m-3 w-full flex-col">
            <Text className="text-black font-pregular text-xs p-5">
              Based on your preference
            </Text>
            <FlatList
              data={category}
              keyExtractor={(item) => item.categoryId.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.categoryId}
                  className={`w-full flex-row items-center p-4 space-x-3`}
                  style={{
                    borderColor:
                      selectedCategory === item.categoryId
                        ? "green"
                        : "transparent",
                    borderWidth: selectedCategory === item.categoryId ? 2 : 1,
                    borderRadius: selectedCategory === item.categoryId ? 7 : 0,
                  }}
                  onPress={() =>
                    setSelectedCategory(item?.categoryId as string)
                  }
                >
                  <View
                    style={{ backgroundColor: item.categoryColor }}
                    className={`w-[40px] h-[40px] rounded-full flex justify-center items-center`}
                  >
                    <Text className="text-lg">{item.categoryEmoji}</Text>
                  </View>
                  <Text className="text-base font-pmedium">
                    {item.categoryName}
                  </Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text className="text-black font-pregular text-sm text-center p-4">
                  No categories available.
                </Text>
              }
            />
          </View>

          {/* Create Button */}
          <View className="w-full justify-end flex items-center">
            {transactionAmount ? (
              <>
                <CustomButton
                  title="Update"
                  handlePress={() => {
                    console.log("Update");
                  }}
                  containerStyle="mt-7 w-[90%] bg-[#FF000F]"
                  textStyle={"text-[#FCFCFC]"}
                />
                <CustomButton
                  title="Delete"
                  handlePress={() => {
                    console.log("Delete");
                  }}
                  containerStyle="mt-7 w-[90%] bg-[#FF000F]"
                  textStyle={"text-[#FCFCFC]"}
                />
              </>
            ) : (
              <CustomButton
                title="Create"
                handlePress={handleCreateTransaction}
                containerStyle="w-[90%] bg-[#05603A] mt-10"
                textStyle={"text-[#FCFCFC]"}
              />
            )}
          </View>
        </View>
      </View>

      <ModalGoals
        modalGoalVisible={modalGoalVisible}
        setModalGoalVisible={setModalGoalVisible}
        userId={userId as string}
        selectedGoal={selectedCategory}
        handleGoalChange={handleGoal}
      />

      <ModalRepeat
        modalRepeatVisible={modalRepeatVisible}
        setModalRepeatVisible={setModalRepeatVisible}
        handleRepeatChange={handleRepeatChange}
        selectedRepeat={selectedRepeat}
      />

      <ModalDatePicker
        modalDatePickerVisible={modalDatePickerVisible}
        setModalDatePickerVisible={setModalDatePickerVisible}
        onDateChange={handleDateChange}
        initialDate={selectedDate}
      />
    </SafeAreaView>
  );
};

export default AddTransaction;
