import { addDoc, collection } from "firebase/firestore";
import { database } from "../../configs/firebaseConfig";


export const createTransaction = async (
    userId: string,
    categoryId: string,
    goalId: string,
    amount: number,
    purpose: string,
    repeat: boolean,
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