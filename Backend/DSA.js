import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing in .env file");
}

const ai = new GoogleGenAI({
  apiKey,
});

export async function askDSAInstructor(messages) {
  try {
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

    console.log("Sending request to Gemini...");

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",

      contents,

      config: {
        systemInstruction: `
You are an expert DSA instructor and interview mentor.

Teach Data Structures and Algorithms clearly and step by step.

Use Java for all code examples.

For problem-solving questions:

1. Explain the problem
2. Explain intuition
3. Show brute force approach
4. Show optimized approach
5. Perform a dry run
6. Provide clean Java code
7. Explain time complexity
8. Explain space complexity
9. Give interview tips

Reply in simple Hinglish written using English letters.

Only answer questions related to DSA.
        `,
      },
    });

    console.log("Gemini response received");

    const aiResponse = response.text;

    if (!aiResponse) {
      throw new Error("Gemini returned an empty response");
    }

    return aiResponse;

  } catch (error) {
    console.error("Gemini Error:", error);
    console.error("Error cause:", error.cause);

    throw error;
  }
}