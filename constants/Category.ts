export type CategoryTypes = {
  name: string;
  emoji: string;
  color: string;
  categorySection: "Needs" | "Wants" | "Savings"; // "Needs", "Wants", or "Savings"
};

export const Categories: CategoryTypes[] = [
  // Needs (50%)
  { name: "Housing", emoji: "🏠", color: "#D4A373", categorySection: "Needs" },
  {
    name: "Transportation",
    emoji: "🚗",
    color: "#1E3A8A",
    categorySection: "Needs",
  },
  { name: "Food", emoji: "🍔", color: "#FF914D", categorySection: "Needs" },
  {
    name: "Utilities",
    emoji: "🔌",
    color: "#4A90E2",
    categorySection: "Needs",
  },
  {
    name: "Medical/Healthcare",
    emoji: "🏥",
    color: "#4CAF50",
    categorySection: "Needs",
  },
  {
    name: "Insurance",
    emoji: "🛡️",
    color: "#4A7C59",
    categorySection: "Needs",
  },
  {
    name: "Household Items/Supplies",
    emoji: "🧴",
    color: "#64B5F6",
    categorySection: "Needs",
  },

  // Wants (30%)
  {
    name: "Entertainment",
    emoji: "🎮",
    color: "#FF6F61",
    categorySection: "Wants",
  },
  {
    name: "Dining Out",
    emoji: "🍽️",
    color: "#F7B801",
    categorySection: "Wants",
  },
  { name: "Travel", emoji: "✈️", color: "#1E88E5", categorySection: "Wants" },
  {
    name: "Subscriptions",
    emoji: "📺",
    color: "#7E57C2",
    categorySection: "Wants",
  },
  { name: "Hobbies", emoji: "🎨", color: "#FFD700", categorySection: "Wants" },
  {
    name: "Clothings",
    emoji: "👕",
    color: "#77C9D4",
    categorySection: "Wants",
  },

  // Savings/Debt (20%)
  {
    name: "Emergency Fund",
    emoji: "🛟",
    color: "#FF914D",
    categorySection: "Savings",
  },
  {
    name: "Retirement Savings",
    emoji: "🏦",
    color: "#00695C",
    categorySection: "Savings",
  },
  {
    name: "Debt Repayment",
    emoji: "💳",
    color: "#D32F2F",
    categorySection: "Savings",
  },
  {
    name: "Investments",
    emoji: "📈",
    color: "#1976D2",
    categorySection: "Savings",
  },
  {
    name: "Education Savings",
    emoji: "🎓",
    color: "#FFC107",
    categorySection: "Savings",
  },
];
