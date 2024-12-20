import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { database } from "../../configs/firebaseConfig";

export const createCategories = async (
  userId: string,
  categoryName: string,
  categoryEmoji: string,
  categoryType: string,
  categoryColor: string,
  allocatedMoney: number,
  usedMoney: number,
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
      message: `Category "${categoryName}" added successfully.`,
    };
  } catch (error) {
    console.error(
      `Error adding category "${categoryName}":`,
      error instanceof Error ? error.message : "Unknown error"
    );
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};

export const getPredefinedCategories = async () => {
  try {
    const categoryCollection = collection(database, "categories");
    const queryCategory = query(
      categoryCollection,
      where("isPredefined", "==", true)
    );
    const querySnapshot = await getDocs(queryCategory);

    const data = querySnapshot.docs.map((doc) => doc.data());

    return data;
  } catch (error) {
    console.log("Error:", error);
    return new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};
