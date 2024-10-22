import {
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
} from "react-native";
import React from "react";

import Fontisto from '@expo/vector-icons/Fontisto';

const Transactions = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#2C2C2C" }}>
      {/* Set the status bar style */}
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      {/* SafeAreaView only for the content */}
      <SafeAreaView className="flex-1 h-full">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }}
        >
          <View className="border border-white w-full h-[30vh]"></View>
          <View className="border border-white w-full h-"></View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Transactions;


{/* <View className="w-full p-4 space-y-3">
            <Text className="text-white text-3xl font-psemibold">Records</Text>
            <View
              className={`flex-row items-center space-x-2 bg-white opacity-80 rounded-2xl px-4 py-1`}
            >
              <Fontisto name="search" size={24} color="black" />
              {/* TextInput Field */}
          //     <TextInput
          //       className="w-full h-10 text-black font-pregular text-sm"
          //       value={""}
          //       placeholder={"Puta"}
          //       placeholderTextColor="#696969"
          //       onChangeText={() => {}}
          //       autoCapitalize="none"
          //       autoCorrect={false}
          //     />
          //   </View>
          // </View> */}