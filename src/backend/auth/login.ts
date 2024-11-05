import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

type LoginDto = {
  email: string;
  password: string;
};
export const login = ({ email, password }: LoginDto) =>
  signInWithEmailAndPassword(auth, email, password).catch(console.log);
