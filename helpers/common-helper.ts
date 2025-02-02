import { Alert } from "react-native";

export const currencySigns = {
  dolar: "$",
  euro: "€",
};

export const displayAmount = (balance: number): string => {
  if (balance == null) {
    // Checks for both null and undefined
    return "$0.00"; // Provide a default value if the balance is null or undefined
  }
  return balance.toLocaleString("en-US", { minimumFractionDigits: 2 });
};

export const getRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, "0")}`;
};

export const organizeExpenses = (expenses: any[], totalIncome: number) => {
  // group categories
  const groupedByCategory = expenses.reduce((acc: any, item: any) => {
    if (!acc[item.categoryType]) {
      acc[item.categoryType] = [];
    }
    acc[item.categoryType].push(item);
    return acc;
  }, {});

  //prepare final structure
  const result = Object.keys(groupedByCategory).map((categoryType) => {
    const breakdown = groupedByCategory[categoryType].map((item: any) => ({
      name: item.name,
      emoji: item.categoryEmoji,
      color: item.categoryColor,
      allocatedBudget: item.allocatedMoney,
    }));

    const totalAllocated = breakdown.reduce(
      (sum: number, item: any) => sum + item.allocatedBudget,
      0
    );

    const usedPercentage =
      ((totalAllocated / totalIncome) * 100).toFixed() + "%";

    return {
      usedPercentage,
      breakdown,
    };
  });

  return result;
};

const today = new Date();
export const currentMonth = today.toLocaleString("default", { month: "short" });

const daysInThisMonth = () => {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
};

const daysLeft = daysInThisMonth() - new Date().getDate();
export const daysLeftInMonth = daysLeft < 10 ? "0" + daysLeft : daysLeft;

export const showAlert = (title: string, message: string) => {
  Alert.alert(title, message);
};

export const formatDate = (date: Date) => {
  // Convert to "YYYY-MM-DD"
  return date.toLocaleDateString("en-CA"); // "en-CA" locale formats as YYYY-MM-DD
};
