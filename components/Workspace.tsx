import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { analyzeText } from '../services/geminiService';
import { 
  ChevronLeft, 
  LayoutTemplate, 
  Settings, 
  Sparkles, 
  Save, 
  Download,
  MoreHorizontal
} from 'lucide-react';

const Workspace: React.FC = () => {
  const { state, dispatch } = useApp();
  const [showInspector, setShowInspector] = useState(true);

  const handleBack = () => {
    dispatch({ type: 'RESET_WORKSPACE' });
  };

  const handleAnalyze = async () => {
    if (!state.selectedMode || !state.documentContent.trim()) return;

    dispatch({ type: 'START_ANALYSIS' });
    
    const result = await analyzeText(
      state.documentContent,
      state.selectedMode.systemPrompt
    );

    dispatch({ type: 'FINISH_ANALYSIS', payload: result });
    if (!showInspector) setShowInspector(true);
  };

  return (
    <div className="flex h-full w-full overflow-hidden animate-in slide-in-from-right-10 duration-500">
      
      {/* Sidebar - Finder Style */}
      <div className="w-16 md:w-64 bg-white/30 backdrop-blur-xl border-r border-white/20 flex flex-col justify-between py-6 flex-shrink-0 z-10">
        <div>
          <div className="px-6 mb-8 flex items-center space-x-2">
            <button 
              onClick={handleBack}
              className="p-2 -ml-2 rounded-lg hover:bg-black/5 text-gray-600 transition-colors flex items-center"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden md:inline ml-1 font-medium text-sm">Voltar</span>
            </button>
          </div>
          
          <div className="space-y-1 px-4">
            <div className="flex items-center px-3 py-2 bg-black/5 rounded-lg text-gray-800 cursor-default">
              <LayoutTemplate className="w-4 h-4 mr-3" />
              <span className="hidden md:inline text-sm font-medium">{state.selectedMode?.title}</span>
            </div>
            <div className="flex items-center px-3 py-2 text-gray-500 hover:bg-black/5 rounded-lg cursor-pointer transition-colors">
              <Save className="w-4 h-4 mr-3" />
              <span className="hidden md:inline text-sm font-medium">Rascunhos</span>
            </div>
          </div>
        </div>

        <div className="px-4">
          <button className="flex items-center px-3 py-2 text-gray-500 hover:bg-black/5 rounded-lg cursor-pointer transition-colors w-full">
            <Settings className="w-4 h-4 mr-3" />
            <span className="hidden md:inline text-sm font-medium">Ajustes</span>
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col relative bg-white/10">
        
        {/* Toolbar */}
        <div className="h-14 border-b border-white/20 flex items-center justify-between px-8 bg-white/20 backdrop-blur-sm">
          <div className="text-sm text-gray-500 font-medium">
            Sem título.txt
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-800 transition-colors">
              <Download className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setShowInspector(!showInspector)}
              className={`p-2 transition-colors ${showInspector ? 'text-blue-600 bg-blue-100/50 rounded-md' : 'text-gray-500 hover:text-gray-800'}`}
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Paper Container */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 flex justify-center no-scrollbar scroll-smooth">
          <div className="w-full max-w-3xl bg-white shadow-2xl min-h-[800px] rounded-sm p-12 md:p-16 relative transition-all duration-300 ease-in-out">
            <textarea
              value={state.documentContent}
              onChange={(e) => dispatch({ type: 'UPDATE_CONTENT', payload: e.target.value })}
              placeholder={state.selectedMode?.placeholder}
              className="w-full h-full resize-none outline-none border-none text-gray-800 font-serif text-lg leading-relaxed placeholder:text-gray-300 bg-transparent selection:bg-blue-100"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Floating Action Button (Mobile/Tablet friendly) */}
        <div className="absolute bottom-8 right-8 md:right-12">
          <button
            onClick={handleAnalyze}
            disabled={state.isAnalyzing || !state.documentContent}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-full shadow-lg backdrop-blur-md transition-all duration-300
              ${state.isAnalyzing 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-black/80 hover:bg-black text-white hover:shadow-xl hover:-translate-y-1'
              }
            `}
          >
            {state.isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Analisando...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Avaliar Texto</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Inspector Panel */}
      <div 
        className={`
          w-80 bg-white/40 backdrop-blur-2xl border-l border-white/30 flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] overflow-hidden flex flex-col
          ${showInspector ? 'mr-0 opacity-100' : '-mr-80 opacity-0'}
        `}
      >
        <div className="p-6 border-b border-white/20">
          <h3 className="font-semibold text-gray-800 flex items-center">
            <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
            Feedback IA
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          {!state.analysisResult && !state.isAnalyzing && (
            <div className="text-center text-gray-400 mt-10">
              <div className="bg-white/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MoreHorizontal className="w-6 h-6" />
              </div>
              <p className="text-sm">Escreva e clique em "Avaliar Texto" para receber feedback.</p>
            </div>
          )}

          {state.isAnalyzing && (
             <div className="space-y-4 animate-pulse">
               <div className="h-4 bg-gray-300/50 rounded w-3/4"></div>
               <div className="h-20 bg-gray-300/50 rounded"></div>
               <div className="h-4 bg-gray-300/50 rounded w-1/2"></div>
             </div>
          )}

          {state.analysisResult && !state.isAnalyzing && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Score Card */}
              <div className="bg-white/50 rounded-xl p-4 shadow-sm border border-white/40">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nota Geral</span>
                <div className="flex items-end mt-1">
                  <span className="text-4xl font-bold text-gray-900">{state.analysisResult.score}</span>
                  <span className="text-sm text-gray-500 mb-1 ml-1">/ 1000</span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Resumo</h4>
                <p className="text-sm text-gray-600 leading-relaxed bg-white/30 p-3 rounded-lg">
                  {state.analysisResult.summary}
                </p>
              </div>

              {/* Suggestions */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Sugestões de Melhoria</h4>
                <ul className="space-y-2">
                  {state.analysisResult.suggestions.map((sug, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      {sug}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Strengths */}
              <div>
                <h4 className="text-sm font-semibold text-green-700 mb-2">Pontos Fortes</h4>
                 <div className="flex flex-wrap gap-2">
                  {state.analysisResult.strengths.map((str, i) => (
                    <span key={i} className="px-2 py-1 bg-green-100/50 text-green-800 text-xs rounded-md border border-green-200/50">
                      {str}
                    </span>
                  ))}
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workspace;
