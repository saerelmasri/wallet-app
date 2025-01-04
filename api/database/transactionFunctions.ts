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

export const createTransaction = async (
  userId: string,
  categoryId: string,
  goalId: string,
  amount: number,
  purpose: string,
  repeat: boolean,
  date?: string
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
      createdAt: date && date !== undefined ? date : new Date().toISOString(),
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

    const transactions = [];
    for (const docs of querySnapshot.docs) {
      const data = docs.data();
      const enrichedTransaction = {
        id: docs.id,
        categoryId: data.categoryId,
        goalId: data.goalId,
        amount: data.amount,
        createdAt: data.createdAt,
        purpose: data.purpose,
        categoryName: "",
        categoryEmoji: "",
        categoryColor: "",
        goalName: "",
        goalEmoji: "",
        goalColor: "",
      };

      if (data.categoryId) {
        const categoryRef = doc(database, "categories", data.categoryId);
        const categoryDoc = await getDoc(categoryRef);

        if (categoryDoc.exists()) {
          const categoryData = categoryDoc.data();
          enrichedTransaction.categoryName = categoryData.categoryName;
          enrichedTransaction.categoryEmoji = categoryData.categoryEmoji;
          enrichedTransaction.categoryColor = categoryData.categoryColor;
        } else {
          console.log(`Category ID ${data.categoryId} not found`);
        }
      }

      if (data.goalId) {
        const goalRef = doc(database, "goals", data.goalId);
        const goalDoc = await getDoc(goalRef);

        if (goalDoc.exists()) {
          const goalData = goalDoc.data();
          enrichedTransaction.goalName = goalData.goalName;
          enrichedTransaction.goalEmoji = goalData.emoji;
          enrichedTransaction.goalColor = goalData.color;
        } else {
          console.log(`Goal ID ${data.goalId} not found`);
        }
      }

      transactions.push(enrichedTransaction);
    }

    transactions.sort((a, b) => {
      const createdAtA = a.createdAt.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
      const createdAtB = b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
      return createdAtB - createdAtA; // For descending order
    });

    return transactions;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error");
    return new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};
