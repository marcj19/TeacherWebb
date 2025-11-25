import { AnalysisResult, AIService } from "../types";
import { MOCK_RESULT } from "../constants";

export class OpenRouterService implements AIService {
  private model: string;

  constructor(model: string = "google/gemma-3n-e2b-it:free") {
    this.model = model;
  }

  async analyzeText(text: string, systemPrompt: string): Promise<AnalysisResult> {

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: this.model,
          text,
          systemPrompt
        })
      });

      if (!response.ok) {
        console.error("API erro:", await response.text());
        return MOCK_RESULT;
      }

      const data = await response.json();

      const resultText = data.choices?.[0]?.message?.content;
      if (!resultText) return MOCK_RESULT;

      const clean = resultText.replace(/```json\n?|```/g, "").trim();
      const parsed = JSON.parse(clean);

      return {
        score: parsed.score ?? 0,
        summary: parsed.summary ?? "Analysis complete.",
        strengths: parsed.strengths ?? [],
        weaknesses: parsed.weaknesses ?? [],
        suggestions: parsed.suggestions ?? []
      };
    } catch (err) {
      console.error("Service error:", err);
      return MOCK_RESULT;
    }
  }
}
