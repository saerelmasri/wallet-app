import { View, Text, Image } from "react-native";
import { Tabs } from "expo-router";
import icons from "../../constants/icons";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";

type TabIconTypes = {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
  circular?: boolean;
};

const TabIcon = ({ icon, color, name, focused, circular }: TabIconTypes) => {
  return (
    <View
      className={`items-center justify-center gap-2 ${
        circular ? "rounded-full bg-[#32D74B] p-3" : ""
      }`}
    >
      <Image source={icon} resizeMode="contain" className="w-6 h-6" />
      {!circular && (
        <Text
          className={`${
            focused
              ? "font-psemibold text-[#32D74B]"
              : "font-pregular text-white"
          } text-xs`}
        >
          {name}
        </Text>
      )}
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
              backgroundColor: "#2C2C2C",
              borderTopWidth: 1,
              borderTopColor: "#232533",
              height: 84,
              paddingTop: 10,
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.home}
                  color={color}
                  focused={focused}
                  name="Home"
                />
              ),
            }}
          />
          <Tabs.Screen
            name="transaction"
            options={{
              title: "Transactions",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.transaction}
                  color={color}
                  focused={focused}
                  name="Transactions"
                />
              ),
            }}
          />

          {/* Action Tab with Circular Button */}
          <Tabs.Screen
            name="action"
            options={{
              title: "Action",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => console.log("Action button pressed!")}
                  hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                  style={{
                    position: "absolute",
                    bottom: 1,
                    left: "50%",
                    transform: [{ translateX: -75 }],
                    zIndex: 1,
                    width: 70,
                    height: 70,
                    borderRadius: 40,
                    backgroundColor: "#32D74B",
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  <TabIcon
                    icon={icons.action}
                    color="#FFF" // White color for the icon on the button
                    focused={focused}
                    name="Action"
                    circular
                  />
                </TouchableOpacity>
              ),
            }}
          />

          <Tabs.Screen
            name="report"
            options={{
              title: "Report",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.report}
                  color={color}
                  focused={focused}
                  name="Report"
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.profile}
                  color={color}
                  focused={focused}
                  name="Profile"
                />
              ),
            }}
          />
        </Tabs>
      </>
    </GestureHandlerRootView>
  );
};

export default TabLayout;
