import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getResume,
  InitializeResumeInstanceDto,
  setResume,
} from "../../../backend";

export const ResumeMakerScreen = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const getResultData = async () => {
    await getResume(location.state.cvId).then((res) => {
      setName(res.header?.name);
      setTitle(res.header?.title);
      setEmail(res.header?.email);
      setPhone(res.header?.phone);
      setAddress(res.header?.address);
      setLinkedin(res.header?.linkedin);
      setGithub(res.header?.github);
      //Continue with the rest of the fields for the body
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getResultData().then(() => setIsLoading(false));
  }, []);

  const onPressSave = async () => {
    if (name && title && email && phone && address && linkedin && github) {
      await setResume(location.state.cvId, {
        header: {
          photo: "",
          name,
          title,
          email,
          phone,
          address,
          linkedin,
          github,
        },
        body: {},
      });
    } else {
      alert("Please fill all the fields");
    }
  };

  return !isLoading ? (
    <div
      className={
        "flex flex-col content-center items-center justify-center gap-2"
      }
    >
      <p>Here we shall have a resume maker</p>
      <div className={"flex flex-col gap-2"}>
        <p>photo: NU E FACUT INCA</p>
        <div className={"flex flex-row gap-2"}>
          <p>name:</p>
          <input
            placeholder={"Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={"flex flex-row gap-2"}>
          <p>title:</p>
          <input
            placeholder={"Job title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={"flex flex-row gap-2"}>
          <p>email:</p>
          <input
            placeholder={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={"flex flex-row gap-2"}>
          <p>phone number:</p>
          <input
            placeholder={"Phone number"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={"flex flex-row gap-2"}>
          <p>address:</p>
          <input
            placeholder={"Address"}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className={"flex flex-row gap-2"}>
          <p>linkedin:</p>
          <input
            placeholder={"Linkedin"}
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </div>
        <div className={"flex flex-row gap-2"}>
          <p>github:</p>
          <input
            placeholder={"Github"}
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>
      </div>
      <button className={"p-2 bg-green-700"} onClick={onPressSave}>
        SAVE
      </button>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
