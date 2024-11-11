import { ref, set } from "firebase/database";
import { auth, database } from "../../config";
import { collections } from "../constants";
import { initializeResumeInstance } from "../resume";
import { getUserCvs } from "./getUserCvs";

export const addNewCv = async () => {
  const userId = auth.currentUser?.uid;

  return await getUserCvs().then((cvIds) => {
    const nextCvIndex = cvIds ? cvIds.length + 1 : 1;

    const newCvId = userId + "CV" + nextCvIndex;
    const newCvIds = cvIds ? [...cvIds, newCvId] : [newCvId];

    // Create a new resume instance
    initializeResumeInstance(newCvId)
      .then(() => {
        //Ad user id to the resume instance
        set(
          ref(database, collections.users + userId + "/" + collections.resumes),
          newCvIds,
        ).catch(console.log);
      })
      .catch(console.log);

    return newCvId;
  });
};
