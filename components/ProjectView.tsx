import React from 'react';
import { Project, ProjectArtifact, PromptTemplate } from '../types';
import { PROMPTS } from '../data/prompts';
import { Icon } from './Icon';

interface ProjectViewProps {
  project: Project;
  onBack: () => void;
  onSelectPrompt: (prompt: PromptTemplate) => void;
  onViewArtifact: (artifact: ProjectArtifact) => void;
}

export const ProjectView: React.FC<ProjectViewProps> = ({ project, onBack, onSelectPrompt, onViewArtifact }) => {
  // Determine completion status
  const completedPromptIds = new Set(project.artifacts.map(a => a.promptId));
  const nextStep = PROMPTS.find(p => !completedPromptIds.has(p.id));
  const progress = Math.round((completedPromptIds.size / PROMPTS.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-emerald-600 mb-6 transition-colors"
      >
        <Icon name="ArrowLeft" className="mr-2" size={20} />
        Back to Projects
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
            <p className="text-gray-600 max-w-2xl">{project.description}</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 min-w-[200px]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-500">Project Progress</span>
              <span className="text-sm font-bold text-emerald-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Workflow Grid */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Recommendation Card */}
          {nextStep && (
            <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Icon name="Sparkles" size={150} />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center bg-emerald-500/30 text-emerald-100 rounded-full px-3 py-1 text-xs font-bold mb-4 border border-emerald-500/30">
                  <Icon name="Activity" size={12} className="mr-2" />
                  Recommended Next Step
                </div>
                <h2 className="text-2xl font-bold mb-2">{nextStep.title}</h2>
                <p className="text-emerald-100 mb-6 max-w-lg">{nextStep.description}</p>
                <button 
                  onClick={() => onSelectPrompt(nextStep)}
                  className="bg-white text-emerald-900 font-bold py-3 px-6 rounded-xl hover:bg-emerald-50 transition-colors flex items-center shadow-lg"
                >
                  Start This Step
                  <Icon name="ArrowRight" className="ml-2" size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Steps Grid */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Project Roadmap</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROMPTS.map((prompt) => {
                const isCompleted = completedPromptIds.has(prompt.id);
                const isNext = nextStep?.id === prompt.id;
                
                return (
                  <div 
                    key={prompt.id}
                    onClick={() => {
                        if (isCompleted) {
                           // Find artifact
                           const artifact = project.artifacts.find(a => a.promptId === prompt.id);
                           if (artifact) onViewArtifact(artifact);
                        } else {
                           onSelectPrompt(prompt);
                        }
                    }}
                    className={`
                      relative p-6 rounded-xl border transition-all cursor-pointer flex items-start
                      ${isCompleted 
                        ? 'bg-emerald-50 border-emerald-100 hover:border-emerald-300' 
                        : isNext 
                          ? 'bg-white border-emerald-500 shadow-md ring-1 ring-emerald-500' 
                          : 'bg-white border-gray-100 hover:border-gray-300'
                      }
                    `}
                  >
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center mr-4 shrink-0
                      ${isCompleted ? 'bg-emerald-200 text-emerald-700' : isNext ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}
                    `}>
                      {isCompleted ? <Icon name="CheckCircle" size={20} /> : <Icon name={prompt.iconName} size={20} />}
                    </div>
                    
                    <div>
                      <h4 className={`font-bold mb-1 ${isCompleted ? 'text-emerald-900' : 'text-gray-900'}`}>
                        {prompt.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2">{prompt.description}</p>
                      
                      {isCompleted && (
                        <span className="inline-block mt-2 text-xs font-semibold text-emerald-600">
                          View Result &rarr;
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar / Recent Activity */}
        <div className="space-y-6">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Project Context</h3>
              <div className="text-sm text-gray-600 space-y-4">
                <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Context</span>
                    <p className="bg-gray-50 p-3 rounded-lg border border-gray-100">{project.context}</p>
                </div>
              </div>
           </div>

           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Saved Artifacts</h3>
              {project.artifacts.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">No artifacts generated yet.</p>
              ) : (
                <div className="space-y-3">
                  {project.artifacts.sort((a,b) => b.timestamp - a.timestamp).map(artifact => (
                    <div 
                      key={artifact.id}
                      onClick={() => onViewArtifact(artifact)}
                      className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group border border-transparent hover:border-gray-100"
                    >
                      <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-md flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                        <Icon name="Layers" size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{artifact.title}</h4>
                        <p className="text-xs text-gray-400">
                          {new Date(artifact.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <Icon name="ArrowRight" size={14} className="text-gray-300 group-hover:text-gray-600" />
                    </div>
                  ))}
                </div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
};