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
    <View style={{ flex: 1, backgroundColor: "#2C2C2C" }}>
      {/* Set the status bar style */}
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Background Image */}
      <Image
        source={images.effect}
        resizeMode="cover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />

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
