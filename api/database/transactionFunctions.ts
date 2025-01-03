import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { database } from "../../configs/firebaseConfig";
import { BudgetData } from "./categoryFunctions";
import { GoalType } from "./goalFunctions";

export const createTransaction = async (
  userId: string,
  categoryId: string,
  goalId: string,
  amount: number,
  purpose: string,
  repeat: boolean
) => {
  try {
    const transactionCollection = collection(database, "transactions");

    const transactionData = {
      userId: userId,
      categoryId: categoryId,
      goalId: goalId,
      amount: amount,
      purpose: purpose,
      repeat: repeat,
      createdAt: new Date().toISOString(),
      updatedAt: "",
    };

    await addDoc(transactionCollection, transactionData);
    return {
      success: true,
      message: `Transaction Created.`,
    };
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error");
    return new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};

export const getLastCategoryTransaction = async (
  userId: string,
  categoryId: string
) => {
  try {
    const userRef = doc(database, "users", userId);
    const user = await getDoc(userRef);

    if (!user.exists()) {
      return new Error("User doesn't exist in the database");
    }

    const transactionCollection = collection(database, "transactions");
    const queryTransaction = query(
      transactionCollection,
      where("userId", "==", userId),
      where("categoryId", "==", categoryId),
      limit(1)
    );

    const querySnapshot = await getDocs(queryTransaction);

    if (querySnapshot.empty) {
      return null; // No transactions found
    }

    const transactions = querySnapshot.docs.map((doc) => doc.data());

    // Manually find the latest transaction
    const latestTransaction =
      transactions.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0] || null;

    return latestTransaction?.createdAt || null;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error");
    return new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};

export const getAllUsersTransaction = async (userId: string) => {
  try {
    // Check if the user exists
    const userRef = doc(database, "users", userId);
    const user = await getDoc(userRef);

    if (!user.exists()) {
      return new Error("User doesn't exist in the database");
    }

    // Query the transactions collection
    const transactionCollection = collection(database, "transactions");
    const queryTransaction = query(
      transactionCollection,
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(queryTransaction);

    if (querySnapshot.empty) {
      return []; // Return empty array if no transactions
    }

    const userTransaction = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        categoryId: data.categoryId,
        amount: data.amount,
        createdAt: data.createdAt,
        purpose: data.purpose,
        goalId: data.goalId,
      };
    });

    return userTransaction;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error");
    return new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};
