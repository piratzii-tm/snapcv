import React from "react";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export const SteroidizedTextInput = ({
  text,
  setText,
  htmlText,
  setHtmlText,
  height,
  width,
  onSave,
}: {
  text: string;
  setText: (text: string) => void;
  htmlText: string;
  setHtmlText: (htmlText: string) => void;
  height: number;
  width: number;
  onSave: () => void;
}) => {
  //Remove this lines if you want all the options
  const theme = "snow";
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],

      [{ list: "ordered" }, { list: "bullet" }],

      [{ size: ["small", false, "large", "huge"] }],
      [{ color: [] }, { background: [] }],
    ],
  };
  const placeholder = "Compose an epic...";
  const formats = [
    //For text
    "bold",
    "italic",
    "underline",
    "strike",
    //For lists
    "list",
    //For size
    "size",
    "header",
    //For color
    "color",
    "background",
  ];

  const { quill, quillRef } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });

  //On text change
  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        //Leave this just in case
        // console.log(quill.getText()); // Get text only
        // console.log(quill.getContents()); // Get delta contents
        // console.log(quill.root.innerHTML); // Get innerHTML using quill
        // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
        setHtmlText(quillRef.current.firstChild.innerHTML);
        setText(quill.getText());
      });
    }
  }, [quill]);

  console.log("TEXT: ", text);
  console.log("HTML TEXT: ", htmlText);

  return (
    <div style={{ width: width, height: height }}>
      <div ref={quillRef} />
      <button
        style={{
          color: "white",
          background: "green",
          padding: 10,
          borderRadius: 50,
          marginTop: 5,
        }}
        onClick={onSave}
      >
        Save changes
      </button>
    </div>
  );
};
