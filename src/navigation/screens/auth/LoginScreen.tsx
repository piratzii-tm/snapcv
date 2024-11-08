import React, { useState } from "react";
import { login } from "../../../backend";
import { getAiOpinion } from "../../../ai";

export const LoginScreen = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const handleSubmit = () => email && password && login({ email, password });

  return (
    <div className="flex content-center items-center justify-center flex-col space-y-4">
      <p>Here we shall have a login</p>
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
      <button
        onClick={handleSubmit}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Login
      </button>
      <button
        className={
          "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        }
        //TODO: This is a test button, remove it
        onClick={() =>
          getAiOpinion(
            "Ma cheam Mihi si sunt programator si im iplace sa scriu cod in React.",
          )
        }
      >
        AI Test
      </button>
    </div>
  );
};
