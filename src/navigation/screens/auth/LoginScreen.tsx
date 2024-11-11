import React, { useState } from "react";
import { login } from "../../../backend";
import { getAiOpinion } from "../../../ai";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Paths } from "../../constants";

export const LoginScreen = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const backgroundImage = require("../../../resources/auth_bg_img.png");
  const navigate = useNavigate();

  const handleSubmit = () => email && password && login({ email, password });

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      className="flex justify-center items-center bg-cover h-screen p-10"
    >
      <div
        className="flex justify-center flex-col space-y-4 bg-white/80 h-[100%]
        backdrop-blur-sm rounded-md drop-shadow-md sm:max-md:w-[100%] md:max-[2600px]:w-1/2"
      >
        <div className="flex flex-col justify-center space-y-12 self-start p-[10%]">
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faUser} size="xl" color="#3B82F6" />
            <p className="text-2xl font-bold">Sign in</p>
          </div>
          <p className="self-start">
            Welcome back! Log in to continue building your CV.
          </p>
          <div className="flex-col space-y-4">
            <div className="space-y-1">
              <p className="text-neutral-500">Email</p>
              <input
                type="email"
                placeholder="Type..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded placeholder:text-sm drop-shadow-sm"
              />
            </div>
            <div className="space-y-1">
              <p className="text-neutral-500">Password</p>
              <input
                type="password"
                placeholder="Type..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border rounded placeholder:text-sm drop-shadow-sm"
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="p-2 bg-blue-500 text-white rounded drop-shadow-md"
          >
            Login
          </button>
          <div className="flex items-center">
            <p>Don't have an account?</p>
            <button
              onClick={() => navigate(Paths.register)}
              className="p-2 bg-transparent font-bold"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
