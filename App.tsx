import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { PromptForm } from './components/PromptForm';
import { ResultView } from './components/ResultView';
import { ProjectSetup } from './components/ProjectSetup';
import { WorkflowController } from './components/WorkflowController';
import { PromptTemplate, FormData, AppState, ProjectContext } from './types';
import { generateProjectAdvice } from './services/geminiService';
import { Icon } from './components/Icon';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.DASHBOARD);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptTemplate | null>(null);
  const [resultContent, setResultContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projectContext, setProjectContext] = useState<ProjectContext | null>(null);

  // --- DASHBOARD ACTIONS ---
  const handleSelectPrompt = (prompt: PromptTemplate) => {
    setSelectedPrompt(prompt);
    setAppState(AppState.FORM);
    window.scrollTo(0, 0);
  };

  const handleStartWorkflow = () => {
    setAppState(AppState.WORKFLOW_SETUP);
    window.scrollTo(0, 0);
  };

  // --- SINGLE PROMPT MODE ---
  const handleFormSubmit = async (data: FormData) => {
    if (!selectedPrompt) return;

    setIsLoading(true);
    const finalPrompt = selectedPrompt.template(data);
    
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
    setProjectContext(null); // Reset project context when exiting to dash
    window.scrollTo(0, 0);
  };

  const handleRetry = () => {
    setAppState(AppState.FORM);
    setResultContent('');
  };

  // --- WORKFLOW ACTIONS ---
  const handleProjectSetupComplete = (data: ProjectContext) => {
    setProjectContext(data);
    setAppState(AppState.WORKFLOW);
  };

  const handleWorkflowExit = () => {
    // Maybe show a "Project Completed" screen? For now go to dashboard.
    handleBackToDashboard();
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
        {/* DASHBOARD */}
        {appState === AppState.DASHBOARD && (
          <Dashboard 
            onSelectPrompt={handleSelectPrompt} 
            onStartWorkflow={handleStartWorkflow}
          />
        )}
        
        {/* SINGLE PROMPT FORM */}
        {appState === AppState.FORM && selectedPrompt && (
          <PromptForm 
            prompt={selectedPrompt} 
            onSubmit={handleFormSubmit}
            onBack={handleBackToDashboard}
            isLoading={isLoading}
          />
        )}

        {/* SINGLE PROMPT RESULT */}
        {appState === AppState.RESULT && selectedPrompt && (
          <ResultView 
            title={selectedPrompt.title}
            content={resultContent}
            onBack={handleBackToDashboard}
            onRetry={handleRetry}
          />
        )}

        {/* WORKFLOW SETUP */}
        {appState === AppState.WORKFLOW_SETUP && (
          <ProjectSetup 
            onNext={handleProjectSetupComplete} 
            onCancel={handleBackToDashboard} 
          />
        )}

        {/* WORKFLOW CONTROLLER */}
        {appState === AppState.WORKFLOW && projectContext && (
           <WorkflowController 
             projectContext={projectContext}
             onExit={handleWorkflowExit}
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