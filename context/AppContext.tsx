import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction, AppView, WritingMode } from '../types';

const initialState: AppState = {
  currentView: AppView.DASHBOARD,
  selectedMode: null,
  documentContent: '',
  isAnalyzing: false,
  analysisResult: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    case 'SELECT_MODE':
      return { 
        ...state, 
        selectedMode: action.payload, 
        currentView: AppView.WORKSPACE,
        documentContent: '', // Reset content on new mode
        analysisResult: null 
      };
    case 'UPDATE_CONTENT':
      return { ...state, documentContent: action.payload };
    case 'START_ANALYSIS':
      return { ...state, isAnalyzing: true };
    case 'FINISH_ANALYSIS':
      return { ...state, isAnalyzing: false, analysisResult: action.payload };
    case 'RESET_WORKSPACE':
      return { 
        ...state, 
        currentView: AppView.DASHBOARD, 
        selectedMode: null, 
        analysisResult: null 
      };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
