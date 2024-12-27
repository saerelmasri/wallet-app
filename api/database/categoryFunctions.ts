import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { database } from "../../configs/firebaseConfig";

export type BudgetData = {
  categoryId: string;
  userId: string;
  allocatedMoney: number;
  categoryColor: string;
  categoryEmoji: string;
  categoryName: string;
  categoryType: "Needs" | "Wants" | "Savings"; // Assuming these are the only possible values
  usedMoney: number;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp (empty if not updated yet)
};

export const createCategories = async (
  userId: string,
  categoryName: string,
  categoryEmoji: string,
  categoryType: string,
  categoryColor: string,
  allocatedMoney: number,
  usedMoney: number
) => {
  try {
    const categoryCollection = collection(database, "categories");

    const categoryData = {
      userId: userId,
      categoryName: categoryName,
      categoryEmoji: categoryEmoji,
      categoryType: categoryType,
      categoryColor: categoryColor,
      allocatedMoney: allocatedMoney,
      usedMoney: usedMoney,
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

export const getUserCategories = async (
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
        categoryId: doc.id,
        userId: docData.userId,
        categoryName: docData.categoryName,
        categoryType: docData.categoryType,
        categoryColor: docData.categoryColor,
        categoryEmoji: docData.categoryEmoji,
        usedMoney: docData.usedMoney,
        allocatedMoney: docData.allocatedMoney,
        createdAt: docData.createdAt,
        updatedAt: docData.updatedAt || "",
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
