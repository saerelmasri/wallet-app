import React, { useEffect, useState } from "react";
import { router, useSegments, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Text, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";

import Ionicons from "@expo/vector-icons/Ionicons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

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

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log("onAuthStateChanged:", user);
    setUser(user);
    if (initializing) setInitializing(false);
  };

  const segments = useSegments();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (user && !inAuthGroup) {
      router.replace("/(tabs)/home");
    } else if (!user && inAuthGroup) {
      router.replace("/");
    }
  }, [user, initializing]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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

        {/* Wallet Screens */}
        <Stack.Screen
          name="wallet"
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
            headerTitle: "",
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: "#fff",
            headerShadowVisible: false,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.push("/addWallet")}
                style={{ marginRight: 10 }}
              >
                <Text className="text-black font-pmedium text-base">Edit</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="addWallet"
          options={{
            headerShown: true,
            title: "New Wallet",
            headerTitleStyle: {
              color: "black",
              fontSize: 22,
              fontWeight: "bold",
            },
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "white",
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
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-red-600 font-pmedium text-base">
                  Cancel
                </Text>
              </TouchableOpacity>
            ),
          }}
        />

        {/* Transaction Screens */}
        <Stack.Screen
          name="transactions"
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
            headerTitle: "",
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: "#fff",
            headerShadowVisible: false,
          }}
        />
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
