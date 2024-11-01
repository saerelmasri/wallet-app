import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import Chip from "@/components/Chip";
import TransactionCard from "@/components/TransactionCard";

const Transactions = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Updated filterOptions as an object for wallet, category, and date
  const [filterOptions, setFilterOptions] = useState({
    transactionType: "",
    wallet: {
      id: "",
      accountName: "",
    },
    category: "",
    transactionDate: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleFilterOption = (key: string, option: string) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [key]: prevOptions[key] === option ? "" : option, // Toggle the selected option
    }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView className="flex-1 h-full">
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <View className="bg-white w-full h-[100%] rounded-tl-3xl rounded-tr-3xl relative flex">
            {/* Filter Section */}
            <View className="w-full flex-row space-x-2 p-3">
              <View className="w-[85%] flex-row items-center space-x-2 mt-3 bg-[#F0F0F0] rounded-2xl px-4 py-1">
                <Fontisto name="search" size={24} color="black" />
                <TextInput
                  className="w-full h-10 text-black font-pregular text-sm"
                  placeholder="Search transaction"
                  placeholderTextColor="#696969"
                />
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="bg-[#F0F0F0] w-[12%] h-[50px] rounded-xl mt-3 flex justify-center items-center"
              >
                <Ionicons name="options-sharp" size={26} color="black" />
              </TouchableOpacity>
            </View>

            {/* Transactions List */}
            <View className="w-full p-3">
              <View className="w-full flex-row justify-between">
                <Text className="text-sm font-pregular text-black">Today</Text>
                <Text className="text-sm font-pregular text-black hidden">
                  - $1,200.00
                </Text>
              </View>
              <TransactionCard
                transactionTitle="AirPods Pro 2"
                transactionAmount="200.00"
                transactionCategory="Shopping"
                transactionDate="12 October 2024"
                transactionType="Expense"
              />
              <TransactionCard
                transactionTitle="AirPods Pro 2"
                transactionAmount="200.00"
                transactionCategory="Shopping"
                transactionDate="12 October 2024"
                transactionType="Expense"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Filter Modal Section */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-transparent bg-opacity-50">
          <View className="h-[80%] bg-white rounded-tl-3xl rounded-tr-3xl p-4 border border-black">
            {isLoading ? (
              <ActivityIndicator size="large" color="#ff0000" />
            ) : (
              <>
                {/* Header */}
                <View className="border-b w-full flex-row justify-between p-1">
                  <Text className="text-black text-lg">Filters</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text className="text-red-600">Close</Text>
                  </TouchableOpacity>
                </View>

                {/* Chip Filter Section for Transaction Types */}
                <Text className="mt-4 text-lg font-pmedium">
                  Transaction Type
                </Text>
                <View className="w-full mt-3 flex-row flex-wrap space-x-2 space-y-2">
                  {["Expenses", "Incomes", "Transfers"].map((type) => (
                    <Chip
                      key={type}
                      title={type}
                      selected={filterOptions.transactionType === type}
                      onPress={() =>
                        toggleFilterOption("transactionType", type)
                      }
                      containerStyle="mr-[5px]"
                    />
                  ))}
                </View>

                {/* Category Filter */}
                <Text className="mt-4 text-lg font-pmedium">Category</Text>
                <View className="w-full mt-3 flex-row flex-wrap space-x-2 space-y-2">
                  {[
                    "Shopping",
                    "Food & Drinks",
                    "Housing",
                    "Transportation",
                    "Vehicle",
                    "Life & Entertainment",
                    "Financial Expenses",
                    "Investments",
                  ].map((category) => (
                    <Chip
                      key={category}
                      title={category}
                      selected={filterOptions.category === category}
                      onPress={() => toggleFilterOption("category", category)}
                      containerStyle="m-[5px]"
                    />
                  ))}
                </View>

                {/* Date Range Selection */}
                <Text className="mt-4 text-lg font-pmedium">
                  Transaction Date
                </Text>
                <View className="w-full mt-3 flex-row flex-wrap space-x-2 space-y-2">
                  {["Today", "Yesterday", "Last 7 days", "Last 30 days"].map(
                    (dateRange) => (
                      <Chip
                        key={dateRange}
                        title={dateRange}
                        selected={filterOptions.transactionDate === dateRange}
                        onPress={() =>
                          toggleFilterOption("transactionDate", dateRange)
                        }
                        containerStyle="m-[5px]"
                      />
                    )
                  )}
                </View>

                {/* Action Buttons */}
                <View className="mt-auto mb-10 w-full flex-row justify-between space-x-4">
                  <TouchableOpacity className="bg-[#2F7E79] w-[48%] h-[50px] justify-center items-center rounded-lg">
                    <Text className="text-white font-psemibold">Apply</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-red-600 w-[48%] h-[50px] justify-center items-center rounded-lg"
                    onPress={() =>
                      setFilterOptions({
                        wallet: {
                          id: "",
                          accountName: "",
                        },
                        category: "",
                        transactionDate: "",
                        transactionType: "",
                      })
                    }
                  >
                    <Text className="text-white font-psemibold">Clear</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Transactions;
