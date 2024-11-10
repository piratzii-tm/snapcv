import { ref, set } from "firebase/database";
import { database } from "../../config";
import { collections } from "../constants";
import { initializeResumeInstance } from "../resume";
import { getAuth } from "firebase/auth";
import { getUserCvs } from "./getUserCvs";

export const addNewCv = async () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  return await getUserCvs().then((cvIds) => {
    const cvIdLength = cvIds.val() ? cvIds.val().length + 1 : 1;

    const newCvId = userId + "CV" + cvIdLength;
    const newCvIds = cvIds.val() ? [...cvIds.val(), newCvId] : [newCvId];

    //Ad user id to the resume instance
    set(
      ref(database, collections.users + userId + "/" + collections.resumes),
      newCvIds,
    ).catch(console.log);

    //Create a new resume instance
    initializeResumeInstance(newCvId).catch(console.log);
    return newCvId;
  });
};
