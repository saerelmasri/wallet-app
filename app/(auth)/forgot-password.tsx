import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import images from "../../constants/images";
import FormFields from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = () => {
    router.push("/newPassword" as any)
  };

  return (
    <SafeAreaView className="bg-[#FCFCFC] h-full">
      <ScrollView>
        <View className="w-full justify-center items-center h-full px-4 my-6">
          <Image
            source={images.pig}
            resizeMode="contain"
            className="w-[150px] h-[150px]"
          />
          <Text className="font-pbold text-2xl text-center">
            Forgot your Password? 🔒
          </Text>
          <Text className="font-pregular text-sm text-center text-[#91919F] mt-1">
            No worries! Enter your Email to reset Password
          </Text>
          <View className="w-full ">
            <FormFields
              title="Email"
              value={form.email}
              handleTextChange={(e: any) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
          </View>
          <CustomButton
            title="Send Email"
            handlePress={submit}
            containerStyle="mt-7 w-full bg-[#32D74B]"
            textStyle={"text-[#FCFCFC]"}
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
