import React, { useEffect, useState } from "react";

export const ColorDropdown = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (val: string) => void;
}) => {
  const colors = [
    { colorName: "Blue", colorValue: "blue" },
    { colorName: "Red", colorValue: "red" },
    { colorName: "Green", colorValue: "green" },
    { colorName: "Yellow", colorValue: "yellow" },
    { colorName: "Purple", colorValue: "purple" },
    { colorName: "Pink", colorValue: "pink" },
    { colorName: "Orange", colorValue: "orange" },
    { colorName: "Teal", colorValue: "teal" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  useEffect(() => {
    setSelectedColor(colors.find((c) => c.colorValue === value) ?? colors[0]);
  }, [value]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (color: any) => {
    setSelectedColor(color);
    setValue(color.colorValue);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className={`inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-${selectedColor.colorValue}-500 text-${selectedColor.colorValue}-900`}
      >
        {selectedColor.colorName}
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
          <div className="" role="none">
            {colors.map((color, index) => (
              <button
                key={index}
                onClick={() => handleSelect(color)}
                className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none bg-${color.colorValue}-500 text-${color.colorValue}-900`}
                role="menuitem"
              >
                {color.colorName}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
