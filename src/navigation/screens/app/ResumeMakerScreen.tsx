import { useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { getResume, setResume } from "../../../backend";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SectionModel } from "../../../constants";
import { ResumeSection } from "../../../components";
import { isEqual } from "lodash";

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
  const [sections, setSections] = useState<SectionModel[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultImage = require("../../../resources/auth_bg_img.png");

  useEffect(() => {
    setIsLoading(true);
    getResultData().then(() => setIsLoading(false));
  }, []);

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
        setHeader({ ...header, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        id: sections.length > 0 ? sections[sections.length - 1].id + 1 : 0,
        title: "Title",
        subsections: [],
      },
    ]);
  };

  return !isLoading ? (
    <div className="flex-1 w-screen h-full justify-items-center p-10 bg-blue-50  ">
      <div className={"fixed top-0 left-0 m-4 flex flex-col gap-5"}>
        <button
          onClick={onPressSave}
          className={
            "bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-600 w-fit"
          }
        >
          Save
        </button>
        <button
          onClick={handleAddSection}
          className={
            "bg-orange-300 text-white py-2 px-4 rounded shadow-lg hover:bg-orange-600 w-fit"
          }
        >
          Add another section
        </button>
      </div>

      <div
        className={"flex flex-col self-end gap-2 h-[297mm] w-[210mm] bg-white"}
      >
        {/*TODO Move to a separate component*/}
        {/*#region - ResumeHeader*/}
        <div className={"flex gap-2 border-b-2 border-b-blue-900"}>
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
                className="text-2xl font-semibold "
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
        {/*endregion*/}
        {sections.map((section, index) => (
          <ResumeSection
            key={section.id}
            content={section}
            onDeleteSection={() => {
              const newSections = sections.filter(
                (sec) => sec.id !== section.id,
              ); // Exclude matching 'id'
              setSections(newSections);
            }}
          />
        ))}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
