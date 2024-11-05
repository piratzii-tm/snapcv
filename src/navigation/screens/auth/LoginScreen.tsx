import { getPersonalityRequest } from "../../../ai";

export const LoginScreen = () => (
  <div className={"flex content-center items-center justify-center"}>
    <p>Here we shall have a login</p>
    <button
      className={
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      }
      //TODO: This is a test button, remove it
      onClick={() =>
        getPersonalityRequest(
          "Ma cheam Mihi si sunt programator si im iplace sa scriu cod in React.",
        )
      }
    >
      Button
    </button>
  </div>
);
