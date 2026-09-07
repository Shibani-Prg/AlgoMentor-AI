import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY,
});

async function testGemini() {
  try {
    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: "Say hello",
    });

    console.log(interaction.output_text);

  } catch (error) {
    console.error("FULL ERROR:");
    console.error(error);
  }
}

testGemini();