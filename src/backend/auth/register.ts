import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";
import { initializeUserInstance } from "../database";

type RegisterDto = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
export const register = ({
  email,
  password,
  firstName,
  lastName,
}: RegisterDto) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((credentials) =>
      initializeUserInstance({ credentials, firstName, lastName }).catch(
        console.log,
      ),
    )
    .catch(console.log);
