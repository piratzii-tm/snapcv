import { openAiApiKey } from "../constants";

const getPrompt = (userText: string) =>
  `I have a resume and I want to improve my text. I will provide you the text I have written. Regarding of the language, please provide an enhanced version of my text. My version of the text is ${userText}. Please provide the answer as a simple string of maximum 300 characters (including whitespaces) in the language my text was provided.`;

export const getAiOpinion = async (cvText: string) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview",
        temperature: 0,
        max_tokens: 100,
        messages: [
          {
            role: "user",
            content: getPrompt(cvText),
          },
        ],
      }),
    });

    const jsonResponse = await response.json();

    console.log("RESPONSE: ", jsonResponse.choices[0].message.content);

    return jsonResponse.choices[0].message.content;
  } catch (error) {
    console.log("REQUEST ERROR: ", error);
    throw Error("Something went wrong with the request");
  }
};
