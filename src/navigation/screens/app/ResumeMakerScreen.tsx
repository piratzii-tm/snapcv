import { useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { getResume, setResume } from "../../../backend";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  const defaultImage = require("../../../resources/auth_bg_img.png");

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

  const fileInputRef = useRef<HTMLInputElement>(null);

  return !isLoading ? (
    <div className="flex h-full w-fit 2xl:w-full justify-center overflow-scroll">
      <div
        className={
          "flex flex-col self-end gap-2 h-[297mm] w-[210mm] border-black border" // h-[297mm] w-[210mm] - dimensiunile standard pentru A4
        }
      >
        <div className={"flex gap-2"}>
          <div className={"flex items-start w-6/12"}>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <img
              src={header.photo || defaultImage}
              alt="Selected"
              onClick={() => fileInputRef.current?.click()}
              className="h-40 w-40 rounded-full mt-10 ml-10 mb-10"
            />
            <div className="flex flex-col mt-12 ml-10 mb-10">
              <input
                placeholder={"Name..."}
                value={header.name}
                onChange={(e) => setHeader({ ...header, name: e.target.value })}
                className="text-2xl font-semibold"
              />
              <input
                placeholder={"Job title..."}
                value={header.title}
                onChange={(e) =>
                  setHeader({ ...header, title: e.target.value })
                }
                className="text-base"
              />
            </div>
          </div>
          <div className="flex flex-col items-end w-6/12 mt-12 mr-10 mb-10 gap-3">
            <div className="flex gap-3">
              <input
                placeholder={"Email..."}
                value={header.email}
                onChange={(e) =>
                  setHeader({ ...header, email: e.target.value })
                }
                className="text-right text-sm"
              />
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className="flex gap-3">
              <input
                placeholder={"Phone number..."}
                value={header.phone}
                onChange={(e) =>
                  setHeader({ ...header, phone: e.target.value })
                }
                className="text-right text-sm"
              />
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div className="flex gap-3">
              <input
                placeholder={"Address..."}
                value={header.address}
                onChange={(e) =>
                  setHeader({ ...header, address: e.target.value })
                }
                className="text-right text-sm"
              />
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <div className="flex gap-3">
              <input
                placeholder={"Linkedin..."}
                value={header.linkedin}
                onChange={(e) =>
                  setHeader({ ...header, linkedin: e.target.value })
                }
                className="text-right text-sm"
              />
              <FontAwesomeIcon icon={faLinkedin} />
            </div>
            <div className="flex gap-3">
              <input
                placeholder={"Github..."}
                value={header.github}
                onChange={(e) =>
                  setHeader({ ...header, github: e.target.value })
                }
                className="text-right text-sm"
              />
              <FontAwesomeIcon icon={faGithub} />
            </div>
          </div>
        </div>
        <button className={"p-2 bg-green-700"} onClick={onPressSave}>
          SAVE
        </button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
