import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import TransactionCard from "../../components/TransactionComponents/TransactionCard";
import { getAuth } from "@firebase/auth";
import { getAllUsersTransaction } from "../../api/database/transactionFunctions";
import { displayAmount } from "../../helpers/common-helper";
import { UserTransaction } from "../../constants/common-types";

const Transactions = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid as string;

  // State Variables
  const [transactions, setTransactions] = useState<UserTransaction[] | null>(
    null
  );
  const [groupedTransactions, setGroupedTransactions] = useState<
    Record<string, UserTransaction[]>
  >({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const result = await getAllUsersTransaction(userId as string);
        if (result instanceof Error) {
          console.log("Error fetching transactions:", result.message);
          setTransactions(null);
          return;
        }
        setTransactions(result);
        groupTransactions(result);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  const groupTransactions = (transactions: UserTransaction[]) => {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 864e5).toISOString().split("T")[0];

    const grouped: Record<string, UserTransaction[]> = {};

    transactions.forEach((item, index) => {
      const date = item.createdAt.split("T")[0];
      if (date === today) {
        grouped["Today"] = [...(grouped["Today"] || []), item];
      } else if (date === yesterday) {
        grouped["Yesterday"] = [...(grouped["Yesterday"] || []), item];
      } else {
        grouped[date] = [...(grouped[date] || []), item];
      }
    });

    setGroupedTransactions(grouped);
  };

  const renderTransactionGroup = ({
    item,
  }: {
    item: [string, UserTransaction[]];
  }) => {
    const [date, transactions] = item;

    return (
      <View className="pl-3 pr-3">
        <Text className="text-xs font-pmedium text-black ">{date}</Text>
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transactionDate={transaction.createdAt.split("T")[0]}
            transactionTitle={transaction.purpose}
            transactionAmount={displayAmount(transaction.amount)}
            categoryName={transaction.categoryName}
            categoryColor={transaction.categoryColor}
            categoryEmoji={transaction.categoryEmoji}
            goalName={transaction.goalName}
            goalColor={transaction.goalColor}
            goalEmoji={transaction.goalEmoji}
          />
        ))}
      </View>
    );
  };

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
            {/* Transactions List */}
            {isLoading || !transactions ? (
              <ActivityIndicator
                className="mt-[30%]"
                size="large"
                color="black"
              />
            ) : (
              <FlatList
                data={Object.entries(groupedTransactions)}
                keyExtractor={(item) => item[0]}
                renderItem={renderTransactionGroup}
                contentContainerStyle={{ padding: 16 }}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Transactions;
