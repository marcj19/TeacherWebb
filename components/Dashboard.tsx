import React from 'react';
import { useApp } from '../context/AppContext';
import { WRITING_MODES } from '../constants';
import { GraduationCap, Briefcase, Feather, ArrowRight } from 'lucide-react';
import { WritingMode } from '../types';

const Dashboard: React.FC = () => {
  const { dispatch } = useApp();

  const handleSelect = (mode: WritingMode) => {
    dispatch({ type: 'SELECT_MODE', payload: mode });
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap': return <GraduationCap className="w-8 h-8 text-blue-500" />;
      case 'Briefcase': return <Briefcase className="w-8 h-8 text-purple-500" />;
      case 'Feather': return <Feather className="w-8 h-8 text-pink-500" />;
      default: return <Feather />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-800 mb-4 font-sans">
          Como posso ajudar você hoje?
        </h1>
        <p className="text-lg text-gray-500 font-light max-w-lg mx-auto">
          Selecione um modo de escrita para iniciar o assistente de IA otimizado para suas necessidades.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {WRITING_MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleSelect(mode)}
            className="group relative flex flex-col p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 shadow-lg hover:shadow-2xl hover:bg-white/60 transition-all duration-300 transform hover:-translate-y-1 text-left"
          >
            <div className="mb-6 p-4 rounded-2xl bg-white/50 shadow-sm w-fit group-hover:scale-110 transition-transform duration-300">
              {getIcon(mode.iconName)}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {mode.title}
            </h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              {mode.description}
            </p>
            <div className="mt-auto flex items-center text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors">
              Iniciar
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
