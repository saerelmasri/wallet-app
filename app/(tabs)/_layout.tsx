import { View, Text, TouchableOpacity } from "react-native";
import { router, Tabs, usePathname } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";

type TabIconTypes = {
  icon: "Home" | "Budget" | "Profile" | "Transactions";
  name: string;
  focused: boolean;
  circular?: boolean;
};

const TabIcon = ({ icon, name, focused, circular }: TabIconTypes) => {
  const iconMap = {
    Home: (
      <MaterialIcons
        name="space-dashboard"
        size={24}
        color={focused ? "#32D74B" : "black"}
      />
    ),
    Budget: (
      <Feather
        name="pie-chart"
        size={24}
        color={focused ? "#32D74B" : "black"}
      />
    ),
    Profile: (
      <MaterialCommunityIcons
        name="account"
        size={24}
        color={focused ? "#32D74B" : "black"}
      />
    ),
    Transactions: (
      <MaterialIcons
        name="swap-horiz"
        size={24}
        color={focused ? "#32D74B" : "black"}
      />
    ),
  };

  return (
    <View
      className={`w-[20vw] items-center justify-center ${
        circular ? "rounded-full bg-[#32D74B]" : ""
      }`}
    >
      {iconMap[icon]}
      {!circular && (
        <Text
          style={{ fontSize: 12, marginTop: 4, textAlign: "center" }}
          className={`${
            focused
              ? "font-psemibold text-[#32D74B]"
              : "font-pregular text-black"
          } text-xs`}
        >
          {name}
        </Text>
      )}
    </View>
  );
};

const TabLayout = () => {
  // Track the focused tab route name
  const currentRouteName = usePathname();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <>
        {/* Tabs without Add Button */}
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#32D74B",
            tabBarInactiveTintColor: "#CDCDE0",
            tabBarStyle: {
              backgroundColor: "white",
              borderTopWidth: 1,
              borderTopColor: "white",
              height: 85,
              paddingTop: 10,
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon icon="Home" focused={focused} name="Home" />
              ),
            }}
          />
          <Tabs.Screen
            name="transactions"
            options={{
              title: "Transactions",
              headerStyle: {
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: "black",
              headerTitleAlign: "left",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 30,
              },
              headerShown: true,
              tabBarIcon: ({ focused }) => (
                <TabIcon
                  icon="Transactions"
                  focused={focused}
                  name="Transactions"
                />
              ),
            }}
          />
          <Tabs.Screen
            name="budget"
            options={{
              title: "Planning",
              headerStyle: {
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: "black",
              headerTitleAlign: "left",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 30,
              },
              headerShown: true,
              tabBarIcon: ({ focused }) => (
                <TabIcon icon="Budget" focused={focused} name="Budget" />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              headerStyle: {
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: "black",
              headerTitleAlign: "left",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 30,
              },
              headerShown: true,
              tabBarIcon: ({ focused }) => (
                <TabIcon icon="Profile" focused={focused} name="Profile" />
              ),
            }}
          />
        </Tabs>

        {/* Floating Add Transaction Button Only on Home */}
        {currentRouteName === "/home" && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/numPad")}
            style={{
              position: "absolute",
              bottom: 120,
              right: 40,
              alignSelf: "center",
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "#32D74B",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              zIndex: 10,
            }}
          >
            <Ionicons name="add-outline" size={36} color="white" />
          </TouchableOpacity>
        )}
      </>
    </GestureHandlerRootView>
  );
};

export default TabLayout;
