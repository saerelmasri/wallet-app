import React, { useEffect, useState } from "react";
import { router, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TouchableOpacity } from "react-native";
import { getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseConfig } from "@/constants/test";

import Ionicons from "@expo/vector-icons/Ionicons";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  // const [isFirstLaunched, setIsFirstLaunched] = useState<boolean | null>(null);
  const [user, setUser] = useState<any | null>(null);

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

  const app =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

  // Initialize Firebase Auth if not already initialized
  let auth;
  try {
    auth = getAuth(app); // Get the existing Auth instance if it exists
  } catch (error) {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      if (authenticatedUser) {
        setUser(authenticatedUser);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  // Hide SplashScreen once everything is loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Return null while fonts and first launch data are being loaded
  if (!fontsLoaded) {
    return <Text className="text-2xl text-black-100">Loading...</Text>;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="transactions" options={{ headerShown: false }} />
      <Stack.Screen name="goals" options={{ headerShown: false }} />
      <Stack.Screen
        name="wallet"
        options={{
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back-sharp"
              size={24}
              color="white"
              onPress={() => router.back()}
            />
          ),
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#2C2C2C",
          },
          headerTintColor: "#fff",
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/addWallet")}
              style={{ marginRight: 10 }}
            >
              <Text className="text-white font-pmedium text-base">Edit</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="addWallet"
        options={{
          headerShown: true,
          title: "New Wallet",
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: "rgba(5, 96, 58, 0.98)",
          },
          headerTintColor: "#fff",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

export default RootLayout;
