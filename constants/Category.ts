export type CategoryTypes = {
  id: number;
  name: string;
  emoji: string;
  color: string;
};

export const Categories: CategoryTypes[] = [
  { id: 1, name: "Housing", emoji: "🏠", color: "#D4A373" },
  { id: 2, name: "Transportation", emoji: "🚗", color: "#1E3A8A" },
  { id: 3, name: "Food", emoji: "🍔", color: "#FF914D" },
  { id: 4, name: "Utilities", emoji: "🔌", color: "#4A90E2" },
  { id: 5, name: "Clothings", emoji: "👕", color: "#77C9D4" },
  { id: 6, name: "Medical/Healthcare", emoji: "🏥", color: "#4CAF50" },
  { id: 7, name: "Insurance", emoji: "🛡️", color: "#4A7C59" },
  { id: 8, name: "Household Items/Supplies", emoji: "🧴", color: "#64B5F6" },
];

export const NeedCategory: CategoryTypes[] = [
  { id: 1, name: "Housing", emoji: "🏠", color: "#D4A373" },
  { id: 2, name: "Utilities", emoji: "🔌", color: "#4A90E2" },
  { id: 3, name: "Groceries", emoji: "🛒", color: "#77DD77" },
  { id: 4, name: "Transportation", emoji: "🚗", color: "#FFA500" },
  { id: 5, name: "Healthcare", emoji: "🩺", color: "#FF6F61" },
  { id: 6, name: "Insurance", emoji: "🛡️", color: "#9370DB" },
  { id: 7, name: "Debt Repayment", emoji: "💳", color: "#FF4500" },
];
export const WantsCategory: CategoryTypes[] = [
  { id: 1, name: "Dining Out", emoji: "🍽️", color: "#FFD700" },
  { id: 2, name: "Entertainment", emoji: "🎮", color: "#6A5ACD" },
  { id: 3, name: "Shopping", emoji: "🛍️", color: "#FF69B4" },
  { id: 4, name: "Travel", emoji: "✈️", color: "#1E90FF" },
  { id: 5, name: "Subscriptions", emoji: "📺", color: "#00CED1" },
  { id: 6, name: "Hobbies", emoji: "🎨", color: "#8A2BE2" },
  { id: 7, name: "Gifts", emoji: "🎁", color: "#FF6347" },
];
export const SavingsDebtCategory: CategoryTypes[] = [
  { id: 1, name: "Emergency Fund", emoji: "💰", color: "#228B22" },
  { id: 2, name: "Investments", emoji: "📈", color: "#00BFFF" },
  { id: 3, name: "Retirement", emoji: "🏖️", color: "#FFDAB9" },
  { id: 4, name: "Education Savings", emoji: "🎓", color: "#7B68EE" },
  { id: 5, name: "Debt Repayment", emoji: "💳", color: "#FF4500" },
  { id: 6, name: "Big Purchases", emoji: "🚗", color: "#DAA520" },
  { id: 7, name: "Charity/Donations", emoji: "❤️", color: "#FF1493" },
];
