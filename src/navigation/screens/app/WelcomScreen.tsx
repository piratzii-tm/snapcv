import React from "react";

import { logout } from "../../../backend";
import { SteroidizedTextInput } from "../../../components";

export const WelcomeScreen = () => {
  const [text, setText] = React.useState("");
  const [htmlText, setHtmlText] = React.useState("");

  return (
    <div
      className={"flex flex-col content-center items-center justify-center "}
    >
      <p>Here we shall have a welcome and display all resumes</p>
      <button onClick={logout}>Logout</button>
      <SteroidizedTextInput
        text={text}
        setText={setText}
        htmlText={htmlText}
        setHtmlText={setHtmlText}
        height={300}
        width={500}
        onSave={() => console.log("SAVED")}
      />
    </div>
  );
};
