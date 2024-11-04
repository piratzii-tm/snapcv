import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Paths } from "./constants";
import {
  ResumeMakerScreen,
  WelcomeScreen,
  LoginScreen,
  RegisterScreen,
} from "./screens";

const appStackRouter = createBrowserRouter([
  {
    path: Paths.main,
    element: WelcomeScreen(),
  },
  {
    path: Paths.welcome,
    element: WelcomeScreen(),
  },
  {
    path: Paths.resumeMaker,
    element: ResumeMakerScreen(),
  },
]);

const authStackRouter = createBrowserRouter([
  {
    path: Paths.main,
    element: LoginScreen(),
  },
  {
    path: Paths.login,
    element: LoginScreen(),
  },
  {
    path: Paths.register,
    element: RegisterScreen(),
  },
]);

export const Navigation = () => {
  const isLogged = false;

  return (
    <RouterProvider router={isLogged ? appStackRouter : authStackRouter} />
  );
};
