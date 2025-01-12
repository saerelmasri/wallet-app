import { View, Text, Animated, TouchableWithoutFeedback } from "react-native";
import React, { useRef, useState, useEffect } from "react";

type CategorySwitchType = {
  locked?: boolean;
  handleCategoryType: any;
};

const CategorySwitch = (props: CategorySwitchType) => {
  // Set initial activeTab to "Needs" to make it preselected
  const [activeTab, setActiveTab] = useState<"Savings" | "Needs" | "Wants">(
    "Needs" // Preselected tab is now "Needs"
  );

  const translateX = useRef(new Animated.Value(1)).current; // Default to "Needs"

  const handleSwitch = (tab: "Savings" | "Needs" | "Wants") => {
    if (props.locked) return; // Prevent switching if locked
    setActiveTab(tab);

    props.handleCategoryType(tab);

    // Set translation value based on the selected tab
    const toValue = tab === "Savings" ? 0 : tab === "Needs" ? 1 : 2;

    Animated.timing(translateX, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slidingTranslate = translateX.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 120, 240],
  });

  return (
    <View className="p-3 flex w-[90%] space-y-3">
      <Text className="text-base w-[150px] text-black font-psemibold">
        Category Type
      </Text>

      <View className="border w-full h-12 rounded-lg flex-row relative overflow-hidden">
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "33.33%", // Adjust width for three tabs
            backgroundColor: "black",
            transform: [{ translateX: slidingTranslate }],
            borderRadius: 8,
          }}
        />

        {/* Savings Tab */}
        <TouchableWithoutFeedback onPress={() => handleSwitch("Savings")}>
          <View
            className="w-[33.33%] justify-center items-center"
            style={{
              zIndex: 2,
            }}
          >
            <Text
              className={`${
                activeTab === "Savings" ? "text-white" : "text-black"
              } font-pbold text-base`}
            >
              Savings
            </Text>
          </View>
        </TouchableWithoutFeedback>

        {/* Needs Tab */}
        <TouchableWithoutFeedback onPress={() => handleSwitch("Needs")}>
          <View
            className="w-[33.33%] justify-center items-center"
            style={{
              zIndex: 2,
            }}
          >
            <Text
              className={`${
                activeTab === "Needs" ? "text-white" : "text-black"
              } font-pbold text-base`}
            >
              Needs
            </Text>
          </View>
        </TouchableWithoutFeedback>

        {/* Wants Tab */}
        <TouchableWithoutFeedback onPress={() => handleSwitch("Wants")}>
          <View
            className="w-[33.33%] justify-center items-center"
            style={{
              zIndex: 2,
            }}
          >
            <Text
              className={`${
                activeTab === "Wants" ? "text-white" : "text-black"
              } font-pbold text-base`}
            >
              Wants
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default CategorySwitch;
