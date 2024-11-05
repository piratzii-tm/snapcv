import { logout } from "../../../backend";

export const WelcomeScreen = () => (
  <div className={"flex content-center items-center justify-center"}>
    <p>Here we shall have a welcome and display all resumes</p>
    <button onClick={logout}>Logout</button>
  </div>
);
