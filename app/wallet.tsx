import { View, SafeAreaView, ScrollView, StatusBar, Text } from "react-native";
import React from "react";
import WalletDesign from "@/components/WalletDesign";
import Records from "@/components/Records";
import { useLocalSearchParams } from "expo-router";

const Wallet = () => {
  const { accountName, balance, currency, cardColor } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, backgroundColor: "#2C2C2C" }}>
      {/* Set the status bar style */}
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* SafeAreaView only for the content */}
      <SafeAreaView className="flex-1 h-full">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 20,
            alignItems: "center",
            paddingTop: 20,
          }}
        >
          {/* Wallet at top */}
          <WalletDesign
            accountName={accountName}
            balance={Number(balance)}
            currency={currency}
            cardColor={cardColor}
            expense={0}
            income={0}
          />

          {/* Graph displaying some info for this wallets such as expenses/incomes */}
          <View className="w-full items-center pt-3 pb-3">
            <View className="border border-black-100 w-[92%] h-[180px] justify-center items-center rounded-2xl">
              <Text>Graph Goes here!</Text>
            </View>
          </View>

          {/* Records */}
          <View className="w-[95%]">
            <Records recordDate="18 October" />
            <Records recordDate="15 October" />
            <Records recordDate="10 October" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Wallet;
