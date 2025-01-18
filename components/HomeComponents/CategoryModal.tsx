import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { displayAmount, formatDate } from "../../helpers/common-helper";
import { Transaction } from "../../constants/common-types";
import { getCategoryTransactions } from "../../api/database/transactionFunctions";
import TransactionCardModel from "./TransactionCardModal";
import { FlatList } from "react-native-gesture-handler";
import { router } from "expo-router";
import Skeleton from "../SkeletonLoader";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface CategoryModalProps {
  visible: boolean;
  selectedCategory: {
    id: string;
    name: string;
    userId: string;
    budgetEmoji: string;
    budgetInitialAmount: number;
    budgetUsedAmount: number;
    categoryType: string;
  } | null;
  onClose: () => void;
}

const CategoryModal = ({
  visible,
  selectedCategory,
  onClose,
}: CategoryModalProps) => {
  const categoryId = selectedCategory?.id as string;
  const userId = selectedCategory?.userId as string;
  const stringifyCategoryParam = JSON.stringify(selectedCategory);

  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // State for modal animation (shadow fade-in)
  const fadeAnim = useSharedValue(0); // Initial opacity set to 0

  useEffect(() => {
    if (!userId || !categoryId) {
      return;
    }

    setTransactions(null);

    const fetchCategoryTransactions = async () => {
      setIsLoading(true);
      try {
        const result = await getCategoryTransactions(userId, categoryId);
        if (result instanceof Error) {
          console.log("Error fetching transactions:", result.message);
          setTransactions(null);
          return;
        }
        // setTransactions(result);
        setTransactions(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryTransactions();
  }, [categoryId, userId, visible]);

  useEffect(() => {
    if (visible) {
      fadeAnim.value = withTiming(1, { duration: 300 }); // Fade in
    } else {
      fadeAnim.value = withTiming(0, { duration: 300 }); // Fade out
    }
  }, [visible, fadeAnim]);

  // Animated style for modal background opacity
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });

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
      <Animated.View
        style={[
          {
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
          },
          animatedStyle, // Apply animated style
        ]}
      >
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
                    router.push({
                      pathname: "/categoryEditor",
                      params: { stringifyCategoryParam },
                    });
                  }, 100);
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

          <View className="w-full p-2">
            <Text className="text-sm font-pregular">
              Category: {selectedCategory?.categoryType}
            </Text>
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

          {isLoading ? (
            <View className="w-full">
              {[1, 2, 3].map((_, index) => (
                <Skeleton
                  key={index}
                  height={60}
                  width="100%"
                  style={{ marginBottom: 10, borderRadius: 8 }}
                />
              ))}
            </View>
          ) : transactions === null || transactions.length === 0 ? (
            <View className="w-full items-center justify-center mt-5">
              <Text className="text-gray-500">No transactions available</Text>
            </View>
          ) : (
            <FlatList
              data={transactions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderTransaction}
            />
          )}
        </View>
      </Animated.View>
    </Modal>
  );
};

export default CategoryModal;
