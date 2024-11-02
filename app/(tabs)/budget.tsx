import {
  View,
  SafeAreaView,
  Image,
  ScrollView,
  StatusBar,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

import { Dropdown } from "react-native-element-dropdown";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PlanningButton from "@/components/PlanningButton";

const optionData = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const Budget = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Set the status bar style */}
      <StatusBar barStyle="dark-content" />
      {/* SafeAreaView only for the content */}
      <SafeAreaView className="flex-1 h-full">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }}
        >
          {/* <View className="border w-full flex-row justify-around items-center ">
            <TouchableOpacity onPress={() => console.log("Setting")}>
              <Ionicons name="settings-outline" size={24} color="black" />
            </TouchableOpacity>
            <View className="flex-row justify-center items-center">
              <Text>Budget:</Text>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "transparent" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={optionData}
                maxHeight={400}
                labelField="label"
                valueField="value"
                placeholder={""}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item: any) => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
            <TouchableOpacity onPress={() => console.log("Edit apperance")}>
              <Feather name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View> */}
          <View className="w-full flex justify-center p-5">
            <Text className="text-black text-3xl font-psemibold">Planning</Text>
            <Text className="text-black text-sm font-pregular mt-2">
              Plan smarter! Set budgets, track spending, and reach your saving
              goals—all in one place to help you stay on track and achieve more
              with your money.
            </Text>
          </View>

          <View className="w-full mt-5 flex justify-center items-center">
            <PlanningButton
              redirectUrl="/addGoal"
              color="#f1c232"
              icon={"Budget"}
              title="Budget"
              description="Stay on top of spending, set limits, and make every dollar count."
            />
            <PlanningButton
              redirectUrl="/goals"
              color="#15803d"
              icon={"Goals"}
              title="Saving Goals"
              description="Set goals, track progress, and watch your savings grow!"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Budget;

const styles = StyleSheet.create({
  dropdown: {
    width: 200,
    height: 50,
    borderColor: "transparent",
    borderWidth: 0.2,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderRadius: 8,
  },
  icon: {
    marginRight: 7,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#A9A9A9",
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  itemText: {
    fontSize: 14,
  },
});
