import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { PromptForm } from './components/PromptForm';
import { ResultView } from './components/ResultView';
import { ProjectSetup } from './components/ProjectSetup';
import { ProjectView } from './components/ProjectView';
import { PromptTemplate, FormData, AppState, ProjectContext, Project, ProjectArtifact } from './types';
import { generateProjectAdvice } from './services/geminiService';
import { Icon } from './components/Icon';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.DASHBOARD);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptTemplate | null>(null);
  const [resultContent, setResultContent] = useState<string>('');
  const [activeArtifact, setActiveArtifact] = useState<ProjectArtifact | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // --- NAVIGATION HELPERS ---
  const goDashboard = () => {
    setAppState(AppState.DASHBOARD);
    setActiveProject(null);
    setSelectedPrompt(null);
    setResultContent('');
    setActiveArtifact(null);
    window.scrollTo(0, 0);
  };

  const goProjectView = (project: Project) => {
    setActiveProject(project);
    setAppState(AppState.PROJECT_VIEW);
    setSelectedPrompt(null);
    setResultContent('');
    setActiveArtifact(null);
    window.scrollTo(0, 0);
  };

  // --- PROJECT MANAGEMENT ---
  const handleNewProject = () => {
    setAppState(AppState.PROJECT_SETUP);
    window.scrollTo(0, 0);
  };

  const handleProjectSetupComplete = (data: ProjectContext) => {
    const newProject: Project = {
      ...data,
      id: Date.now().toString(),
      createdAt: Date.now(),
      artifacts: []
    };
    setProjects(prev => [newProject, ...prev]);
    goProjectView(newProject);
  };

  // --- PROMPT EXECUTION ---
  const handleSelectPrompt = (prompt: PromptTemplate) => {
    setSelectedPrompt(prompt);
    setAppState(AppState.FORM);
    window.scrollTo(0, 0);
  };

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

  // --- ARTIFACT SAVING & VIEWING ---
  const handleSaveResult = (content: string) => {
    if (!activeProject || !selectedPrompt) return;

    const newArtifact: ProjectArtifact = {
      id: Date.now().toString(),
      promptId: selectedPrompt.id,
      title: selectedPrompt.title,
      content: content,
      timestamp: Date.now()
    };

    const updatedProject = {
      ...activeProject,
      artifacts: [...activeProject.artifacts.filter(a => a.promptId !== selectedPrompt.id), newArtifact] // Replace existing if any for this step
    };

    // Update state
    setProjects(prev => prev.map(p => p.id === activeProject.id ? updatedProject : p));
    setActiveProject(updatedProject);
    
    // Go back to project view
    goProjectView(updatedProject);
  };

  const handleViewArtifact = (artifact: ProjectArtifact) => {
    setActiveArtifact(artifact);
    setResultContent(artifact.content);
    setAppState(AppState.RESULT);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={goDashboard}>
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Central</span>
          </div>
          <div className="text-sm font-medium text-gray-500 flex items-center">
             {activeProject && (
               <span className="mr-4 hidden md:block px-3 py-1 bg-gray-100 rounded-full text-gray-600 border border-gray-200">
                  Current: {activeProject.name}
               </span>
             )}
            <span className="hidden sm:inline mr-2">Powered by</span>
            <span className="bg-gradient-to-r from-blue-500 to-emerald-500 text-transparent bg-clip-text font-bold">Gemini 3 Pro</span>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* DASHBOARD: LIST PROJECTS */}
        {appState === AppState.DASHBOARD && (
          <Dashboard 
            projects={projects}
            onNewProject={handleNewProject}
            onOpenProject={goProjectView}
          />
        )}
        
        {/* CREATE NEW PROJECT */}
        {appState === AppState.PROJECT_SETUP && (
          <ProjectSetup 
            onNext={handleProjectSetupComplete} 
            onCancel={goDashboard} 
          />
        )}

        {/* PROJECT DASHBOARD */}
        {appState === AppState.PROJECT_VIEW && activeProject && (
          <ProjectView 
            project={activeProject}
            onBack={goDashboard}
            onSelectPrompt={handleSelectPrompt}
            onViewArtifact={handleViewArtifact}
          />
        )}

        {/* PROMPT FORM */}
        {appState === AppState.FORM && selectedPrompt && activeProject && (
          <PromptForm 
            prompt={selectedPrompt} 
            onSubmit={handleFormSubmit}
            onBack={() => goProjectView(activeProject)}
            isLoading={isLoading}
            initialData={{
              projectDescription: activeProject.description,
              context: activeProject.context
            }}
            isWorkflow={true} // Use read-only context style
          />
        )}

        {/* RESULT VIEW (GENERATED OR SAVED) */}
        {appState === AppState.RESULT && (selectedPrompt || activeArtifact) && (
          <ResultView 
            title={selectedPrompt?.title || activeArtifact?.title || 'Result'}
            content={resultContent}
            onBack={() => activeProject && goProjectView(activeProject)}
            onRetry={activeArtifact ? undefined : () => setAppState(AppState.FORM)}
            onSave={activeArtifact ? undefined : handleSaveResult}
            isSavedMode={!!activeArtifact}
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