import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
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
  lastTransaction?: string;
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

export const updatedUsedMoneyOnCategory = async (
  userId: string,
  categoryId: string,
  usedMoney: number
) => {
  try {
    const userRef = doc(database, "users", userId);
    const user = await getDoc(userRef);

    if (!user.exists()) {
      return new Error("User doesn't exist in the database");
    }

    const categoryDocRef = doc(database, "categories", categoryId);
    const categoryDoc = await getDoc(categoryDocRef);

    if (!categoryDoc.exists()) {
      return new Error("Category doesn't exist in database");
    }
    const categoryData = categoryDoc.data();
    const currentSaved = categoryData?.usedMoney || 0;
    const updatedCategoryData = {
      usedMoney: currentSaved + usedMoney,
      updatedAt: new Date().toISOString(),
    };

    await setDoc(categoryDocRef, updatedCategoryData, { merge: true });
    return undefined;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error");
    return new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};

export const updateExistingCategory = async (
  userId: string,
  categoryId: string,
  categoryData: { categoryName: string; allocatedMoney: number }
) => {
  try {
    const userRef = doc(database, "users", userId);
    const user = await getDoc(userRef);

    if (!user.exists()) {
      return new Error("User doesn't exist in the database");
    }

    const categoryDocRef = doc(database, "categories", categoryId);
    const updatedCategoryData = {
      ...categoryData,
      updatedAt: new Date().toISOString(),
    };

    await setDoc(categoryDocRef, updatedCategoryData, { merge: true });
    return undefined;
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
    const userRef = doc(database, "users", userId);
    const user = await getDoc(userRef);

    if (!user.exists()) {
      return new Error("User doesn't exist in the database");
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

export const getCategoryInfoByCatId = async (
  userId: string,
  categoryId: string
): Promise<Error | BudgetData> => {
  try {
    const userRef = doc(database, "users", userId);
    const user = await getDoc(userRef);

    if (!user.exists()) {
      return new Error("User doesn't exist in the database");
    }

    const categoryRef = doc(database, "categories", categoryId);
    const categoryDoc = await getDoc(categoryRef);
    const data = categoryDoc.data() as BudgetData;

    return {
      categoryId: categoryDoc.id,
      userId: categoryDoc.userId,
      categoryName: categoryDoc.categoryName,
      categoryType: categoryDoc.categoryType,
      categoryColor: categoryDoc.categoryColor,
      categoryEmoji: categoryDoc.categoryEmoji,
      usedMoney: categoryDoc.usedMoney,
      allocatedMoney: categoryDoc.allocatedMoney,
      createdAt: categoryDoc.createdAt,
      updatedAt: categoryDoc.updatedAt || "",
    };
  } catch (error) {
    console.log("Error:", error);
    return new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};
