export type CategoryTypes = {
  id: string;
  name: string;
  emoji: string;
  color: string;
};

export const Categories: CategoryTypes[] = [
  { id: "housing-id", name: "Housing", emoji: "🏠", color: "#D4A373" },
  {
    id: "transportation-id",
    name: "Transportation",
    emoji: "🚗",
    color: "#1E3A8A",
  },
  { id: "food-id", name: "Food", emoji: "🍔", color: "#FF914D" },
  { id: "utilities-id", name: "Utilities", emoji: "🔌", color: "#4A90E2" },
  { id: "clothings-id", name: "Clothings", emoji: "👕", color: "#77C9D4" },
  {
    id: "medical-id",
    name: "Medical/Healthcare",
    emoji: "🏥",
    color: "#4CAF50",
  },
  { id: "insurance-id", name: "Insurance", emoji: "🛡️", color: "#4A7C59" },
  {
    id: "household-id",
    name: "Household Items/Supplies",
    emoji: "🧴",
    color: "#64B5F6",
  },
];

export const NeedCategory: CategoryTypes[] = [
  { id: "housing-id", name: "Housing", emoji: "🏠", color: "#D4A373" },
  { id: "utilities-id", name: "Utilities", emoji: "🔌", color: "#4A90E2" },
  { id: "groceries-id", name: "Groceries", emoji: "🛒", color: "#77DD77" },
  {
    id: "transportation-id",
    name: "Transportation",
    emoji: "🚗",
    color: "#FFA500",
  },
  { id: "healthcare-id", name: "Healthcare", emoji: "🩺", color: "#FF6F61" },
  { id: "insurance-id", name: "Insurance", emoji: "🛡️", color: "#9370DB" },
  {
    id: "debt-repayment-id",
    name: "Debt Repayment",
    emoji: "💳",
    color: "#FF4500",
  },
];

export const WantsCategory: CategoryTypes[] = [
  { id: "dining-out-id", name: "Dining Out", emoji: "🍽️", color: "#FFD700" },
  {
    id: "entertainment-id",
    name: "Entertainment",
    emoji: "🎮",
    color: "#6A5ACD",
  },
  { id: "shopping-id", name: "Shopping", emoji: "🛍️", color: "#FF69B4" },
  { id: "travel-id", name: "Travel", emoji: "✈️", color: "#1E90FF" },
  {
    id: "subscriptions-id",
    name: "Subscriptions",
    emoji: "📺",
    color: "#00CED1",
  },
  { id: "hobbies-id", name: "Hobbies", emoji: "🎨", color: "#8A2BE2" },
  { id: "gifts-id", name: "Gifts", emoji: "🎁", color: "#FF6347" },
];

export const SavingsDebtCategory: CategoryTypes[] = [
  {
    id: "emergency-fund-id",
    name: "Emergency Fund",
    emoji: "💰",
    color: "#228B22",
  },
  { id: "investments-id", name: "Investments", emoji: "📈", color: "#00BFFF" },
  { id: "retirement-id", name: "Retirement", emoji: "🏖️", color: "#FFDAB9" },
  { id: "edu-savings-id", name: "Edu. Savings", emoji: "🎓", color: "#7B68EE" },
  {
    id: "debt-repayment-id",
    name: "Debt. Repayment",
    emoji: "💳",
    color: "#FF4500",
  },
  {
    id: "big-purchases-id",
    name: "Big Purchases",
    emoji: "🚗",
    color: "#DAA520",
  },
  {
    id: "charity-donations-id",
    name: "Charity/Donations",
    emoji: "❤️",
    color: "#FF1493",
  },
];
