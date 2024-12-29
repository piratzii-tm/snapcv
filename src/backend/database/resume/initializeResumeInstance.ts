import { ref, set } from "firebase/database";
import { database } from "../../config";
import { collections } from "../constants";

export type InitializeResumeInstanceDto = {
  header: {
    name: string;
    title: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    github: string;
    photo: string;
  };
  font: string;
  color: string;
  body: {};
};
export const initializeResumeInstance = async (cvId: string) => {
  await set(ref(database, collections.resumes + cvId), {
    header: {
      name: "",
      title: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      github: "",
      photo: "",
    },
    body: ["IGNORE"],
  }).catch(console.log);
};
