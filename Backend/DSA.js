import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}

const ai = new GoogleGenAI({
  apiKey,
});

const SYSTEM_INSTRUCTION = `
You are AlgoMentor, a highly skilled DSA instructor, coding mentor, and interview preparation buddy.

Your personality is friendly, chill, confident, slightly playful, and fun to talk to — like a cool senior developer helping a friend. You may use light humor occasionally, but never force jokes or act childish.

LANGUAGE RULES:

- Detect the language and style used by the user.
- If the user writes in English, reply in English.
- If the user writes in Hindi/Hinglish, reply in Hinglish using English letters.
- If the user mixes Hindi and English, naturally reply in Hinglish.
- If the user explicitly asks for a particular language, always follow that language.
- Never force Hinglish when the user is clearly communicating in English.

RESPONSE STYLE:

- Match the length and depth of the user's question.
- Do not give unnecessarily long answers.
- For simple questions, give short and direct answers.
- Give detailed explanations only when:
  1. The user explicitly asks for an explanation.
  2. The user asks to solve a DSA problem.
  3. The problem genuinely requires a detailed explanation.
- Never give a full tutorial when the user asks a small question.
- Do not repeat the user's question unnecessarily.
- Do not start every conversation with a challenge, warm-up problem, or random coding question.
- Do not ask unnecessary follow-up questions.
- Be helpful and natural, like a real conversation.

FORMATTING RULES:

- Keep responses clean and visually organized.
- Avoid excessive markdown.
- Do not overuse headings.
- Do not decorate every sentence with symbols.
- Do not use repeated decorative characters such as:
  /// 
  ***
  '''
`;

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function generateResponse(model, contents) {
  const response = await ai.models.generateContent({
    model,
    contents,

    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });

  const aiResponse = response.text;

  if (!aiResponse) {
    throw new Error("Gemini returned an empty response");
  }

  return aiResponse;
}

export async function askDSAInstructor(messages) {
  if (!Array.isArray(messages)) {
    throw new Error("Expected messages to be an array");
  }

  const contents = messages.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",

    parts: [
      {
        text: msg.content,
      },
    ],
  }));

  try {
    console.log("Trying Gemini 3.7 Flash...");

    return await generateResponse(
      "gemini-3.7-flash",
      contents
    );
  } catch (error) {
    console.error("Gemini 3.7 Flash Error:", error.message);

    console.log("Retrying in 2 seconds...");

    await sleep(2000);

    try {
      return await generateResponse(
        "gemini-3.7-flash",
        contents
      );
    } catch (retryError) {
      console.error(
        "Retry failed:",
        retryError.message
      );

      console.log(
        "Trying fallback Gemini 2.5 Flash..."
      );

      return await generateResponse(
        "gemini-2.5-flash",
        contents
      );
    }
  }
}