import { ref, get, set, remove } from "firebase/database";
import { auth, database } from "../../config";
import { collections } from "../constants";

export const deleteResume = async (resumeId: string) => {
  const userId = auth.currentUser?.uid;

  if (!userId || !resumeId) {
    throw new Error("User ID or Resume ID is missing");
  }

  const userResumesRef = ref(
    database,
    `${collections.users}${userId}/${collections.resumes}`,
  );
  const resumeRef = ref(database, `${collections.resumes}/${resumeId}`);

  try {
    // Fetch the user's resumes
    const snapshot = await get(userResumesRef);

    if (snapshot.exists()) {
      const resumes = snapshot.val();

      // Filter out the resume ID to delete
      const updatedResumes = Object.values(resumes).filter(
        (id) => id !== resumeId,
      );

      // Update the user's resumes
      await set(userResumesRef, updatedResumes);

      // Remove the resume from the resumes object
      await remove(resumeRef);

      console.log(`Resume with ID ${resumeId} has been deleted successfully.`);
    } else {
      console.log("No resumes found for the user.");
    }
  } catch (error) {
    console.error("Error deleting resume:", error);
    throw error;
  }
};
