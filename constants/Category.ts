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
