import { v4 as uuidv4 } from "uuid";

export type CategoryTypes = {
  id: string;
  name: string;
  emoji: string;
  color: string;
};

export const Categories: CategoryTypes[] = [
  { id: uuidv4(), name: "Housing", emoji: "🏠", color: "#D4A373" },
  { id: uuidv4(), name: "Transportation", emoji: "🚗", color: "#1E3A8A" },
  { id: uuidv4(), name: "Food", emoji: "🍔", color: "#FF914D" },
  { id: uuidv4(), name: "Utilities", emoji: "🔌", color: "#4A90E2" },
  { id: uuidv4(), name: "Clothings", emoji: "👕", color: "#77C9D4" },
  { id: uuidv4(), name: "Medical/Healthcare", emoji: "🏥", color: "#4CAF50" },
  { id: uuidv4(), name: "Insurance", emoji: "🛡️", color: "#4A7C59" },
  {
    id: uuidv4(),
    name: "Household Items/Supplies",
    emoji: "🧴",
    color: "#64B5F6",
  },
];

export const NeedCategory: CategoryTypes[] = [
  { id: uuidv4(), name: "Housing", emoji: "🏠", color: "#D4A373" },
  { id: uuidv4(), name: "Utilities", emoji: "🔌", color: "#4A90E2" },
  { id: uuidv4(), name: "Groceries", emoji: "🛒", color: "#77DD77" },
  { id: uuidv4(), name: "Transportation", emoji: "🚗", color: "#FFA500" },
  { id: uuidv4(), name: "Healthcare", emoji: "🩺", color: "#FF6F61" },
  { id: uuidv4(), name: "Insurance", emoji: "🛡️", color: "#9370DB" },
  { id: uuidv4(), name: "Debt Repayment", emoji: "💳", color: "#FF4500" },
];
export const WantsCategory: CategoryTypes[] = [
  { id: uuidv4(), name: "Dining Out", emoji: "🍽️", color: "#FFD700" },
  { id: uuidv4(), name: "Entertainment", emoji: "🎮", color: "#6A5ACD" },
  { id: uuidv4(), name: "Shopping", emoji: "🛍️", color: "#FF69B4" },
  { id: uuidv4(), name: "Travel", emoji: "✈️", color: "#1E90FF" },
  { id: uuidv4(), name: "Subscriptions", emoji: "📺", color: "#00CED1" },
  { id: uuidv4(), name: "Hobbies", emoji: "🎨", color: "#8A2BE2" },
  { id: uuidv4(), name: "Gifts", emoji: "🎁", color: "#FF6347" },
];
export const SavingsDebtCategory: CategoryTypes[] = [
  { id: uuidv4(), name: "Emergency Fund", emoji: "💰", color: "#228B22" },
  { id: uuidv4(), name: "Investments", emoji: "📈", color: "#00BFFF" },
  { id: uuidv4(), name: "Retirement", emoji: "🏖️", color: "#FFDAB9" },
  { id: uuidv4(), name: "Edu. Savings", emoji: "🎓", color: "#7B68EE" },
  { id: uuidv4(), name: "Debt. Repayment", emoji: "💳", color: "#FF4500" },
  { id: uuidv4(), name: "Big Purchases", emoji: "🚗", color: "#DAA520" },
  { id: uuidv4(), name: "Charity/Donations", emoji: "❤️", color: "#FF1493" },
];
