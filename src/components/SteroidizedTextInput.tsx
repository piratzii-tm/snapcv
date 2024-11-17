import React, { useEffect, useRef } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export const SteroidizedTextInput = ({
  text,
  setText,
  clickOutside,
}: {
  text: string;
  setText: (htmlText: string) => void;
  clickOutside: () => void;
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  // Configuration options
  const theme = "snow";
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };
  const placeholder = "Describe your experience, achievements and skills...";
  const formats = ["bold", "italic", "underline", "strike", "list"];

  // Initialize Quill with useQuill hook
  const { quill, quillRef } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });

  // Sync external `text` prop with Quill editor
  useEffect(() => {
    if (quill && text !== quill.root.innerHTML) {
      quill.root.innerHTML = text; // Update the editor content
    }
  }, [quill, text]);

  // Capture changes in the Quill editor and update the `setText` prop
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setText(quill.root.innerHTML); // Send updated content to parent
      });
    }
  }, [quill, setText]);

  // Handle clicks outside the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        clickOutside(); // Invoke the clickOutside callback
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickOutside]);

  return (
    <div className="max-h-fit" ref={divRef}>
      <div ref={quillRef} />
    </div>
  );
};
