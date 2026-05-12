import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const ai = new GoogleGenAI({ apiKey });

export async function getFoodSavingTips(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        parts: [{
          text: `You are an expert in food redistribution and sustainability. 
          Provide practical, actionable advice for the following query: "${query}".
          Keep it concise, encouraging, and focused on reducing food waste and helping those in need.`
        }]
      }],
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't generate tips right now. Please check your AI quota or connection.";
  }
}
