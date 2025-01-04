import { View, Text, Modal, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import Chip from '../Chip'

type ModalFilterTypes = {
    modalVisible: boolean;
    setModalVisible: (value: boolean) => void;
    handleGoalChange: any;
    selectedGoal: any;
    userId: string;
    isLoading: boolean
  };

const ModalFilters = () => {
    
  return (
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
                  {["Expenses", "Savings"].map((type) => (
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
                  {Categories.map((category, index) => (
                    <Chip
                      key={index}
                      title={category.name}
                      selected={filterOptions.category === category.name}
                      onPress={() =>
                        toggleFilterOption("category", category.name)
                      }
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
  )
}

export default ModalFilters