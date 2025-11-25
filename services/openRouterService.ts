import { AnalysisResult, AIService } from "../types";
import { MOCK_RESULT } from "../constants";

export class OpenRouterService implements AIService {
    private model: string;

    constructor(model: string = "google/gemma-3n-e2b-it:free") {
        this.model = model;
    }

    async analyzeText(text: string, systemPrompt: string): Promise<AnalysisResult> {
        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            console.warn("No OPENROUTER_API_KEY found. Returning mock data.");
            await new Promise(resolve => setTimeout(resolve, 2000));
            return MOCK_RESULT;
        }

        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:5173",
                    "X-Title": "Lumina AI Writer",
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        {
                            role: "user",
                            content: `${systemPrompt}\n\nIMPORTANT: Return ONLY valid JSON.\n\nInput Text:\n${text}`
                        }
                    ],
                    // response_format: { type: "json_object" } // Removing this as it might also cause issues with some free models
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`OpenRouter API Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            const resultText = data.choices?.[0]?.message?.content;

            if (!resultText) {
                throw new Error("Empty response from OpenRouter");
            }

            // Clean up markdown code blocks if present
            const jsonString = resultText.replace(/```json\n?|\n?```/g, "").trim();

            const parsedData = JSON.parse(jsonString);

            return {
                score: parsedData.score || 0,
                summary: parsedData.summary || "Analysis complete.",
                strengths: parsedData.strengths || [],
                weaknesses: parsedData.weaknesses || [],
                suggestions: parsedData.suggestions || []
            };

        } catch (error) {
            console.error("OpenRouter Service Error:", error);
            return MOCK_RESULT;
        }
    }
}
