import { database } from "../../configs/firebaseConfig";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

type UserData = {
  email: string;
  name: string;
  notificationSettings: string;
};

export async function addUserToDB(user: {
  userId: string;
  email: string;
}): Promise<Error | undefined> {
  try {
    const userDoc = doc(database, "users", user.userId);
    await setDoc(userDoc, {
      email: user.email,
      name: "",
      notificationSettings: "off",
      createdAt: new Date(),
      updatedAt: "",
    });

    console.log("User created successfully with ID: ", user.userId);

    return undefined;
  } catch (error) {
    return new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}

export const updateNotificationSettings = async (
  userId: string,
  notificationSettings: string
) => {
  try {
    const userDocRef = doc(database, "users", userId);
    const user = await getDoc(userDocRef);
    if (!user.exists()) {
      return new Error("User doesn't exists in database");
    }

    await setDoc(
      userDocRef,
      { notificationSettings: notificationSettings },
      { merge: true }
    );
    return undefined;
  } catch (error) {
    console.log("Error updating notification settings:", error);
    return new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};

export const getUserFromDB = async (
  userId: string
): Promise<Error | UserData | undefined> => {
  try {
    const userCollection = doc(database, "users", userId);
    const userSnapshot = await getDoc(userCollection);

    if (userSnapshot.exists()) {
      const data = userSnapshot.data();
      return {
        email: data.email,
        name: data.name,
        notificationSettings: data.notificationSettings,
      };
    } else {
      return new Error("User does not exist");
    }
  } catch (error) {
    return new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};
