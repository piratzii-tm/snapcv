import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getResume, setResume } from "../../../backend";

export const ResumeMakerScreen = () => {
  const [photo, setPhoto] = useState("");
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
      setPhoto(res.header?.photo);
      //Continue with the rest of the fields for the body
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getResultData().then(() => setIsLoading(false));
  }, []);

  const onPressSave = async () => {
    if (
      photo &&
      name &&
      title &&
      email &&
      phone &&
      address &&
      linkedin &&
      github
    ) {
      setIsLoading(true);
      await setResume(location.state.cvId, {
        header: {
          photo,
          name,
          title,
          email,
          phone,
          address,
          linkedin,
          github,
        },
        body: ["IGNORE"],
      }).then(() => setIsLoading(false));
    } else {
      alert("Please fill all the fields");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result as string); // Setam URL-ul imaginii
      };
      reader.readAsDataURL(file); // Citește imaginea ca URL base64
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
        <div className={"gap-2"}>
          <p>photo:</p>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {photo !== "" && (
            <img
              src={photo}
              alt="Selected"
              style={{ maxWidth: 100, marginTop: "20px" }}
            />
          )}
        </div>
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
