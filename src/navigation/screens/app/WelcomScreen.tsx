import React from "react";

import { logout } from "../../../backend";
import { LinearGradient } from "react-text-gradients";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants";

export const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div
      className={
        "flex flex-col h-screen bg-gray-400 content-center items-center justify-center "
      }
    >
      <button
        onClick={logout}
        className={
          "border-2 p-2 border-black rotate-45 rounded-lg absolute top-0 right-0 m-10"
        }
      >
        Logout
      </button>
      <div className={"flex flex-row items-end gap-2"}>
        <h1 className={"text-4xl"}>Welcome to</h1>
        <LinearGradient
          gradient={["to left", "#941b82 ,#790909, #ff6000"]}
          className={"text-7xl"}
        >
          SnapCV
        </LinearGradient>
      </div>
      <div className={"flex w-screen p-14 justify-start gap-3"}>
        <button
          className={"border-2 p-2"}
          onClick={() => navigate(Paths.resumeMaker)}
        >
          Add new CV
        </button>
      </div>
    </div>
  );
};
