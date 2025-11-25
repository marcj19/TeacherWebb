import { GoogleGenAI } from "@google/genai";
import { AnalysisResult } from "../types";
import { MOCK_RESULT } from "../constants";

export const analyzeText = async (
  text: string, 
  systemPrompt: string
): Promise<AnalysisResult> => {
  
  const apiKey = process.env.API_KEY;

  // Fallback if no API key is present (Mock Mode)
  if (!apiKey) {
    console.warn("No API_KEY found in process.env. Returning mock data.");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    return MOCK_RESULT;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // We are asking for JSON in the system prompt defined in constants.ts
    // We reinforce it here using responseMimeType if using 2.5-flash
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: text,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        temperature: 0.2, // Low temperature for consistent analysis
      }
    });

    const resultText = response.text;
    
    if (!resultText) {
        throw new Error("Empty response from AI");
    }

    const parsedData = JSON.parse(resultText);
    
    return {
      score: parsedData.score || 0,
      summary: parsedData.summary || "Analysis complete.",
      strengths: parsedData.strengths || [],
      weaknesses: parsedData.weaknesses || [],
      suggestions: parsedData.suggestions || []
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return mock result on error to keep UI functional as requested
    return MOCK_RESULT;
  }
};
