import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { PromptForm } from './components/PromptForm';
import { ResultView } from './components/ResultView';
import { PromptTemplate, FormData, AppState } from './types';
import { generateProjectAdvice } from './services/geminiService';
import { Icon } from './components/Icon';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.DASHBOARD);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptTemplate | null>(null);
  const [resultContent, setResultContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSelectPrompt = (prompt: PromptTemplate) => {
    setSelectedPrompt(prompt);
    setAppState(AppState.FORM);
    window.scrollTo(0, 0);
  };

  const handleFormSubmit = async (data: FormData) => {
    if (!selectedPrompt) return;

    setIsLoading(true);
    const finalPrompt = selectedPrompt.template(data);
    
    // Simulate navigation to result immediately while loading? 
    // No, better to show loading state on form then switch.
    
    const response = await generateProjectAdvice(finalPrompt);
    setResultContent(response);
    setIsLoading(false);
    setAppState(AppState.RESULT);
    window.scrollTo(0, 0);
  };

  const handleBackToDashboard = () => {
    setAppState(AppState.DASHBOARD);
    setSelectedPrompt(null);
    setResultContent('');
    window.scrollTo(0, 0);
  };

  const handleRetry = () => {
    setAppState(AppState.FORM);
    setResultContent('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={handleBackToDashboard}>
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Central</span>
          </div>
          <div className="text-sm font-medium text-gray-500 flex items-center">
            <span className="hidden sm:inline mr-2">Powered by</span>
            <span className="bg-gradient-to-r from-blue-500 to-emerald-500 text-transparent bg-clip-text font-bold">Gemini 3 Pro</span>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {appState === AppState.DASHBOARD && (
          <Dashboard onSelectPrompt={handleSelectPrompt} />
        )}
        
        {appState === AppState.FORM && selectedPrompt && (
          <PromptForm 
            prompt={selectedPrompt} 
            onSubmit={handleFormSubmit}
            onBack={handleBackToDashboard}
            isLoading={isLoading}
          />
        )}

        {appState === AppState.RESULT && selectedPrompt && (
          <ResultView 
            title={selectedPrompt.title}
            content={resultContent}
            onBack={handleBackToDashboard}
            onRetry={handleRetry}
          />
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} AI Central Project Manager. Not affiliated with OpenAI. Using Google Gemini API.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
