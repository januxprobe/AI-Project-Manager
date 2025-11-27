import React, { useState } from 'react';
import { ProjectContext, PromptTemplate, FormData } from '../types';
import { PROMPTS } from '../data/prompts';
import { PromptForm } from './PromptForm';
import { ResultView } from './ResultView';
import { Icon } from './Icon';
import { generateProjectAdvice } from '../services/geminiService';

interface WorkflowControllerProps {
  projectContext: ProjectContext;
  onExit: () => void;
}

// Map the 7 steps to prompt IDs
const STEPS = [
  { id: 1, title: "Planning", promptIds: [1] },
  { id: 2, title: "Risk", promptIds: [2] },
  { id: 3, title: "Stakeholders", promptIds: [3] },
  { id: 4, title: "Resourcing", promptIds: [4, 7] }, // Resource Allocation & Budgeting
  { id: 5, title: "Methodology", promptIds: [6, 5] }, // Agile OR Communication
  { id: 6, title: "Oversight", promptIds: [8] },
  { id: 7, title: "Closure", promptIds: [9, 10] }, // Closure & Team
];

export const WorkflowController: React.FC<WorkflowControllerProps> = ({ projectContext, onExit }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activePromptId, setActivePromptId] = useState<number | null>(null);
  const [viewState, setViewState] = useState<'SELECT' | 'FORM' | 'RESULT'>('SELECT');
  const [resultContent, setResultContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Initialize view state based on step type
  // If single prompt, go straight to form. If multiple, show select.
  React.useEffect(() => {
    const step = STEPS[currentStepIndex];
    if (step.promptIds.length === 1) {
       setActivePromptId(step.promptIds[0]);
       setViewState('FORM');
    } else {
       setViewState('SELECT');
       setActivePromptId(null);
    }
  }, [currentStepIndex]);

  const currentStep = STEPS[currentStepIndex];

  const handlePromptSelect = (id: number) => {
    setActivePromptId(id);
    setViewState('FORM');
  };

  const handleFormSubmit = async (data: FormData) => {
    if (!activePromptId) return;
    const promptTemplate = PROMPTS.find(p => p.id === activePromptId);
    if (!promptTemplate) return;

    setIsLoading(true);
    const finalPrompt = promptTemplate.template(data);
    const response = await generateProjectAdvice(finalPrompt);
    setResultContent(response);
    setIsLoading(false);
    setViewState('RESULT');
    window.scrollTo(0, 0);
  };

  const handleNextStep = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setResultContent('');
    } else {
      // Completed
      onExit();
    }
  };

  const handleBackToSelect = () => {
    const step = STEPS[currentStepIndex];
    if (step.promptIds.length > 1) {
      setViewState('SELECT');
    } else {
      // If it was a single prompt step, back means previous step or exit
      if (currentStepIndex > 0) {
        setCurrentStepIndex(prev => prev - 1);
      } else {
        onExit();
      }
    }
    setResultContent('');
  };

  const activePrompt = activePromptId ? PROMPTS.find(p => p.id === activePromptId) : null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Workflow Progress Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                    Step {currentStepIndex + 1} of {STEPS.length}: {currentStep.title}
                </span>
                <span className="text-xs text-gray-400 font-medium">Project: {projectContext.name}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-500 ease-in-out" 
                    style={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
                />
            </div>
        </div>
      </div>

      <div className="flex-grow bg-gray-50">
        {/* VIEW: SELECTION (For steps with multiple options) */}
        {viewState === 'SELECT' && (
          <div className="max-w-4xl mx-auto px-4 py-12">
             <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose a Module</h2>
                <p className="text-gray-600">Select an action to perform for the {currentStep.title} phase.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentStep.promptIds.map(id => {
                    const p = PROMPTS.find(prompt => prompt.id === id);
                    if(!p) return null;
                    return (
                        <div 
                            key={id}
                            onClick={() => handlePromptSelect(id)}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-emerald-500 hover:shadow-lg cursor-pointer transition-all group"
                        >
                             <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <Icon name={p.iconName} size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{p.title}</h3>
                            <p className="text-gray-600">{p.description}</p>
                        </div>
                    );
                })}
             </div>

             <div className="mt-12 flex justify-end">
                {/* Allow skipping a step if needed? For now, user must pick one to proceed or we add a skip button */}
                <button 
                    onClick={handleNextStep}
                    className="text-gray-500 hover:text-gray-900 font-medium flex items-center px-4 py-2"
                >
                    Skip this Step <Icon name="ArrowRight" className="ml-2" size={16} />
                </button>
             </div>
          </div>
        )}

        {/* VIEW: FORM */}
        {viewState === 'FORM' && activePrompt && (
          <PromptForm 
             prompt={activePrompt}
             isLoading={isLoading}
             onSubmit={handleFormSubmit}
             onBack={handleBackToSelect}
             initialData={{
                 projectDescription: projectContext.description,
                 context: projectContext.context
             }}
             isWorkflow={true}
          />
        )}

        {/* VIEW: RESULT */}
        {viewState === 'RESULT' && activePrompt && (
          <ResultView 
             title={activePrompt.title}
             content={resultContent}
             onBack={() => setViewState('FORM')} // Allow refining
             onRetry={() => setViewState('FORM')}
             onNextStep={currentStep.promptIds.length > 1 ? handleBackToSelect : handleNextStep}
             // Logic: If multiple options exist in this step, Next Step goes back to select so user can run the other one. 
             // OR we can make the "Next Step" button in ResultView specifically say "Finish Step" or "Run Next Module".
             // Simplified: If step has multiple, user likely wants to run the other. But let's just use the logic:
             // If multiple, 'Next' goes back to select (where they can choose the other or click Skip/Next). 
             // Actually, let's just make onNextStep handle the logic.
          />
        )}
      </div>
    </div>
  );
};