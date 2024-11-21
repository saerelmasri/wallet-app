import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { router } from "expo-router";

import images from "@/constants/images";
import CustomButton from "@/components/CustomButton";

const App = () => {
  return (
    <SafeAreaView className="bg-[#FCFCFC] h-full flex-1">
      <View className="w-full flex justify-between items-center h-full space-y-10">
        <Image
          source={images.pig}
          contentFit="contain"
          className="w-[250px] h-[250px]"
        />
        <View className="p-5 space-y-4">
          <Text className="text-black font-psemibold text-2xl">Welcome to the app</Text>
          <Text className="text-black font-pregular text-base">We’re so glad you’re here. 🎉</Text>
          <Text className="text-black font-pregular text-base">
            Managing your money doesn’t have to be stressful. We’re here to help
            you take control, track your spending, and save for the things that
            matter most.
          </Text>
          <Text className="text-black font-pregular text-base">
            Let’s start building a brighter financial future—one step at a time.
            🌟
          </Text>
        </View>
        <View className="flex w-full p-5">
          <CustomButton
            title="Create an Account"
            handlePress={() => router.push("/(auth)/sign-up")}
            containerStyle="w-[100%] h-[60px] bg-[#32D74B]"
            textStyle={"text-[#FCFCFC]"}
          />
          <CustomButton
            title="Login"
            handlePress={() => router.push("/(auth)/sign-in")}
            containerStyle="w-[100%] h-[60px] bg-[#2C2C2C] mt-2"
            textStyle={"text-[#FCFCFC]"}
          />
        </View>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default App;
