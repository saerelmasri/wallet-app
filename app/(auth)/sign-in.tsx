import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Image } from 'expo-image';
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import images from "../../constants/images";
import FormFields from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.email || !form.password) {
      return Alert.alert("Fields cannot be empty");
    }

    signInWithEmailAndPassword(getAuth(), form.email, form.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          console.log("User info:", user);
          router.replace("/(tabs)/home");
        }
      })
      .catch(() => {
        Alert.alert("Email or Password doesn't match.\n Please try again.");
      });
  };

  return (
    <SafeAreaView className="bg-[#FCFCFC] h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust keyboard handling
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View className="w-full justify-center items-center h-full px-4 my-6">
            <Image
              source={images.wallet}
              contentFit="contain"
              className="w-[150px] h-[150px]"
            />
            <Text className="font-pregular text-sm text-center text-[#91919F] mt-1">
              Enter your Email & Password to Sign in
            </Text>

            <View className="w-full ">
              <FormFields
                value={form.email}
                placeHolder="Email Address"
                handleTextChange={(e: any) => setForm({ ...form, email: e })}
                otherStyles="mt-7"
                type=""
              />
              <FormFields
                placeHolder="Password"
                value={form.password}
                handleTextChange={(e: any) => setForm({ ...form, password: e })}
                otherStyles="mt-7"
                type="Password"
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
              handlePress={() => router.replace("/(tabs)/home")}
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
