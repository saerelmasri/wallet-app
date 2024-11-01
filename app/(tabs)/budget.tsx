import {
  View,
  SafeAreaView,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import React from "react";
import images from "@/constants/images";

const Planning = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Set the status bar style */}
      <StatusBar
        barStyle="dark-content"
      />
      <View className="border w-full h-[12vh]">

      </View>

      {/* SafeAreaView only for the content */}
      <SafeAreaView className="flex-1 h-full">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }}
        >

        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Planning;
