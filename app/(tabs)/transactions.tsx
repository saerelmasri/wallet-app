import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
} from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import TransactionCard from "../../components/TransactionComponents/TransactionCard";
import { getAuth } from "@firebase/auth";
import { getAllUsersTransaction } from "../../api/database/transactionFunctions";
import { displayAmount } from "../../helpers/common-helper";

type UserTransaction = {
  id: string;
  purpose: string;
  amount: number;
  categoryColor: string;
  categoryId: string;
  categoryName: string;
  categoryEmoji: string;
  goalId: string;
  goalName: string;
  goalColor: string;
  goalEmoji: string;
  createdAt: string;
};

const Transactions = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid as string;

  // State Variables
  const [transactions, setTransactions] = useState<UserTransaction[] | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const result = await getAllUsersTransaction(userId as string);
      if (result instanceof Error) {
        console.log("Error fetching transactions:", result.message);
        setTransactions(null);
        return;
      }
      setTransactions(result);
      console.log("res:",result);
      
    };

    fetchTransactions();
  }, [userId]);

  // Loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView className="flex-1 h-full">
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <View className="bg-white w-full h-[100%] rounded-tl-3xl rounded-tr-3xl relative flex">
            {/* Filter Section */}
            <View className="w-full flex-row justify-center space-x-2 p-3">
              <View className="w-[95%] flex-row items-center space-x-2 mt-3 bg-[#F0F0F0] rounded-2xl px-4 py-1">
                <Fontisto name="search" size={24} color="black" />
                <TextInput
                  className="w-full h-10 text-black font-pregular text-sm"
                  placeholder="Search transaction"
                  placeholderTextColor="#696969"
                />
              </View>
            </View>

            {/* Transactions List */}
            <View className="w-full p-3">
              <View className="w-full flex-row justify-between pl-3">
                <Text className="text-sm font-pregular text-black">Today</Text>
              </View>
              {transactions &&
                transactions.map((item) => (
                  <TransactionCard
                    transactionDate={item.createdAt.split("T")[0]}
                    transactionTitle={item.purpose}
                    transactionAmount={displayAmount(item.amount)}
                    categoryName={item.categoryName}
                    categoryColor={item.categoryColor}
                    categoryEmoji={item.categoryEmoji}
                    goalName={item.goalName}
                    goalColor={item.goalColor}
                    goalEmoji={item.goalEmoji}
                  />
                ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Transactions;
