import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import images from "../../constants/images";
import FormFields from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import SocialLoginButton from "@/components/SocialLoginButton";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = () => {};

  return (
    <SafeAreaView className="bg-[#FCFCFC] h-full">
      <ScrollView>
        <View className="w-full justify-center items-center h-full px-4 my-6">
          <Image
            source={images.wallet}
            resizeMode="contain"
            className="w-[150px] h-[150px]"
          />

          <Text className="font-pbold text-2xl text-center">
            Welcome to Walletly 👋
          </Text>
          <Text className="font-pregular text-sm text-center text-[#91919F] mt-1">
            Enter your Email & Password to Sign in
          </Text>

          <View className="w-full ">
            <FormFields
              title="Email"
              value={form.email}
              placeHolder="Email Address"
              handleTextChange={(e: any) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            <FormFields
              title="Password"
              placeHolder="Password"
              value={form.password}
              handleTextChange={(e: any) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />
            <Link
              href={"/forgot-password" as any}
              className="font-pmedium text-sm text-[#05603A] text-right mt-5"
            >
              Forgot Password?
            </Link>
          </View>
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyle="mt-7 w-full bg-[#32D74B]"
            textStyle={"text-[#FCFCFC]"}
            isLoading={isSubmitting}
          />
          
          <View className="justify-center flex-row mt-5 opacity-70">
            <Text className="font-pmedium text-sm">
              Don't have an account yet?{" "}
            </Text>
            <Link
              href="/sign-up"
              className="font-pmedium text-sm text-[#05603A]"
            >
              Sign Up
            </Link>
          </View>
          <View className="w-full h-0.5 rounded bg-[#05603A] opacity-20 mt-auto" />
          <View className="w-full mt-auto flex-row justify-center items-center p-2">
            <SocialLoginButton
              loginType="Google"
              extraStyle="mr-5"
              handleLogin={() => console.log("Google")}
            />
            <SocialLoginButton
              loginType="Apple"
              extraStyle="ml-5"
              handleLogin={() => console.log("Apple")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;