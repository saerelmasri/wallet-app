import { View, Text, Animated, TouchableWithoutFeedback } from "react-native";
import React, { useRef, useState } from "react";

type CategorySwitchType = {
  locked?: boolean;
};

const CategorySwitch = (props: CategorySwitchType) => {
  const [activeTab, setActiveTab] = useState("Expenses");
  const translateX = useRef(new Animated.Value(0)).current;

  const handleSwitch = (tab: "Expenses" | "Savings") => {
    setActiveTab(tab);

    Animated.timing(translateX, {
      toValue: tab === "Expenses" ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slidingTranslate = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 182],
  });

  return (
    <View className={`p-3 flex w-[90%] space-y-3`}>
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
            width: "50%",
            backgroundColor: "black",
            transform: [{ translateX: slidingTranslate }],
            borderRadius: 8,
          }}
        />

        <TouchableWithoutFeedback
          onPress={() => (props.locked ? "" : handleSwitch("Expenses"))}
        >
          <View
            className="w-[50%] justify-center items-center"
            style={{
              zIndex: 2,
            }}
          >
            <Text
              className={`${
                activeTab === "Expenses" ? "text-white" : "text-black"
              } font-pbold text-base`}
            >
              Expenses
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => (props.locked ? "" : handleSwitch("Savings"))}
        >
          <View
            className="w-[50%] justify-center items-center"
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
      </View>
    </View>
  );
};

export default CategorySwitch;
