import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppView } from './types';
import Dashboard from './components/Dashboard';
import Workspace from './components/Workspace';

const Main: React.FC = () => {
  const { state } = useApp();

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#c3e4ff] via-[#e5d4ff] to-[#fbcfe8] overflow-hidden relative">
      
      {/* Abstract Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-300/30 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-300/30 blur-3xl animate-pulse delay-1000"></div>

      {/* MacOS Window Container */}
      <div className="relative w-[95vw] h-[90vh] md:w-[90vw] md:h-[85vh] bg-white/40 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 flex flex-col overflow-hidden transition-all duration-300">
        
        {/* Title Bar */}
        <div className="h-10 bg-white/30 border-b border-white/20 flex items-center px-4 space-x-2 flex-shrink-0 select-none z-50">
          <div className="flex space-x-2 group">
            <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/30 shadow-sm group-hover:bg-red-500 transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/30 shadow-sm group-hover:bg-yellow-500 transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/30 shadow-sm group-hover:bg-green-500 transition-colors"></div>
          </div>
          <div className="flex-1 text-center text-xs font-medium text-gray-500/80 pointer-events-none">
            Lumina AI Writer {state.selectedMode ? `- ${state.selectedMode.title}` : ''}
          </div>
          <div className="w-10"></div> {/* Spacer for symmetry */}
        </div>

        {/* Content Area */}
        <div className="flex-1 relative overflow-hidden">
          {state.currentView === AppView.DASHBOARD && <Dashboard />}
          {state.currentView === AppView.WORKSPACE && <Workspace />}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
};

export default App;
