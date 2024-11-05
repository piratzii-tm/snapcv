import { UserCredential } from "firebase/auth";
import { ref, set } from "firebase/database";
import { database } from "../../config";
import { collections } from "../constants";

type InitializeUserInstanceDto = {
  credentials: UserCredential;
  firstName: string;
  lastName: string;
};
export const initializeUserInstance = async ({
  credentials,
  firstName,
  lastName,
}: InitializeUserInstanceDto) => {
  await set(ref(database, collections.users + credentials.user.uid), {
    id: credentials.user.uid,
    email: credentials.user.email,
    firstName,
    lastName,
    resumes: ["IGNORE"], // represents a list of ids of resumes the user creates
  }).catch(console.log);
};
