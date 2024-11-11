import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getResume, setResume } from "../../../backend";

export const ResumeMakerScreen = () => {
  const [header, setHeader] = useState({
    photo: "",
    name: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const getResultData = async () => {
    await getResume(location.state.cvId).then((res) => {
      setHeader({
        photo: res.header?.photo,
        name: res.header?.name,
        title: res.header?.title,
        email: res.header?.email,
        phone: res.header?.phone,
        address: res.header?.address,
        linkedin: res.header?.linkedin,
        github: res.header?.github,
      });
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getResultData().then(() => setIsLoading(false));
  }, []);

  const onPressSave = async () => {
    if (
      header.photo !== "" &&
      header.name !== "" &&
      header.title !== "" &&
      header.email !== "" &&
      header.phone !== "" &&
      header.address !== "" &&
      header.linkedin !== "" &&
      header.github !== ""
    ) {
      setIsLoading(true);
      await setResume(location.state.cvId, {
        header: {
          photo: header.photo,
          name: header.name,
          title: header.title,
          email: header.email,
          phone: header.phone,
          address: header.address,
          linkedin: header.linkedin,
          github: header.github,
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
        setHeader({ ...header, photo: reader.result as string }); // Setam URL-ul imaginii
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
          {header.photo !== "" && (
            <img
              src={header.photo}
              alt="Selected"
              style={{ maxWidth: 100, marginTop: "20px" }}
            />
          )}
        </div>
        <div className={"flex flex-row gap-2"}>
          <p>name:</p>
          <input
            placeholder={"Name"}
            value={header.name}
            onChange={(e) => setHeader({ ...header, name: e.target.value })}
          />
        </div>
        <div className={"flex flex-row gap-2"}>
          <p>title:</p>
          <input
            placeholder={"Job title"}
            value={header.title}
            onChange={(e) => setHeader({ ...header, title: e.target.value })}
          />
        </div>
        <div className={"flex flex-row gap-2"}>
          <p>email:</p>
          <input
            placeholder={"Email"}
            value={header.email}
            onChange={(e) => setHeader({ ...header, email: e.target.value })}
          />
        </div>
        <div className={"flex flex-row gap-2"}>
          <p>phone number:</p>
          <input
            placeholder={"Phone number"}
            value={header.phone}
            onChange={(e) => setHeader({ ...header, phone: e.target.value })}
          />
        </div>
        <div className={"flex flex-row gap-2"}>
          <p>address:</p>
          <input
            placeholder={"Address"}
            value={header.address}
            onChange={(e) => setHeader({ ...header, address: e.target.value })}
          />
        </div>
        <div className={"flex flex-row gap-2"}>
          <p>linkedin:</p>
          <input
            placeholder={"Linkedin"}
            value={header.linkedin}
            onChange={(e) => setHeader({ ...header, linkedin: e.target.value })}
          />
        </div>
        <div className={"flex flex-row gap-2"}>
          <p>github:</p>
          <input
            placeholder={"Github"}
            value={header.github}
            onChange={(e) => setHeader({ ...header, github: e.target.value })}
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
