import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Paths } from "./constants";
import {
  ResumeMakerScreen,
  WelcomeScreen,
  LoginScreen,
  RegisterScreen,
} from "./screens";
import { auth } from "../backend/config";
import { useEffect, useState } from "react";

export const Navigation = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLogged(user !== null);
    });
  }, []);

  return (
    <BrowserRouter>
      {!isLogged ? (
        <Routes>
          <Route path={Paths.main} element={<LoginScreen />} />
          <Route path={Paths.register} element={<RegisterScreen />} />
          <Route path="*" element={<Navigate to={Paths.main} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path={Paths.main} element={<WelcomeScreen />} />
          <Route path={Paths.resumeMaker} element={<ResumeMakerScreen />} />
          <Route path="*" element={<Navigate to={Paths.main} />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};
