import React, { useState } from "react";
import { register } from "../../../backend";

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
      <div className="flex content-center items-center justify-center flex-col space-y-4 w-1/2 bg-white/80 h-[100%] backdrop-blur-sm">
        <p>Here we shall have a register</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={handleSubmit}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Register
        </button>
      </div>
    </div>
  );
};
