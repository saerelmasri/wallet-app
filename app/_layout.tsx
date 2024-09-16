import React, { useEffect, useState } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [isFirstLaunched, setIsFirstLaunched] = useState<boolean | null>(null);

  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  // Only fetch launch data once
  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        if (hasLaunched === null) {
          await AsyncStorage.setItem("hasLaunched", "true");
          setIsFirstLaunched(true);
        } else {
          setIsFirstLaunched(false);
        }
      } catch (error) {
        console.error("Error checking launch status:", error);
      }
    };

    checkFirstLaunch();
  }, []);

  // Hide SplashScreen once everything is loaded
  useEffect(() => {
    if (fontsLoaded && isFirstLaunched !== null) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isFirstLaunched]);

  // Return null while fonts and first launch data are being loaded
  if (!fontsLoaded || isFirstLaunched === null) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
