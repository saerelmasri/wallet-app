import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

import images from "../../constants/images";
import FormFields from "../../components/FormFields";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../configs/firebaseConfig";

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
  });

  const submit = () => {
    sendPasswordResetEmail(auth, form.email)
      .then(() => {
        router.push({
          pathname: "/(auth)/sign-in",
          params: {
            imageType: "email",
            title: "Reset Email Sent",
            subTitle: "Please check your main inbox or spam for the reset link",
          },
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  return (
    <SafeAreaView className="bg-[#FCFCFC] h-full">
      <ScrollView>
        <View className="w-full justify-center items-center h-full px-4 my-6">
          <Image
            source={images.pig}
            contentFit="contain"
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
              value={form.email}
              handleTextChange={(e: any) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              type=""
            />
          </View>
          <CustomButton
            title="Next"
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
