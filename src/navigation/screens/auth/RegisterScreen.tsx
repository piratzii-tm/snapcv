import React, { useState } from "react";
import { register } from "../../../backend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants";

export const RegisterScreen = () => {
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [firstName, setFirstName] = useState<string | undefined>("");
  const [lastName, setLastName] = useState<string | undefined>("");

  const backgroundImage = require("../../../resources/auth_bg_img.png");
  const navigate = useNavigate();

  const handleSubmit = () =>
    email &&
    password &&
    firstName &&
    lastName &&
    register({ email, password, firstName, lastName });

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
            <p className="text-2xl font-bold">Sign up</p>
          </div>
          <p className="self-start">
            You're one step away from making your CV truly stand out!
          </p>
          <div className="flex space-x-[15%] items-center">
            <div className="flex-col space-y-4">
              <div className="space-y-1">
                <p className="text-neutral-500">First Name</p>
                <input
                  type="text"
                  placeholder="Type..."
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="p-2 border rounded placeholder:text-sm drop-shadow-sm"
                />
              </div>
              <div className="space-y-1">
                <p className="text-neutral-500">Last Name</p>
                <input
                  type="text"
                  placeholder="Type..."
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="p-2 border rounded placeholder:text-sm drop-shadow-sm"
                />
              </div>
            </div>
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
          </div>
          <button
            onClick={handleSubmit}
            className="p-2 bg-blue-500 text-white rounded drop-shadow-md"
          >
            Register
          </button>
          <div className="flex items-center">
            <p>Already have an account?</p>
            <button
              onClick={() => navigate(Paths.login)}
              className="p-2 bg-transparent font-bold"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
