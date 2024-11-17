import { SectionModel } from "../constants";
import React, { useEffect, useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SteroidizedTextInput } from "./SteroidizedTextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const ResumeSection = ({
  content,
  onDeleteSection,
}: {
  content: SectionModel;
  onDeleteSection: () => void;
}) => {
  const [section, setSection] = useState(content);
  const [editing, setEditing] = useState(section.subsections.map(() => false));

  const onFieldChange = (object: any, currentIndex: number) => {
    let subsections = section.subsections.map((sb, sbind) => {
      if (sbind === currentIndex) {
        return {
          ...sb,
          ...object,
        };
      }
      return sb;
    });
    setSection({ ...section, subsections });
  };

  useEffect(() => {
    setEditing([...editing, false]);
  }, [section.subsections.length]);

  useEffect(() => {
    console.log(editing);
  }, [editing]);

  return (
    <div className={"p-5 w-1/2 max-h-fit flex-1"}>
      <div className={"flex flex-row gap-1 items-center"}>
        <input
          placeholder={"Section title ..."}
          value={section.title}
          className={
            "text-3xl font-bold pb-1 border-b-blue-900 border-b-2 w-full"
          }
          onChange={(e) => setSection({ ...section, title: e.target.value })}
        />
        <FontAwesomeIcon
          icon={faTrash}
          color={"#dc9292"}
          onClick={onDeleteSection}
        />
      </div>
      {section.subsections.map((subsection, index) => (
        <div className={"mt-5"}>
          <input
            value={subsection.title}
            onChange={(e) => onFieldChange({ title: e.target.value }, index)}
            className={"text-2xl font-semibold"}
          />
          <FontAwesomeIcon
            icon={faTrash}
            color={"#dc9292"}
            onClick={() => {
              const newSubsections = section.subsections.filter(
                (subsec) => subsec.id !== subsection.id,
              ); // Exclude matching 'id'
              setSection({ ...section, subsections: newSubsections });
            }}
          />
          <div className={"pl-2 border-l-2 "}>
            <div className={"flex flex-row"}>
              <DatePicker
                selected={moment(subsection.from).toDate()}
                value={moment(subsection.from).format("DD/MM/YYYY")}
                onChange={(date) => onFieldChange({ from: date }, index)}
                className={"text-sm italic text-gray-500 max-w-20"}
              />
              <p className={"mr-2 italic text-gray-500 "}>-</p>
              <DatePicker
                selected={moment(subsection.from).toDate()}
                value={
                  moment(subsection.to).diff(new Date()).valueOf() >= 0
                    ? "Present"
                    : moment(subsection.to).format("DD/MM/YYYY")
                }
                onChange={(date) => onFieldChange({ to: date }, index)}
                className={"text-sm italic text-gray-500 max-w-15"}
              />
            </div>
            <div className={"max-h-fit pe-3"}>
              {!editing[index] && (
                <div
                  onClick={() =>
                    setEditing(editing.map((el, elin) => elin === index && !el))
                  }
                  dangerouslySetInnerHTML={{ __html: subsection.description }}
                />
              )}
              {editing[index] && (
                <SteroidizedTextInput
                  clickOutside={() => {
                    setEditing(
                      editing.map((el, elin) => elin === index && !el),
                    );
                  }}
                  text={subsection.description}
                  setText={(description) =>
                    onFieldChange({ description }, index)
                  }
                />
              )}
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          setSection({
            ...section,
            subsections: [
              ...section.subsections,
              {
                id:
                  section.subsections.length > 0
                    ? section.subsections[section.subsections.length - 1].id + 1
                    : 0,

                title: "Title",
                description: "<p>Add your description...</p>",
                from: new Date(),
                to: new Date(),
              },
            ],
          });
        }}
        className={
          "bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-600 w-fit mt-5"
        }
      >
        Add subsection
      </button>
    </div>
  );
};
