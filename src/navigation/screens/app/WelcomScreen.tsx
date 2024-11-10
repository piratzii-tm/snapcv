import React, { useEffect } from "react";

import { addNewCv, getUserCvs, logout } from "../../../backend";
import { LinearGradient } from "react-text-gradients";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants";

export const WelcomeScreen = () => {
  const [resumes, setResumes] = React.useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    findResumes();
  }, []);

  const findResumes = async () => {
    await getUserCvs().then((r) => setResumes(r.val()));
  };

  const handleAddNewCV = () => {
    //TODO: Add loading if needed
    addNewCv()
      .then((cvId) => {
        findResumes();
        navigate(Paths.resumeMaker, { state: { cvId } });
      })
      .catch(console.log);
  };

  const handleOpenCV = (cvId: string) => {
    navigate(Paths.resumeMaker, { state: { cvId } });
  };

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
        <button className={"border-2 p-2"} onClick={handleAddNewCV}>
          Add new CV
        </button>
        {resumes &&
          resumes.map((cvId, index) => (
            <button
              key={cvId}
              className={"flex flex-row h-20 w-20 bg-blue-700"}
              onClick={() => handleOpenCV(cvId)}
            >
              <h1>CV: {index + 1}</h1>
            </button>
          ))}
      </div>
    </div>
  );
};
