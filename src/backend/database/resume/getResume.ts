import { collections } from "../constants";
import { database } from "../../config";
import { get, ref } from "firebase/database";

export const getResume = async (cvId: string) => {
  return await get(ref(database, collections.resumes + cvId))
    .then((data) => {
      return data.val();
    })
    .catch(console.log);
};
