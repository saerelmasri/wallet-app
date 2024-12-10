import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addUserToDB } from "../queries/addDb";
import { router } from "expo-router";
import { Alert } from "react-native";
import { app } from "@/configs/firebaseConfig";

export async function registerUser(form: { email: string; password: string }) {
  try {
    const auth = getAuth(app);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      form.email,
      form.password
    );

    const user = userCredential.user;

    if (user) {
      const userInformation = {
        userId: user.uid,
        email: user.email as string,
      };

      await addUserToDB(userInformation);

      router.replace("/(tabs)/home");
    }
  } catch (error) {
    console.error("Error: ", error);

    Alert.alert(
      "We found a user with the same email. Is that you? Please sign in instead!"
    );
  }
}

export const loginUser = async (form: { email: string; password: string }) => {
    try {
      const auth = getAuth(app);
      const existingUser = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
  
      if (existingUser) {
        router.replace("/(tabs)/home");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Email or Password doesn't match.\n Please try again.");
    }
  };
  