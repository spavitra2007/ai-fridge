import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function getFoodSavingTips(query: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `You are a helpful AI food waste reduction expert. 
    User Question: ${query}
    Provide practical, safety-first advice on how to reduce food waste, store leftovers properly, or repurpose surplus food. Keep it concise and professional.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini Error:', error);
    return "I'm sorry, I'm having trouble connecting to my creative kitchen right now. Please try again later!";
  }
}
