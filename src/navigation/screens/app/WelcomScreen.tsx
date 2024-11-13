import React, { useEffect } from "react";
import { addNewCv, getUserCvs, logout } from "../../../backend";
import { LinearGradient } from "react-text-gradients";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants";

export const WelcomeScreen = () => {
  const [resumes, setResumes] = React.useState([]);

  const buttonImage = require("../../../resources/cv_visualizer_img.png");
  const navigate = useNavigate();

  useEffect(() => {
    findResumes();
  }, []);

  const findResumes = async () => {
    await getUserCvs().then((r) => r !== null && setResumes(r));
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
    <div className="flex flex-col h-full content-center items-center justify-center">
      <button
        onClick={logout}
        className={
          "flex self-end justify-center items-center p-4 text-black hover:text-white hover:bg-gradient-to-l " +
          "from-[#0de7fa] via-[#079ba5] to-[#1203fa] font-semibold transition-colors " +
          "duration-100 ease-in-out hover:transition-all hover:duration-300" +
          "shadow-lg rotate-12 m-10 text-sm 2xl:text-lg h-10 w-20 2xl:h-14 2xl:w-36"
        }
        style={{
          border: "2px solid",
          borderImage: "linear-gradient(to left, #0de7fa, #079ba5, #1203fa) 1",
        }}
      >
        Logout
      </button>

      <div className="flex flex-row items-end gap-2 p-6 md:pb-20">
        <h1 className="text-lg md:text-xl lg:text-4xl 2xl:text-3xl">
          Welcome to
        </h1>
        <LinearGradient
          gradient={["to left", "#0de7fa ,#079ba5, #1203fa"]}
          className="text-4xl md:text-4xl lg:text-6xl 2xl:text-7xl drop-shadow-sm"
        >
          SnapCV
        </LinearGradient>
      </div>

      <div className="flex flex-col md:flex-row items-center w-screen justify-start gap-5 flex-wrap md:pl-16">
        <button
          className="flex justify-center items-center text-black hover:text-white
          hover:bg-gradient-to-l h-12 w-12 p-5 from-[#0de7fa] via-[#079ba5] to-[#1203fa]
          transition-colors duration-100 ease-in-out hover:transition-all
          hover:duration-300 shadow-lg text-2xl 2xl:h-20 2xl:w-20"
          onClick={handleAddNewCV}
          style={{
            border: "2px solid",
            borderImage:
              "linear-gradient(to left, #0de7fa, #079ba5, #1203fa) 1",
          }}
        >
          +
        </button>
        {resumes &&
          resumes.map((cvId, index) => (
            <button
              key={cvId}
              className="relative flex items-center justify-center h-24 w-24
              bg-cover bg-center overflow-hidden shadow-lg 2xl:h-40 2xl:w-40"
              style={{ backgroundImage: `url(${buttonImage})` }}
              onClick={() => handleOpenCV(cvId)}
            >
              <div
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center
                justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
              >
                <text className="text-white text-lg font-semibold">
                  Resume: {index + 1}
                </text>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
};
