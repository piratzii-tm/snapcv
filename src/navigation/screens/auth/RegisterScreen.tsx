import React, { useState } from "react";
import { register } from "../../../backend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const RegisterScreen = () => {
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [firstName, setFirstName] = useState<string | undefined>("");
  const [lastName, setLastName] = useState<string | undefined>("");

  const handleSubmit = () =>
    email &&
    password &&
    firstName &&
    lastName &&
    register({ email, password, firstName, lastName });

  const backgroundImage = require("../../../resources/auth_background_image.jpg");

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      className="bg-cover bg-center h-screen p-10"
    >
      <div
        className="flex content-center items-center justify-center flex-col
      space-y-4 bg-white/80 h-[100%] backdrop-blur-sm rounded-md drop-shadow-md
      sm:max-md:w-[100%] md:max-[2600px]:w-1/2"
      >
        <div className="flex items-center justify-start h-[20%] flex-col">
          <div className="flex items-center space-x-3 self-start">
            <FontAwesomeIcon icon={faUser} size="xl" />
            <p className="text-2xl font-bold">Sign up</p>
          </div>
          <p className="self-start">
            You're one step away from making your CV truly stand out!
          </p>
        </div>
        <div className="flex space-x-[15%] h-[60%] items-center">
          <div className="flex-col space-y-4">
            <div className="space-y-1">
              <p className="self-start text-neutral-500">First Name</p>
              <input
                type="text"
                placeholder="Type..."
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="p-2 border rounded placeholder:text-sm drop-shadow-sm"
              />
            </div>
            <div className="space-y-1">
              <p className="self-start text-neutral-500">Last Name</p>
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
              <p className="self-start text-neutral-500">Email</p>
              <input
                type="email"
                placeholder="Type..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded placeholder:text-sm drop-shadow-sm"
              />
            </div>
            <div className="space-y-1">
              <p className="self-start text-neutral-500">Password</p>
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
        <div className="h-[20%]">
          <button
            onClick={handleSubmit}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
