import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Image } from 'expo-image';
import images from "@/constants/images";

type SplashScreenTypes = {
  imageType: "email";
  title: string;
  subTitle: string;
};

const imageMap = {
  email: images.email,
};

const splashScreenState = () => {
  const { imageType, title, subTitle } = useLocalSearchParams();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/sign-in");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="bg-[#05603A]">
      <View className="w-full h-full flex justify-center items-center ">
        <Image
        // @ts-ignore
          source={imageMap[imageType]}
          contentFit="contain"
          className="w-[300px] h-[300px]"
        />
        <Text className="text-white text-4xl font-pbold">{title}</Text>
        <Text className="text-white text-lg font-pmedium mt-2 text-center pl-10 pr-10">
          {subTitle}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default splashScreenState;
