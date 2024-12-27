import { getAuth } from "@firebase/auth";

const auth = getAuth();
export const userId = auth.currentUser?.uid;