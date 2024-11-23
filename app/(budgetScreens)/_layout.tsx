import React from "react";
import { router, Stack } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

const BudgetLayout = () => {
  return (
    <Stack>
      {/* Budget Builder screens */}
      <Stack.Screen
        name="buildBudgetIntro"
        options={{
          headerShown: false,
          headerTitle: "",
          //   headerLeft: () => (
          //     <Ionicons
          //       name="close-outline"
          //       size={30}
          //       color="black"
          //       onPress={() => router.replace("/(tabs)/home")}
          //     />
          //   ),
        }}
      />
      <Stack.Screen
        name="budgetCategories"
        options={{
          headerShown: false,
          headerTitle: "",
          headerLeft: () => (
            <Ionicons
              name="arrow-back-sharp"
              size={30}
              color="black"
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="budgetCalculation"
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <Ionicons
              name="arrow-back-sharp"
              size={30}
              color="black"
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="budgetPeriod"
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <Ionicons
              name="arrow-back-sharp"
              size={30}
              color="black"
              onPress={() => router.back()}
            />
          ),
        }}
      />

      <Stack.Screen
        name="(budgetScreens)/budgetSummary"
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <Ionicons
              name="arrow-back-sharp"
              size={30}
              color="black"
              onPress={() => router.back()}
            />
          ),
          headerRight: () => (
            <Ionicons
              name="close-outline"
              size={30}
              color="black"
              onPress={() => router.replace("/(tabs)/home")}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default BudgetLayout;
