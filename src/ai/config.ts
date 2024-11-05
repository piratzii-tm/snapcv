import { openAiApiKey } from "../constants";

export const getPersonalityRequest = async (cvText: string) => {
  const AI_KEY = openAiApiKey;
  console.log("AI START PERSONALITY REQUEST");
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview",
        temperature: 0,
        max_tokens: 100,
        messages: [
          {
            role: "user",
            content: `Am scris asta in CV: ${cvText}, poti sa o faci mai bine? Scrie doar raspunsul, fara alte adaugiri.`,
          },
        ],
      }),
    });

    const jsonResponse = await response.json();

    console.log("RESPONSE: ", jsonResponse.choices[0].message.content);

    return jsonResponse.choices[0].message.content;
  } catch (error) {
    console.log("PERSONALITY REQUEST ERROR: ", error);
    return "ERROR: SOMETHING WENT WRONG";
  }
};
