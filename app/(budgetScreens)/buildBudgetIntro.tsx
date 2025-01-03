import { View, Text, SafeAreaView, StatusBar } from "react-native";
import { Image } from "expo-image";
import React from "react";
import images from "../../constants/images";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

const BuildBudgetIntro = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView
        className="flex-1 h-full"
        style={{
          paddingBottom: 20,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View className="justify-center items-center w-full h-full p-3">
          <Image
            source={images.pig}
            contentFit="contain"
            className="w-[300px] h-[300px] mt-auto"
          />
          <View className="p-4 flex justify-center items-center mt-auto">
            <Text className="text-black font-psemibold text-2xl text-center">
              Setup your first budget 💰
            </Text>
            <Text className="text-black font-pregular text-sm mt-3 text-center">
              We'll guide you through the steps of setting up your personalised
              household budget
            </Text>
          </View>
          <View className="w-full justify-center items-center mt-auto">
            <CustomButton
              title="Let's start"
              //@ts-ignore
              handlePress={() => {
                router.push("/budgetIncome");
              }}
              containerStyle="mt-7 w-[90%] h-[60px] bg-[#05603A]"
              textStyle={"text-[#FCFCFC]"}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default BuildBudgetIntro;
