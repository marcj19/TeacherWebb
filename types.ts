export enum AppView {
  DASHBOARD = 'DASHBOARD',
  WORKSPACE = 'WORKSPACE',
}

export enum WritingModeId {
  ENEM = 'ENEM',
  CORPORATE = 'CORPORATE',
  BLOG = 'BLOG',
}

export interface WritingMode {
  id: WritingModeId;
  title: string;
  description: string;
  iconName: string; // Using string to map to Lucide icons dynamically or via switch
  systemPrompt: string;
  placeholder: string;
}

export interface AnalysisResult {
  score?: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export interface AppState {
  currentView: AppView;
  selectedMode: WritingMode | null;
  documentContent: string;
  isAnalyzing: boolean;
  analysisResult: AnalysisResult | null;
}

export type AppAction =
  | { type: 'SET_VIEW'; payload: AppView }
  | { type: 'SELECT_MODE'; payload: WritingMode }
  | { type: 'UPDATE_CONTENT'; payload: string }
  | { type: 'START_ANALYSIS' }
  | { type: 'FINISH_ANALYSIS'; payload: AnalysisResult }
  | { type: 'RESET_WORKSPACE' };
