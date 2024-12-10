import { database } from "@/configs/firebaseConfig";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

export async function addUserToDB(user: {
  userId: string;
  email: string;
}): Promise<Error | undefined> {
  try {
    const userDoc = doc(database, "users", user.userId);
    await setDoc(userDoc, {
        email: user.email,
        createdAt: new Date(),
      });
  
      console.log("User created successfully with ID: ", user.userId);

    return undefined;
  } catch (error) {
    return new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}
