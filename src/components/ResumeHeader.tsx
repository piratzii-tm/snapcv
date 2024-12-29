import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import React from "react";

export const ResumeHeader = ({
  color,
  fileInputRef,
  handleImageChange,
  header,
  setHeader,
}: {
  color: string;
  fileInputRef: any;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  header: any;
  setHeader: (val: any) => void;
}) => {
  const defaultImage = require("../resources/auth_bg_img.png");

  return (
    <div className={`flex gap-2 border-b-2 border-b-${color}-900`}>
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
            className={`text-3xl font-semibold text-${color}-900`}
          />
          <input
            placeholder={"Job title..."}
            value={header.title}
            onChange={(e) => setHeader({ ...header, title: e.target.value })}
            className="text-base text-gray-800 font-semibold"
          />
        </div>
      </div>
      <div className="flex flex-col items-end w-6/12 mt-12 mr-10 mb-10 gap-3">
        <div className="flex gap-3 flex-row items-center">
          <input
            placeholder={"Email..."}
            value={header.email}
            onChange={(e) => setHeader({ ...header, email: e.target.value })}
            className="text-right text-lg text-gray-800"
          />
          <FontAwesomeIcon icon={faEnvelope} color={"#1f2937"} />
        </div>
        <div className="flex gap-3 flex-row items-center">
          <input
            placeholder={"Phone number..."}
            value={header.phone}
            onChange={(e) => setHeader({ ...header, phone: e.target.value })}
            className="text-right text-lg text-gray-800"
          />
          <FontAwesomeIcon icon={faPhone} color={"#1f2937"} />
        </div>
        <div className="flex gap-3 flex-row items-center">
          <input
            placeholder={"Address..."}
            value={header.address}
            onChange={(e) => setHeader({ ...header, address: e.target.value })}
            className="text-right text-lg text-gray-800"
          />
          <FontAwesomeIcon icon={faLocationDot} color={"#1f2937"} />
        </div>
        <div className="flex gap-3 flex-row items-center">
          <input
            placeholder={"Linkedin..."}
            value={header.linkedin}
            onChange={(e) => setHeader({ ...header, linkedin: e.target.value })}
            className="text-right text-lg text-gray-800"
          />
          <FontAwesomeIcon icon={faLinkedin} color={"#1f2937"} />
        </div>
        <div className="flex gap-3 flex-row items-center">
          <input
            placeholder={"Github..."}
            value={header.github}
            onChange={(e) => setHeader({ ...header, github: e.target.value })}
            className="text-right text-lg text-gray-8"
          />
          <FontAwesomeIcon icon={faGithub} color={"#1f2937"} />
        </div>
      </div>
    </div>
  );
};
