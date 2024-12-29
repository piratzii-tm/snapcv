import { InitializeResumeInstanceDto } from "./initializeResumeInstance";
import { collections } from "../constants";
import { database } from "../../config";
import { ref, set } from "firebase/database";

export const setResume = async (
  cvId: string,
  resumeData: InitializeResumeInstanceDto,
) => {
  await set(ref(database, collections.resumes + cvId), resumeData).catch((e) =>
    console.log(e),
  );
};
