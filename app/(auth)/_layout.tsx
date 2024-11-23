import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

function AuthLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
            presentation: "modal",
            gestureEnabled: true,
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
            presentation: "modal",
            gestureEnabled: true,
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{
            headerShown: false,
            presentation: "modal",
            gestureEnabled: true,
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}

export default AuthLayout;
