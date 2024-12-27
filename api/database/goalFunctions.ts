import { database } from "../../configs/firebaseConfig";
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

export type GoalType = {
  id: string;
  userId: string;
  goalName: string;
  target: number;
  saved: number;
  emoji: string;
  color: string;
  createdAt: string;
  updatedAt: string
}

export const createNewGoal = async (goalDesc: {
  goalName: string;
  target: number;
  emoji: string;
  saved: number;
  userId: string | undefined;
  color: string
}): Promise<Error | undefined> => {
  try {
    const userCollection = doc(database, "users", goalDesc.userId as string);
    const user = await getDoc(userCollection);
    if (!user.exists()) {
      return new Error("User doesn't exists in database");
    }

    const goalCollection = collection(database, "goals");
    const goalData = {
      goalName: goalDesc.goalName,
      saved: 0,
      target: goalDesc.target,
      emoji: goalDesc.emoji,
      userId: goalDesc.userId,
      createdAt: new Date().toISOString(),
      updatedAt: "",
      color: goalDesc.color
    };

    console.log("Goal Data:", goalData);

    await addDoc(goalCollection, goalData);
  } catch (error) {
    console.log("Error creating goal:", error);
    return new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};

export const updateGoalDesc = async (
  goalId: string,
  goalData: {
    goalName: string;
    target: number;
    emoji: string;
    saved: number;
    userId: string | undefined;
  }
): Promise<Error | undefined> => {
  try {
    const userCollection = doc(database, "users", goalData.userId as string);
    const user = await getDoc(userCollection);
    if (!user.exists()) {
      return new Error("User doesn't exists in database");
    }
    const goalDocRef = doc(database, "goals", goalId);
    const updatedGoalData = { ...goalData, updatedAt: new Date().toISOString() };
    await setDoc(goalDocRef, updatedGoalData, { merge: true });
    return undefined;
  } catch (error) {
    console.log("Error creating goal:", error);
    return new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};

export const updateSavedAmount = async (
  goalId: string,
  userId: string,
  newSaved: number
): Promise<Error | undefined> => {
  try {
    const userCollection = doc(database, "users", userId as string);
    const user = await getDoc(userCollection);
    if (!user.exists()) {
      return new Error("User doesn't exists in database");
    }
    const goalDocRef = doc(database, "goals", goalId);
    const goalDoc = await getDoc(goalDocRef);

    if(!goalDoc.exists()){
      return new Error("Goal doesn't exist in database");
    }

    const goalData = goalDoc.data();
    const currentSaved = goalData?.saved || 0;
    const updatedGoalData = { saved: currentSaved + newSaved, updatedAt: new Date().toISOString() };
    
    await setDoc(goalDocRef, updatedGoalData, { merge: true });
    return undefined;
  } catch (error) {
    console.log("Error creating goal:", error);
    return new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};

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
      return { ...data, id: doc.id };
    });

    return userGoals;
  } catch (error) {
    return new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};
