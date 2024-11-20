import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Chevron from "./Chevron";
import Animated, {
  Extrapolation,
  interpolate,
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { displayAmount } from "@/helpers/common-helper";

export type ValueTypes = {
  breakdown: {
    id: string;
    name: string;
    emoji: string;
    color: string;
    allocatedBudget: number;
  }[];
  title: string;
  usedPercentage: string;
};

const CollapsibleView = (props: ValueTypes) => {
  const open = useSharedValue(false);
  const heightValue = useSharedValue(0);
  const listRef = useAnimatedRef<Animated.View>();
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0)
  );
  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: interpolate(
      progress.value,
      [0, 1],
      [0, heightValue.value],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <View style={style.container}>
      <Pressable
        style={style.titleContainer}
        onPress={() => {
          if (heightValue.value === 0) {
            runOnUI(() => {
              "worklet";
              heightValue.value = measure(listRef)?.height as number;
            })();
          }
          open.value = !open.value;
        }}
      >
        <Text className="text-black font-pmedium text-base">
          {props.usedPercentage} used
        </Text>
        <Text className="text-black font-pmedium text-base">{props.title}</Text>
        <Chevron progress={progress} />
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View ref={listRef} style={style.contentContainer}>
          {props.breakdown.map(
            (
              value: {
                id: string;
                name: string;
                emoji: string;
                color: string;
                allocatedBudget: number;
              },
              index: any
            ) => {
              return (
                <View key={index} style={style.content}>
                  <Text className="text-black font-pregular text-sm">
                    {value.emoji} {value.name}
                  </Text>
                  <Text className="text-black font-pregular text-sm">
                    ${displayAmount(value.allocatedBudget)}
                  </Text>
                </View>
              );
            }
          )}
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default CollapsibleView;

const style = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    overflow: "hidden",
  },
  titleContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
  },
  content: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
