import { View, Text, SafeAreaView, ScrollView, StatusBar } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import GoalProgressCircle from "../../components/HomeComponents/GoalProgressCircle";
import UpcomingPayments from "../../components/HomeComponents/nextPayments";
import { useFocusEffect, useRouter } from "expo-router";
import BudgetCard from "../../components/HomeComponents/BudgetCard";
import { Categories } from "../../constants/Category";
import { displayAmount } from "../../helpers/common-helper";
import { getAuth } from "firebase/auth";
import { getUserBudget } from "../../api/database/categoryFunctions";

const Home = () => {
  // Clean up the stack by replacing it with only the home screen
  const router = useRouter();
  useFocusEffect(
    useCallback(() => {
      router.replace("/(tabs)/home");
    }, [router])
  );

  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const [monthly, setMonthly] = useState<number | null>(null);
  const [unallocated, setUnallocated] = useState<number | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUserBudget(userId as string);
      if (result instanceof Error) {
        console.log("Error fetching user:", result.message);
        return;
      }

      if (result.length === 0) {
        console.log("No budget found for user.");
        return;
      }

      const userBudget = result[0];

      const { initialIncome, totalAllocated } = userBudget.budgetMetadata; // Extract relevant values

      const unallocated = initialIncome - totalAllocated;

      setMonthly(totalAllocated);
      setUnallocated(unallocated);
    };

    fetchUser();
  }, [userId]);

  const groupedCategories = Categories.reduce((acc, category) => {
    if (!acc[category.categorySection]) {
      acc[category.categorySection] = [];
    }
    acc[category.categorySection].push(category);
    return acc;
  }, {} as Record<string, typeof Categories>);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView className="flex-1 h-full">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }}
        >
          <View className="w-full flex-row p-3 items-center">
            {/* Remaining budget of the month*/}
            <View className="bg-white p-3 w-full">
              {monthly && unallocated ? (
                <>
                  <View className=" flex-row justify-between">
                    <View>
                      <Text className="font-pregular text-xs text-black text-left">
                        My budget for Nov
                      </Text>
                      <Text className="font-psemibold text-xl text-black tracking-tighter text-left">
                        $ {displayAmount(Number(monthly))}
                        <Text className="font-pmedium text-xs text-black text-left">
                          {" "}
                          left
                        </Text>
                      </Text>
                      <Text className="font-pregular text-xs text-black tracking-tighter text-left">
                        09 days left in Nov
                      </Text>
                    </View>
                    <View>
                      <Text className="font-pregular text-xs text-black text-right">
                        Unallocated Money
                      </Text>
                      <Text className="font-psemibold text-xl text-black tracking-tighter text-right">
                        $ {displayAmount(unallocated)}
                      </Text>
                    </View>
                  </View>
                </>
              ) : (
                <Text className="font-psemibold text-sm text-black tracking-tighter text-left">
                  Your monthly budget has not been set up yet. Please build your
                  budget
                </Text>
              )}
            </View>
          </View>

          <View className="w-full flex-row justify-around p-3">
            <GoalProgressCircle />
            <UpcomingPayments />
          </View>

          {/* Transaction History Widgets */}
          <View className="p-3 w-full">
            {Object.entries(groupedCategories).map(([section, categories]) => (
              <View key={section}>
                {/* Section Title */}
                <Text className="text-lg font-pregular p-3">{section}</Text>

                {/* Categories in this section */}
                {categories.map((item) => (
                  <BudgetCard
                    // key={item.id}
                    budgetCategory={item.name}
                    budgetColor={item.color}
                    budgetEmoji={item.emoji}
                    budgetInitialAmount={2300}
                    budgetUsedAmount={1230}
                  />
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;
