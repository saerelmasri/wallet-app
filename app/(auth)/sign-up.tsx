import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import images from "../../constants/images";
import FormFields from "../../components/FormFields";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";

import {
  validateEmailAddress,
  validatePassword,
} from "../../helpers/authValidators";
import { registerUser } from "../../api/auth/firebaseAuth";

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

    registerUser(form);
  };

  return (
    <SafeAreaView className="bg-[#FCFCFC] h-full">
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView>
          <View className="w-full justify-center items-center h-full px-4 my-6">
            <Image
              source={images.coins}
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
                otherStyles="mt-5"
                type=""
              />
              <FormFields
                placeHolder="Password"
                value={form.password}
                handleTextChange={(e: any) => setForm({ ...form, password: e })}
                otherStyles="mt-5"
                type="Password"
              />
              <FormFields
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
              containerStyle="mt-7 w-full bg-[#32D74B] h-[60px]"
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
