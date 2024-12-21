import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { database } from "../../configs/firebaseConfig";

type BudgetData = {
  budgetMetadata: {
    initialIncome: number;
    totalAllocated: number;
  };
  categories: {
    allocatedMoney: number;
    categoryColor: string;
    categoryEmoji: string;
    categoryName: string;
    categoryType: "Needs" | "Wants" | "Savings"; // Assuming these are the only possible values
    usedMoney: number;
  }[];
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp (empty if not updated yet)
  userId: string;
};

export const createCategories = async (
  userId: string,
  budgetMetadata: {
    totalAllocated: number;
    initialIncome: number;
  },
  categories: {
    categoryName: string;
    categoryEmoji: string;
    categoryType: string;
    categoryColor: string;
    allocatedMoney: number;
    usedMoney: number;
  }[]
) => {
  try {
    const categoryCollection = collection(database, "categories");

    const categoryData = {
      userId: userId,
      budgetMetadata: budgetMetadata,
      categories: categories,
      createdAt: new Date().toISOString(),
      updatedAt: "",
    };

    await addDoc(categoryCollection, categoryData);
    return {
      success: true,
      message: `Budget Created.`,
    };
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error");
    return new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};

export const getUserBudget = async (
  userId: string
): Promise<Error | BudgetData[]> => {
  try {
    if (!userId) {
      return new Error("Invalid user ID");
    }
    const categoriesCollection = collection(database, "categories");
    const queryCategory = query(
      categoriesCollection,
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(queryCategory);

    if (querySnapshot.empty) {
      return new Error("User doesn't have a budget");
    }

    const data: BudgetData[] = querySnapshot.docs.map((doc) => {
      const docData = doc.data();

      return {
        budgetMetadata: {
          initialIncome: docData.budgetMetadata?.initialIncome || 0,
          totalAllocated: docData.budgetMetadata?.totalAllocated || 0,
        },
        categories: docData.categories.map((category: any) => ({
          allocatedMoney: category.allocatedMoney,
          categoryColor: category.categoryColor,
          categoryEmoji: category.categoryEmoji,
          categoryName: category.categoryName,
          categoryType: category.categoryType,
          usedMoney: category.usedMoney,
        })),
        createdAt: docData.createdAt,
        updatedAt: docData.updatedAt || "",
        userId: docData.userId,
      };
    });

    return data;
  } catch (error) {
    console.log("Error:", error);
    return new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};
