import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { deleteResume, getResume, setResume } from "../../../backend";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SectionModel } from "../../../constants";
import { ResumeSection } from "../../../components";
import { isEqual } from "lodash";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Paths } from "../../constants";

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

  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const defaultImage = require("../../../resources/auth_bg_img.png");

  useEffect(() => {
    setIsLoading(true);
    getResultData().then(() => setIsLoading(false));
  }, []);

  const getResultData = async () => {
    await getResume(location.state.cvId).then((res) => {
      if (res && res.body) {
        console.log(Object.values(res.body), Object.values(res.body)[0]);
        const sects = Object.values(res.body).slice(0) as SectionModel[];
        setSections(sects);
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
      }
    });
  };

  const onPressSave = async () => {
    if (
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
        body: sections,
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

  const printDocument = () => {
    const input = document.getElementById("divToPrint");

    if (!input) return;

    // Force html2canvas to render input fields and buttons properly
    html2canvas(input, {
      scrollY: -window.scrollY, // Ensure no clipping due to scroll
      width: input.scrollWidth, // Full width of the content
      height: input.scrollHeight, // Full height of the content
      useCORS: true, // Handle CORS images
      scale: 3, // Slightly lower scale to avoid cropping at high resolution
      logging: false, // Disable logging to reduce console noise
      ignoreElements: (element) => {
        return (
          element.tagName === "BUTTON" ||
          (element.hasAttribute("data-ignore") &&
            element.getAttribute("data-ignore") === "true")
        );
      },
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4"); // Initialize jsPDF with A4 size (portrait orientation)

      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm

      // Original width and height of the canvas
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Maintain aspect ratio for the image on the PDF
      const aspectRatio = imgWidth / imgHeight;
      const pdfAspectRatio = pdfWidth / pdfHeight;

      let finalImgWidth = pdfWidth;
      let finalImgHeight = pdfHeight;

      // If the aspect ratio of the image is larger than the PDF, scale based on width
      if (aspectRatio > pdfAspectRatio) {
        finalImgHeight = pdfWidth / aspectRatio; // Scale to fit width
      } else {
        // Scale based on height
        finalImgWidth = pdfHeight * aspectRatio;
      }

      // Center the image horizontally and vertically on the page
      const xOffset = (pdfWidth - finalImgWidth) / 2; // Horizontal center
      const yOffset = (pdfHeight - finalImgHeight) / 2; // Vertical center

      // If the content fits on a single page
      if (finalImgHeight <= pdfHeight) {
        pdf.addImage(
          imgData,
          "PNG",
          xOffset,
          yOffset,
          finalImgWidth,
          finalImgHeight,
        );
      } else {
        // If the content overflows and needs multiple pages
        let remainingHeight = finalImgHeight;
        let currentYOffset = yOffset;

        while (remainingHeight > 0) {
          const currentPageHeight = Math.min(pdfHeight, remainingHeight);

          // Add the image with the current yOffset to center it on the page
          pdf.addImage(
            imgData,
            "PNG",
            xOffset,
            currentYOffset,
            finalImgWidth,
            currentPageHeight,
          );

          // Adjust the remaining height and yOffset for the next page
          remainingHeight -= currentPageHeight;
          currentYOffset = 0; // Reset yOffset for next page

          if (remainingHeight > 0) {
            pdf.addPage(); // Add a new page if content is still remaining
          }
        }
      }

      pdf.save("download.pdf");
    });
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    setIsOpen(false);
  };

  const handleSure = () => {
    deleteResume(location.state.cvId).then(() => navigate(Paths.main));
    setIsOpen(false);
  };

  return !isLoading ? (
    <div className="flex-1 w-screen h-full justify-items-center p-10 bg-blue-50  ">
      <div className={"fixed top-0 left-0 m-4 flex flex-col gap-5"}>
        <div className={"flex flex-row gap-2"}>
          <button
            onClick={onPressSave}
            className={
              "bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-600 w-fit"
            }
          >
            Save
          </button>
          <button
            onClick={printDocument}
            className={
              "bg-green-300 text-green-500 py-2 px-4 rounded shadow-lg hover:bg-green-600 w-fit"
            }
          >
            Download
          </button>
        </div>
        <button
          onClick={handleAddSection}
          className={
            "bg-orange-300 text-white py-2 px-4 rounded shadow-lg hover:bg-orange-600 w-fit"
          }
        >
          Add another section
        </button>
        <button
          //
          onClick={() => setIsOpen(true)}
          className={
            "bg-red-500 text-white py-2 px-4 rounded shadow-lg hover:bg-orange-600 w-fit"
          }
        >
          Delete resume
        </button>
      </div>

      <div
        className={
          "flex flex-col self-end gap-2 min-h-[297mm] w-[210mm] bg-white"
        }
        id={"divToPrint"}
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
                className="text-3xl font-semibold text-blue-900"
              />
              <input
                placeholder={"Job title..."}
                value={header.title}
                onChange={(e) =>
                  setHeader({ ...header, title: e.target.value })
                }
                className="text-base text-gray-800 font-semibold"
              />
            </div>
          </div>
          <div className="flex flex-col items-end w-6/12 mt-12 mr-10 mb-10 gap-3">
            <div className="flex gap-3 flex-row items-center">
              <input
                placeholder={"Email..."}
                value={header.email}
                onChange={(e) =>
                  setHeader({ ...header, email: e.target.value })
                }
                className="text-right text-lg text-gray-800"
              />
              <FontAwesomeIcon icon={faEnvelope} color={"#1f2937"} />
            </div>
            <div className="flex gap-3 flex-row items-center">
              <input
                placeholder={"Phone number..."}
                value={header.phone}
                onChange={(e) =>
                  setHeader({ ...header, phone: e.target.value })
                }
                className="text-right text-lg text-gray-800"
              />
              <FontAwesomeIcon icon={faPhone} color={"#1f2937"} />
            </div>
            <div className="flex gap-3 flex-row items-center">
              <input
                placeholder={"Address..."}
                value={header.address}
                onChange={(e) =>
                  setHeader({ ...header, address: e.target.value })
                }
                className="text-right text-lg text-gray-800"
              />
              <FontAwesomeIcon icon={faLocationDot} color={"#1f2937"} />
            </div>
            <div className="flex gap-3 flex-row items-center">
              <input
                placeholder={"Linkedin..."}
                value={header.linkedin}
                onChange={(e) =>
                  setHeader({ ...header, linkedin: e.target.value })
                }
                className="text-right text-lg text-gray-800"
              />
              <FontAwesomeIcon icon={faLinkedin} color={"#1f2937"} />
            </div>
            <div className="flex gap-3 flex-row items-center">
              <input
                placeholder={"Github..."}
                value={header.github}
                onChange={(e) =>
                  setHeader({ ...header, github: e.target.value })
                }
                className="text-right text-lg text-gray-8"
              />
              <FontAwesomeIcon icon={faGithub} color={"#1f2937"} />
            </div>
          </div>
        </div>
        {/*endregion*/}
        <div className={"flex flex-row flex-wrap"}>
          {sections.slice(1) &&
            sections?.map((section, index) => (
              <ResumeSection
                key={section.id}
                content={section}
                updateSection={(updatedSection) => {
                  const newSections = sections.map((sec) =>
                    sec.id === section.id ? updatedSection : sec,
                  );
                  setSections(newSections);
                }}
                onDeleteSection={() => {
                  const newSections = sections.filter(
                    (sec) => sec.id !== section.id,
                  );
                  setSections(newSections);
                }}
              />
            ))}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <dialog
            open={true}
            className="bg-white p-6 rounded-lg shadow-lg w-96"
          >
            <p className="text-lg font-medium text-gray-800 mb-8 text-center">
              Do you really want to delete this resume? 😕
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={handleSure}
              >
                Sure
              </button>
            </div>
          </dialog>
        </div>
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
};
