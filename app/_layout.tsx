import React, { useEffect, useState } from "react";
import { useSegments, SplashScreen, Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { Text, TouchableOpacity } from "react-native";
import { onAuthStateChanged, User } from "firebase/auth";

import Ionicons from "@expo/vector-icons/Ionicons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { auth } from "../configs/firebaseConfig";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const segments = useSegments();
  const router = useRouter();

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, [initializing]);

  useEffect(() => {
    if (initializing) return; // Wait for initialization

    const inAuthGroup = segments[0] === "(auth)";

    if (user && inAuthGroup) {
      router.replace("/(tabs)/home");
    } else if (!user && !inAuthGroup) {
      router.replace("/");
    }
  }, [user, segments, initializing]);

  if (!fontsLoaded || initializing) {
    // Show loading screen while fonts or auth is initializing
    return <Text>Loading...</Text>;
  }

  if (!initializing && fontsLoaded) {
    SplashScreen.hideAsync();
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" backgroundColor="white" />
      <Stack
        screenOptions={{
          gestureEnabled: false,
        }}
      >
        {/* Main App Screens */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
            presentation: "modal",
            gestureEnabled: true,
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(budgetScreens)" options={{ headerShown: false }} />

        {/* Goal Screens*/}
        <Stack.Screen
          name="goals"
          options={{
            headerShown: true,
            headerLeft: () => (
              <Ionicons
                name="arrow-back-sharp"
                size={24}
                color="black"
                onPress={() => router.back()}
              />
            ),
            headerTitle: "Goals",
            headerTitleStyle: {
              color: "black",
            },
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: "#fff",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="newGoal"
          options={{
            headerShown: true,
            headerTitle: "Set your new goal",
            headerLeft: () => (
              <Ionicons
                name="arrow-back-sharp"
                size={24}
                color="black"
                onPress={() => router.back()}
              />
            ),
            headerTitleStyle: {
              color: "black",
            },
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: "#fff",
            headerShadowVisible: false,
            headerRight: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-red-600 font-pmedium text-base">
                  Cancel
                </Text>
              </TouchableOpacity>
            ),
          }}
        />

        {/* Category Editor Screen*/}
        <Stack.Screen
          name="categoryEditor"
          options={{
            presentation: "modal",
            gestureEnabled: true,
            animationTypeForReplace: "pop",
            headerShown: false,
            gestureDirection: "vertical",
            contentStyle: {
              backgroundColor: "transparent",
            },
          }}
        />

        {/* About Screen*/}
        <Stack.Screen
          name="about"
          options={{
            presentation: "modal",
            gestureEnabled: true,
            animationTypeForReplace: "pop",
            headerShown: false,
            gestureDirection: "vertical",
            contentStyle: {
              backgroundColor: "transparent",
            },
          }}
        />

        {/* Transaction Screens */}
        <Stack.Screen
          name="newTransaction"
          options={{
            headerShown: true,
            title: "",
            headerStyle: {
              backgroundColor: "#FFF",
            },
            headerTintColor: "#fff",
            headerShadowVisible: false,
            headerLeft: () => (
              <Ionicons
                name="arrow-back-sharp"
                size={24}
                color="black"
                onPress={() => router.back()}
              />
            ),
            headerRight: () => (
              <Ionicons
                name="close-outline"
                size={30}
                color="black"
                onPress={() => router.replace("/home")}
              />
            ),
          }}
        />
        <Stack.Screen
          name="numPad"
          options={{
            headerShown: true,
            title: "",
            headerStyle: {
              backgroundColor: "#32D74B",
            },
            headerTintColor: "#fff",
            headerShadowVisible: false,
            headerRight: () => (
              <Ionicons
                name="close-outline"
                size={35}
                color="white"
                onPress={() => router.replace("/home")}
              />
            ),
            headerLeft: () => <></>,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
