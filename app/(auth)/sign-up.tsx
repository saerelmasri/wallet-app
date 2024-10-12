import {
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import images from "../../constants/images";
import FormFields from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import SocialLoginButton from "@/components/SocialLoginButton";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {
  validateEmailAddress,
  validatePassword,
} from "@/helpers/authValidators";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submit = () => {
    if (form.email == "" || form.password == "" || form.confirmPassword == "") {
      Alert.alert("Fields cannot be empty");
      return;
    }

    const checkEmailFormat = validateEmailAddress(form.email);
    if (checkEmailFormat instanceof Error) {
      Alert.alert(checkEmailFormat.message);
      return;
    }

    const checkPasswordPattern = validatePassword(form.password);
    if (checkPasswordPattern instanceof Error) {
      Alert.alert(checkPasswordPattern.message);
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Passwords must be same");
      return;
    }

    createUserWithEmailAndPassword(getAuth(), form.email, form.password)
      .then((user) => {
        console.log("User:", user);
        if (user) {
          router.replace("/showNotifications");
        }
      })
      .catch((error) => {
        Alert.alert(
          "We found an user with the same email, is that you? Please sign in instead!"
        );
      });
  };

  return (
    <SafeAreaView className="bg-[#FCFCFC] h-full">
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView>
          <View className="w-full justify-center items-center h-full px-4 my-6">
            <Image
              source={images.coins}
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
                otherStyles="mt-5"
                type=""
              />
              <FormFields
                title="Password"
                placeHolder="Password"
                value={form.password}
                handleTextChange={(e: any) => setForm({ ...form, password: e })}
                otherStyles="mt-5"
                type="Password"
              />
              <FormFields
                title="Confirm Password"
                placeHolder="Confirm Password"
                value={form.confirmPassword}
                handleTextChange={(e: any) =>
                  setForm({ ...form, confirmPassword: e })
                }
                otherStyles="mt-5"
                type="confirmPassword"
              />
            </View>
            <CustomButton
              title="Sign In"
              handlePress={submit}
              containerStyle="mt-7 w-full bg-[#32D74B]"
              textStyle={"text-[#FCFCFC]"}
              isLoading={isSubmitting}
            />
            <View className="justify-center flex-row mt-5 opacity-70">
              <Text className="font-pmedium text-sm">Have an account? </Text>
              <Link
                href="/sign-in"
                className="font-pmedium text-sm text-[#05603A]"
              >
                Sign In
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
