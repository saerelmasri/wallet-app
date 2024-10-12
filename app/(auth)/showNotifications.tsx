import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";

const newPassword = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const enableNotification = () => {};

  return (
    <SafeAreaView className="bg-[#FCFCFC] h-full">
      <ScrollView>
        <View className="w-full justify-center items-center h-full px-4 my-6">
          <Text className="font-pbold text-9xl p-5 opacity-10 text-center">
            8:00
          </Text>
          <View className="w-full mt-[50%]">
            <Text className="font-psemibold text-2xl p-5 text-center">
              Stay Informed with Real-Time Notification
            </Text>
            <Text className="font-plight text-sm p-5 text-center">
              Enable notifications to keep yourself updated with important
              financial alerts and insights. Get real-time update on your
              spending, budget status, and financial goals
            </Text>
          </View>
          <CustomButton
            title="Confirm"
            handlePress={enableNotification}
            containerStyle="mt-7 w-full bg-[#32D74B]"
            textStyle={"text-[#FCFCFC]"}
            isLoading={isSubmitting}
          />
          <CustomButton
            title="Not now"
            handlePress={() => {
              router.replace("/(tabs)/home");
            }}
            containerStyle="mt-7 w-full bg-[#EEE5FF]"
            textStyle={"text-[#FCFCFC]"}
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default newPassword;
