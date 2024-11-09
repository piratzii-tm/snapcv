import { ref, set } from "firebase/database";
import { database } from "../../config";
import { collections } from "../constants";

export const initializeResumeInstance = async (cvId: string) => {
  await set(ref(database, collections.resumes + cvId), {
    header: {
      name: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      github: "",
      photo: "",
    },
    body: ["IGNORE"], // represents a list of ids of resumes the user creates
  }).catch(console.log);
};
