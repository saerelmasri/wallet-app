export const MockBudgetTransaction = [
  {
    transactionTitle: "Tennis Session",
    transactionAmount: "15.00",
    transactionCategory: "Fitness & Sports",
    transactionDate: "Nov 02, 2024",
    transactionType: "Expense",
    swipeEnabled: false,
  },
  {
    transactionTitle: "Arguile",
    transactionAmount: "7.00",
    transactionCategory: "Bar & Cafe",
    transactionDate: "Nov 01, 2024",
    transactionType: "Expense",
    swipeEnabled: false,
  },
  {
    transactionTitle: "Bershka Shopping",
    transactionAmount: "150.00",
    transactionCategory: "Shopping",
    transactionDate: "Oct 22, 2024",
    transactionType: "Expense",
    swipeEnabled: false,
  },
  {
    transactionTitle: "Gas",
    transactionAmount: "10.00",
    transactionCategory: "Vehicule & Transportation",
    transactionDate: "Oct 15, 2024",
    transactionType: "Expense",
    swipeEnabled: false,
  },
];

export const MockGoals = [
  {
    goalTitle: "Car Repair",
    goalAmount: 2500.0,
    goalEmoji: "🚗",
    goalProgress: 0.2,
    amountSaved: 2500.0 * 0.2, // 500.0
  },
  {
    goalTitle: "House Repair",
    goalAmount: 5500.0,
    goalEmoji: "🏠",
    goalProgress: 0.9,
    amountSaved: 5500.0 * 0.9, // 4950.0
  },
  {
    goalTitle: "Madrid Trip 2025",
    goalAmount: 1500.0,
    goalEmoji: "✈️",
    goalProgress: 0.5,
    amountSaved: 1500.0 * 0.5, // 750.0
  },
  {
    goalTitle: "Master in Spain",
    goalAmount: 3500.0,
    goalEmoji: "🏫",
    goalProgress: 0.2,
    amountSaved: 3500.0 * 0.2,
  },
  {
    goalTitle: "Student Visa",
    goalAmount: 9500.0,
    goalEmoji: "🪪",
    goalProgress: 0.1,
    amountSaved: 9500.0 * 0.1,
  },
];

export const TestData = [
  {
    usedPercentage: "50%",
    title: "50 needs category",
    breakdown: [
      {
        id: "housing-id",
        name: "Housing",
        emoji: "🏠",
        color: "#D4A373",
        allocatedBudget: 960,
      },
      {
        id: "utilities-id",
        name: "Utilities",
        emoji: "🔌",
        color: "#4A90E2",
        allocatedBudget: 140,
      },
      {
        id: "groceries-id",
        name: "Groceries",
        emoji: "🛒",
        color: "#77DD77",
        allocatedBudget: 270,
      },
    ],
  },
  {
    usedPercentage: "20%",
    title: "30 wants category",
    breakdown: [
      {
        id: "shopping-id",
        name: "Shopping",
        emoji: "🛍️",
        color: "#FF69B4",
        allocatedBudget: 158,
      },
      {
        id: "travel-id",
        name: "Travel",
        emoji: "✈️",
        color: "#1E90FF",
        allocatedBudget: 300,
      },
    ],
  },
  {
    usedPercentage: "5%",
    title: "20 saving category",
    breakdown: [
      {
        id: "investments-id",
        name: "Investments",
        emoji: "📈",
        color: "#00BFFF",
        allocatedBudget: 250,
      },
    ],
  },
];