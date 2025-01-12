import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { displayAmount, formatDate } from "../../helpers/common-helper";
import { Transaction } from "../../constants/common-types";
import { getCategoryTransactions } from "../../api/database/transactionFunctions";
import TransactionCardModel from "./TransactionCardModal";
import { FlatList } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

interface CategoryModalProps {
  visible: boolean;
  selectedCategory: {
    id: string;
    name: string;
    userId: string;
    budgetEmoji: string;
    budgetInitialAmount: number;
    budgetUsedAmount: number;
  } | null;
  onClose: () => void;
}

const CategoryModal = ({
  visible,
  selectedCategory,
  onClose,
}: CategoryModalProps) => {
  const router = useRouter();
  const categoryId = selectedCategory?.id as string;
  const userId = selectedCategory?.userId as string;

  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  //   const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userId || !categoryId) {
      return;
    }

    setTransactions(null);
    // setLoading(true);

    const fetchCategoryTransactions = async () => {
      const result = await getCategoryTransactions(userId, categoryId);
      if (result instanceof Error) {
        console.log("Error fetching transactions:", result.message);
        setTransactions(null);
        return;
      }
      setTransactions(result);
    };

    fetchCategoryTransactions();
  }, [categoryId, userId, visible]);

  const renderTransaction = ({ item }: { item: Transaction }) => {
    const transactionDate = item.createdAt
      ? formatDate(new Date(item.createdAt))
      : "Unknown Date";

    return (
      <TransactionCardModel
        key={item.id}
        transactionDate={transactionDate}
        transactionTitle={item.purpose}
        transactionAmount={displayAmount(item.amount)}
      />
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      key={categoryId}
    >
      <View className="flex-1 justify-end bg-black/10">
        <View className="bg-white p-5 rounded-t-[35px] w-full h-[90%] items-center">
          {/* Header: Emoji, Name, and Actions */}
          <View className="w-full flex-row justify-between p-2">
            <View className="flex-row space-x-2 p-1">
              <Text className="text-[25px] font-bold">
                {selectedCategory?.budgetEmoji}
              </Text>
              <Text className="text-[25px] font-bold">
                {selectedCategory?.name}
              </Text>
            </View>
            <View className="flex-row space-x-4 p-1">
              <TouchableOpacity
                onPress={() => {
                  onClose();
                  setTimeout(() => {
                    router.push("/categoryEditor");
                  }, 100)
                }}
                className="rounded-full w-7 h-7 bg-black justify-center items-center"
              >
                <Ionicons name="pencil" size={14} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onClose}
                className="rounded-full w-7 h-7 bg-black justify-center items-center"
              >
                <Ionicons name="close-sharp" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Budget Information */}
          <View className="w-full flex-row justify-between p-2 m-4">
            <View className="flex-row">
              <Text className="text-sm font-regular">
                Initial Budget:{" "}
                <Text className="font-bold">
                  ${displayAmount(selectedCategory?.budgetInitialAmount ?? 0)}
                </Text>
              </Text>
            </View>
            <View className="flex-row">
              <Text className="text-sm font-regular">
                Used Budget:{" "}
                <Text className="font-bold">
                  ${displayAmount(selectedCategory?.budgetUsedAmount ?? 0)}
                </Text>
              </Text>
            </View>
          </View>

          {/* Modal Content */}
          <View className="w-full">
            <FlatList
              data={transactions || []} // Directly pass transactions here
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderTransaction}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CategoryModal;
