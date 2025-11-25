import { WritingMode, WritingModeId } from './types';

export const WRITING_MODES: WritingMode[] = [
  {
    id: WritingModeId.ENEM,
    title: 'Redação ENEM',
    description: 'Structure your essay based on the 5 competencies with a focus on argumentation and social intervention.',
    iconName: 'GraduationCap',
    placeholder: 'Digite o tema da redação e comece a escrever sua tese...',
    systemPrompt: `You are an expert evaluator for the Brazilian ENEM essay exam. 
    Analyze the provided text based on the 5 official competencies: 
    1) Written Standard Portuguese, 
    2) Theme Comprehension & Structure, 
    3) Argumentation, 
    4) Cohesion, 
    5) Intervention Proposal.
    Return the response in valid JSON format with keys: "score" (0-1000), "summary" (brief overview), "strengths" (array of strings), "weaknesses" (array of strings), "suggestions" (array of strings).`
  },
  {
    id: WritingModeId.CORPORATE,
    title: 'Relatório Corporativo',
    description: 'Generate professional, data-driven executive summaries and reports with formal tone.',
    iconName: 'Briefcase',
    placeholder: 'Insira os dados principais e os objetivos do relatório...',
    systemPrompt: `You are a senior corporate communications consultant. 
    Analyze the text for clarity, conciseness, formal tone, and data presentation.
    Return the response in valid JSON format with keys: "score" (0-100 placeholder), "summary", "strengths", "weaknesses", "suggestions". Focus on business impact and brevity.`
  },
  {
    id: WritingModeId.BLOG,
    title: 'Artigo de Blog (SEO)',
    description: 'Optimize content for search engines (SEO) while maintaining an engaging, conversational tone.',
    iconName: 'Feather',
    placeholder: 'Comece com um gancho forte e desenvolva seus tópicos...',
    systemPrompt: `You are an SEO Content Strategist. 
    Analyze the text for keyword density, readability, heading structure, and engagement.
    Return the response in valid JSON format with keys: "score" (0-100 SEO Score), "summary", "strengths", "weaknesses", "suggestions".`
  }
];

export const MOCK_RESULT = {
  score: 850,
  summary: "This is a simulated analysis because the API key might be missing or the request failed. The structure is solid, but needs more depth.",
  strengths: ["Good vocabulary usage", "Clear structure", "Strong opening"],
  weaknesses: ["Lack of concrete data", "Repetitive sentence structure"],
  suggestions: ["Add more specific examples", "Vary sentence length for better flow"]
};
