import React from 'react';
import { Project } from '../types';
import { Icon } from './Icon';

interface DashboardProps {
  projects: Project[];
  onNewProject: () => void;
  onOpenProject: (project: Project) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ projects, onNewProject, onOpenProject }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          My Projects
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Manage your initiatives, track progress, and access your AI-generated strategies.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Layers" size={40} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No projects yet</h2>
          <p className="text-gray-500 mb-8">Start your first project to unlock the power of Gemini 3 Pro project management.</p>
          <button 
            onClick={onNewProject}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-emerald-200 flex items-center justify-center"
          >
            <Icon name="Sparkles" className="mr-2" size={20} />
            Create New Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* New Project Card */}
          <div 
            onClick={onNewProject}
            className="group flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:border-emerald-500 hover:bg-emerald-50 cursor-pointer transition-all min-h-[280px]"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform text-gray-400 group-hover:text-emerald-600">
              <Icon name="Sparkles" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Create New Project</h3>
            <p className="text-sm text-gray-500 text-center">Start a new workflow</p>
          </div>

          {/* Existing Projects */}
          {projects.map((project) => (
            <div 
              key={project.id}
              onClick={() => onOpenProject(project)}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer overflow-hidden flex flex-col h-full relative group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
              
              <div className="p-8 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    <Icon name="Layers" size={24} />
                  </div>
                  <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                    {project.artifacts.length} / 10 Steps
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{project.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-6">
                  {project.description}
                </p>

                <div className="flex items-center text-xs text-gray-400">
                  <Icon name="Calendar" size={12} className="mr-1" />
                  Created {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              <div className="bg-gray-50 px-8 py-4 flex justify-between items-center border-t border-gray-100">
                <span className="text-sm font-medium text-gray-600 group-hover:text-emerald-600 transition-colors">Open Dashboard</span>
                <Icon name="ArrowRight" className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" size={18} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};