import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

type SkeletonProps = {
  height: number;
  width: number | string;
  borderRadius?: number;
  shape?: "circle" | "square" | "rectangle";
  style?: object;
};

const Skeleton = ({
  height,
  width,
  borderRadius = 4,
  shape = "rectangle",
  style = {},
}: SkeletonProps) => {
  const shimmerAnim = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerAnim]);

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH],
  });

  // Adjust borderRadius for shapes
  const adjustedBorderRadius =
    shape === "circle" ? Math.min(height, Number(width)) / 2 : borderRadius;

  return (
    <View
      style={[
        styles.skeleton,
        { height, width, borderRadius: adjustedBorderRadius },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.shimmerOverlay,
          {
            transform: [{ translateX: shimmerTranslate }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
    position: "relative",
  },
  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#f5f5f5",
    opacity: 0.5,
  },
});

export default Skeleton;
