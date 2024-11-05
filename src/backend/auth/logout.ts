import { signOut } from "firebase/auth";
import { auth } from "../config";

export const logout = () => signOut(auth).catch(console.log);
