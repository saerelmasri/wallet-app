import React, { useRef, useState } from "react";
import { Dimensions, FlatList, Image, Text } from "react-native";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import images from "@/constants/images";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

type DataType = {
  id: number;
  image: string;
  title: string;
  description: string;
};

const data: DataType[] = [
  {
    id: 1,
    image: images.wallet,
    title: "Manage & Track Your Money in One App",
    description:
      "Take control of your financial future with our all-in-one finance management app. Designed to simplify and streamline your money matters",
  },
  {
    id: 2,
    image: images.coins,
    title: "Gain total control of your money",
    description: "Become your own money manager and make every cent count",
  },
  {
    id: 3,
    image: images.pig,
    title: "Know where your money goes",
    description:
      "Track your transaction easily with categories and financial report",
  },
];

const { width, height } = Dimensions.get("window");

const Slide = ({ item }: { item: DataType }) => {
  return (
    <View
      style={{ width, justifyContent: "center", alignItems: "center" }} // Ensure each slide takes up full screen width
      className="p-5"
    >
      <Image
        source={item.image}
        className="w-[400px] h-[400px]"
        resizeMode="contain"
      />
      <Text
        className="font-pbold text-3xl text-center"
        numberOfLines={2}
        style={{ width: width * 0.8 }}
      >
        {item.title}
      </Text>
      <Text
        className="font-pmedium text-xs text-center text-[#91919F] mt-5"
        numberOfLines={3}
        style={{ width: width * 0.8 }} // Dynamically set maxWidth to 70% of screen width
      >
        {item.description}
      </Text>
    </View>
  );
};

const App = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef(null);

  const Footer = () => {
    return (
      <>
        <View
          style={{
            height: height * 0.05,
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <View className="flex-row justify-center">
            {data.map((_, index) => (
              <View
                key={index}
                className={`h-[4px] w-[10px] bg-gray-500 rounded-sm mx-3 ${
                  currentSlideIndex === index && "bg-[#32D74B] w-[25px]"
                }`}
              />
            ))}
          </View>
        </View>
        {currentSlideIndex === data.length - 1 ? (
          <View className="w-full p-5">
            <CustomButton
              title="Get Started"
              handlePress={() => router.push("/sign-in")}
              containerStyle="w-full bg-[#32D74B]"
              textStyle={"text-[#FCFCFC]"}
            />
          </View>
        ) : (
          <View className="flex flex-row justify-between items-center p-5">
            <CustomButton
              title="Skip"
              handlePress={skipSlides}
              containerStyle="w-[48%] bg-[#EEE5FF]"
              textStyle={"text-[#05603A]"}
            />
            <View className="w-1" />
            <CustomButton
              title="Next"
              handlePress={goNextSlide}
              containerStyle="w-[48%] bg-[#32D74B]"
              textStyle={"text-[#FCFCFC]"}
            />
          </View>
        )}
      </>
    );
  };

  const updateCurrentIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlide = currentSlideIndex + 1;
    if (nextSlide !== data.length) {
      const offset = nextSlide * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlide);
    }
  };

  const skipSlides = () => {
    const lastSlideIndex = data.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  return (
    <SafeAreaView className="bg-[#FCFCFC] h-full flex-1">
      <View className="w-full justify-center items-center h-full">
        <FlatList
          ref={ref}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item }) => <Slide item={item} />}
          pagingEnabled
          snapToAlignment="center"
          contentContainerStyle={{
            height: height * 0.7,
            justifyContent: "center",
            alignItems: "center",
          }}
          className="flex-1"
          onMomentumScrollEnd={updateCurrentIndex}
        />
        <Footer />
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default App;
