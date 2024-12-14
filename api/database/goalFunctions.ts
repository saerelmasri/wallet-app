import { database } from "@/configs/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const getSavingAmount = async (
  userId: string
): Promise<number | Error> => {
  try {
    let totalSavings = 0;

    const goalCollection = collection(database, "goals");
    const queryGoals = query(goalCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(queryGoals);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.saved && typeof data.saved === "number") {
        totalSavings += data.saved;
      }
    });

    return totalSavings;
  } catch (error) {
    return new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};

export const getAllUserGoals = async (userId: string) => {
  try {
    const goalCollection = collection(database, "goals");
    const queryGoals = query(goalCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(queryGoals);

    const userGoals = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return { ...data };
    });

    return userGoals;
  } catch (error) {
    return new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};

export const createNewGoal = async (
  userId: string,
  goalName: string,
  targetAmount: number,
  emoji: string
): Promise<Error | undefined> => {
  try {
    const userCollection = doc(database, "users", userId);
    const user = await getDoc(userCollection);
    if (!user.exists()) {
      return new Error("User doesn't exists in database");
    }

    const goalCollection = collection(database, "goals");
    await addDoc(goalCollection, {
      goalName: goalName,
      saved: 0,
      target: targetAmount,
      emoji: emoji,
      userId: userId,
    });
  } catch (error) {
    return new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};
