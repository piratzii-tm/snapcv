import { get, ref } from "firebase/database";
import { auth, database } from "../../config";
import { collections } from "../constants";

export const getUserCvs = async () => {
  const userId = auth.currentUser?.uid;

  return await get(
    ref(database, collections.users + userId + "/" + collections.resumes),
  ).then((snapshot) => {
    return snapshot.exists() ? snapshot.val() : null;
  });
};
