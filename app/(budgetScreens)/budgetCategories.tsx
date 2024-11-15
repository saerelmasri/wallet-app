import { View, Text, SafeAreaView, StatusBar, ScrollView } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import {
  NeedCategory,
  SavingsDebtCategory,
  WantsCategory,
} from "@/constants/Category";
import ChipCategory from "@/components/ChipCategory";

const BudgetCategories = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="w-full h-full p-3">
          {/*Title*/}
          <View className="p-4 flex items-start space-y-3">
            <Text className="text-black font-psemibold text-xl">
              Select your common expenses - Choose the typical expenses for each
              category.
            </Text>
            <Text className="text-black font-pregular text-xs ">
              50-30-20 Strategy - We're using this method to build your budget,
              but you can customize the categories to suit your needs.
            </Text>
          </View>

          {/*Needs Category*/}
          <View className="p-4 flex items-start space-y-3">
            <Text className="text-black font-pregular text-xs">
              Needs Category - Allocate 50% of your budget to essential fixed
              expenses.
            </Text>
            <View className="flex-row flex-wrap ">
              {[
                ...NeedCategory.map((category) => (
                  <ChipCategory
                    key={category.id}
                    title={category.name}
                    selected={false}
                    onPress={() => console.log()}
                    containerStyle="m-[5px]"
                  />
                )),
                <ChipCategory
                  key={"add-category-id"}
                  title={"Add a category +"}
                  selected={true}
                  onPress={() => console.log()}
                  containerStyle="m-[5px]"
                />,
              ]}
            </View>
          </View>

          {/*Wants Category*/}
          <View className="p-4 flex items-start space-y-3">
            <Text className="text-black font-pregular text-xs">
              Wants Category - Allocate 30% of your budget to non-essential
              expenses.
            </Text>
            <View className="flex-row flex-wrap ">
              {[
                ...WantsCategory.map((category) => (
                  <ChipCategory
                    key={category.id}
                    title={category.name}
                    selected={false}
                    onPress={() => console.log()}
                    containerStyle="m-[5px]"
                  />
                )),
                <ChipCategory
                  key={"add-category-id"}
                  title={"Add a category +"}
                  selected={true}
                  onPress={() => console.log()}
                  containerStyle="m-[5px]"
                />,
              ]}
            </View>
          </View>

          {/*Savings Category*/}
          <View className="p-4 flex items-start space-y-3">
            <Text className="text-black font-pregular text-xs">
              Savings/Debt Category - Allocate 20% of your budget to savings and
              debt repayment.
            </Text>
            <View className="flex-row flex-wrap ">
              {[
                ...SavingsDebtCategory.map((category) => (
                  <ChipCategory
                    key={category.id}
                    title={category.name}
                    selected={false}
                    onPress={() => console.log()}
                    containerStyle="m-[5px]"
                  />
                )),
                <ChipCategory
                  key={"add-category-id"}
                  title={"Add a category +"}
                  selected={true}
                  onPress={() => console.log()}
                  containerStyle="m-[5px]"
                />,
              ]}
            </View>
          </View>
          <View className="w-full justify-center items-center pt-3 pb-3">
            <CustomButton
              title="Let's start"
              handlePress={() => {
                console.log("Let's start");
              }}
              containerStyle="w-[90%] bg-[#05603A]"
              textStyle={"text-[#FCFCFC]"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BudgetCategories;
