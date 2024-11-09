import { get, ref } from "firebase/database";
import { database } from "../../config";
import { collections } from "../constants";
import { getAuth } from "firebase/auth";

export const getUserCvs = async () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  return await get(
    ref(database, collections.users + userId + "/" + collections.resumes),
  );
};
