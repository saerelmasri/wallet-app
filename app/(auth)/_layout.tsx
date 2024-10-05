import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

function AuthLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
        <Stack.Screen name="newPassword" options={{ headerShown: false }} />
        <Stack.Screen
          name="splashScreenState"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}

export default AuthLayout;
