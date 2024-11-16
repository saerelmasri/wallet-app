import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const BudgetCalculation = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <View className="w-full h-full p-3">
        {/*Title*/}
        <View className="p-4 flex items-start space-y-3">
          <Text className="text-black font-psemibold text-xl">
            Let's allocate some money
          </Text>
          <Text className="text-black font-pregular text-xs ">
            The following amounts are just suggestions. You can update the
            allocated money on each category, don't worry we will let you knw if
            might exceed the budget
          </Text>
        </View>

        <ScrollView style={{ padding: 20 }}>
          <View className="border border-black-200 w-full rounded-lg">
            {/*Category name and emoji*/}
            <View className="w-full flex-row p-3">
              <View className="border w-[50px] h-[50px] rounded-full"></View>
              <View className="justify-center p-3">
                <Text className="text-black font-psemibold text-base">
                  Category Name
                </Text>
              </View>
            </View>
            <View className="w-full pl-3 pr-3">
              <Text className="text-black font-pregular text-xs">
                Amount Allocated
              </Text>
              <View className="w-full flex-row space-x-3 pt-3 pb-3">
                <TextInput
                  className="w-[120px] h-[55px] border text-black font-pmedium text-base p-3 rounded-lg"
                  value={`$ `}
                  placeholder={"Budget"}
                  placeholderTextColor="#A9A9A9"
                  onChangeText={() => console.log("Test")}
                  keyboardType="numeric"
                />
                <TextInput
                  className="w-[150px] h-[55px] border text-black font-pmedium text-xs p-3 rounded-lg"
                  value={""}
                  placeholder={"Budget"}
                  placeholderTextColor="#A9A9A9"
                  onChangeText={() => console.log("Test")}
                  autoCapitalize="none"
                  keyboardType="numeric"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => {
                    console.log("Delete");
                  }}
                  className="justify-center items-center p-3 h-[60px]"
                >
                  <FontAwesome5 name="trash" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <CustomButton
          title="Let's start"
          handlePress={() => {
            console.log("Let's start");
          }}
          containerStyle="bg-[#05603A] absolute bottom-0 right-0 mr-5 mb-5 h-[50px] w-[140px]"
          textStyle={"text-[#FCFCFC]"}
        />
      </View>
    </SafeAreaView>
  );
};

export default BudgetCalculation;
