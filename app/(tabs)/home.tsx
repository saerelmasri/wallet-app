import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const logOut = () => {
    signOut(getAuth())
      .then(() => {
        router.replace("/(auth)/sign-in");
      })
      .catch((error) => {
        console.log(error?.message);
      });
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Home</Text>
        <CustomButton
          title="Sign In"
          handlePress={logOut}
          containerStyle="mt-7 w-full bg-[#32D74B]"
          textStyle={"text-[#FCFCFC]"}
          isLoading={isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
