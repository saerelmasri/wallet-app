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
import WalletSelector from "@/components/WalletSelector";

const Transactions = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (e.g., fetching data, loading fonts, etc.)
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 500ms
    }, 500); // Example loading time of 500ms

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Set the status bar style */}
      <StatusBar barStyle="dark-content" translucent backgroundColor="black" />
      {/* SafeAreaView only for the content */}
      <SafeAreaView className="flex-1 h-full">
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <View className="bg-black-100 w-full h-[35vh]">
            <Text className="text-white">Some data visualization here</Text>
          </View>

          <View className="bg-white w-full h-[90%] rounded-tl-3xl rounded-tr-3xl z-20 relative -mt-[10vh] flex">
            {/* Filter Section - Search bar and filter button */}
            <View className="w-full flex-row space-x-2 p-3">
              {/* Search Bar */}
              <View
                className={`w-[85%] flex-row items-center space-x-2 bg-[#F0F0F0] rounded-2xl px-4 py-1`}
              >
                <Fontisto name="search" size={24} color="black" />
                <TextInput
                  className="w-full h-10 text-black font-pregular text-sm"
                  value={""}
                  placeholder={"Search transaction"}
                  placeholderTextColor="#696969"
                  onChangeText={() => {}}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(true)} // Open modal on filter button press
                className="bg-[#F0F0F0] w-[12%] h-[50px] rounded-xl flex justify-center items-center"
              >
                <Ionicons name="options-sharp" size={26} color="black" />
              </TouchableOpacity>
            </View>

            {/* Quick filters - Expenses or Incomes */}
            <View className="w-full flex-row space-x-10 pl-3 pr-3">
              <Chip title="Expenses" containerStyle="mr-2" />
              <Chip title="Incomes" />
            </View>

            {/* Transactions */}
            <View className="w-full p-3 mt-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm font-plight uppercase">Today</Text>
                <Text className="text-sm font-plight text-white">-$ 1,500.00</Text>
              </View>
              <TransactionCard
                transactionTitle="AirPods Pro 2"
                transactionAmount="200.00"
                transactionCategory="Shopping"
                transactionDate="12 October 2024"
                transactionType="Expense"
                usedWallet="Master Card"
              />
              {/* Add more TransactionCard components as needed */}
            </View>
            <View className="w-full p-3 mt-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm font-plight uppercase">Today</Text>
                <Text className="text-sm font-plight text-white">-$ 1,500.00</Text>
              </View>
              <TransactionCard
                transactionTitle="AirPods Pro 2"
                transactionAmount="200.00"
                transactionCategory="Shopping"
                transactionDate="12 October 2024"
                transactionType="Expense"
                usedWallet="Master Card"
              />
              {/* Add more TransactionCard components here as needed */}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Filter Modal Section */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on back button press
      >
        <View className="flex-1 justify-end bg-transparent bg-opacity-50">
          <View className="h-4/5 bg-white rounded-tl-3xl rounded-tr-3xl p-4">
            {isLoading ? (
              <ActivityIndicator size="large" color="#ff0000" />
            ) : (
              <>
                {/* Header */}
                <View className="border-b w-full flex-row justify-between p-1">
                  <Text className="text-black text-lg">Search Filters</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text className="text-red-600">Close</Text>
                  </TouchableOpacity>
                </View>

                {/* Modal Content */}
                <Text className="mt-4 text-lg font-pmedium">From your wallets</Text>
                <WalletSelector />
                <Text className="mt-4 text-lg font-pmedium">Category</Text>
                <View className="w-full mt-3 flex-row flex-wrap space-x-2 space-y-2">
                  <Chip containerStyle="m-[5px]" title="Shopping" />
                  <Chip containerStyle="m-[5px]" title="Food & Drinks" />
                  <Chip containerStyle="m-[5px]" title="Housing" />
                  <Chip containerStyle="m-[5px]" title="Transportation" />
                  <Chip containerStyle="m-[5px]" title="Vehicle" />
                  <Chip containerStyle="m-[5px]" title="Life & Entertainment" />
                  <Chip containerStyle="m-[5px]" title="Financial Expenses" />
                  <Chip containerStyle="m-[5px]" title="Investments" />
                </View>

                <Text className="mt-4 text-lg font-pmedium">Transaction Date</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Transactions;
