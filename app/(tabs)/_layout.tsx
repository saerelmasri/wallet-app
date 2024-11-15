import { View, Text } from "react-native";
import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type TabIconTypes = {
  icon: "Home" | "Budget" | "Profile";
  name: string;
  focused: boolean;
};

const TabIcon = ({ icon, name, focused }: TabIconTypes) => {
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
  };

  return (
    <View className={`w-[20vw] items-center justify-center`}>
      {iconMap[icon]}
      <Text
        style={{ fontSize: 12, marginTop: 4, textAlign: "center" }}
        className={`${
          focused ? "font-psemibold text-[#32D74B]" : "font-pregular text-black"
        } text-xs`}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <>
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
              title: "Overview",
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
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon icon="Home" focused={focused} name="Transactions" />
              ),
            }}
          />
          <Tabs.Screen
            name="budget"
            options={{
              title: "Budget",
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon icon="Budget" focused={focused} name="Budget" />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon icon="Profile" focused={focused} name="Profile" />
              ),
            }}
          />
        </Tabs>
      </>
    </GestureHandlerRootView>
  );
};

export default TabLayout;
