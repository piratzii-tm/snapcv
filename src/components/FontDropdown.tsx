import React, { useEffect, useState } from "react";

type Font = { fontName: string; fontValue: string };

const fonts = [
  { fontName: "Poppins", fontValue: "poppins" },
  { fontName: "Raleway", fontValue: "raleway" },
  { fontName: "Roboto", fontValue: "roboto" },
  { fontName: "Lato", fontValue: "lato" },
  { fontName: "Montserrat", fontValue: "montserrat" },
  { fontName: "Open Sans", fontValue: "openSans" },
  { fontName: "Default", fontValue: "none" },
];

export const FontDropdown = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (val: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState(
    fonts[0]?.fontName || "Select Font",
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fontName =
      fonts.find((f) => f.fontValue === value)?.fontName ?? "none";
    setSelectedFont(fontName);
  }, []);

  const handleSelect = (font: Font) => {
    setSelectedFont(font.fontName);
    setValue(font.fontValue);
    setIsOpen(false);
    console.log(`Selected font value: ${font.fontValue}`);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {selectedFont}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {fonts.map((font, index) => (
              <button
                key={index}
                onClick={() => handleSelect(font)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {font.fontName}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
