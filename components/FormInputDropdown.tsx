import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type FormInputDropDownTypes = {
  title: string;
  placeholder: string;
  values: any;
  icon: "Wallet" | "Currency";
};

const FormInputDropdown = ({
  title,
  placeholder,
  values,
  icon,
}: FormInputDropDownTypes) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View className={`bg-white p-4 flex-row justify-start items-center w-full`}>
      <Text
        className="text-sm text-black font-psemibold"
        style={{ width: 130 }}
      >
        {title}
      </Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "#32D74B" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={values}
        maxHeight={400}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() =>
          icon === "Wallet" ? (
            <Ionicons
              style={styles.icon}
              name="wallet"
              size={20}
              color={isFocus ? "#32D74B" : "#A9A9A9"}
            />
          ) : (
            <MaterialCommunityIcons
              style={styles.icon}
              name="currency-usd"
              size={20}
              color={isFocus ? "#32D74B" : "#A9A9A9"}
            />
          )
        }
        renderItem={(item: any) => (
            <View style={styles.optionContainer}>
              {item.color && (
                <View style={[styles.colorCircle, { backgroundColor: item.color }]} />
              )}
              <Text style={styles.itemText}>{item.label}</Text>
            </View>
          )}
      />
    </View>
  );
};

export default FormInputDropdown;

const styles = StyleSheet.create({
  dropdown: {
    width: 250,
    height: 50,
    borderColor: "gray",
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
