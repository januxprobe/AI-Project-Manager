import React, { useState } from 'react';
import { ProjectContext } from '../types';
import { Icon } from './Icon';

interface ProjectSetupProps {
  onNext: (data: ProjectContext) => void;
  onCancel: () => void;
}

export const ProjectSetup: React.FC<ProjectSetupProps> = ({ onNext, onCancel }) => {
  const [data, setData] = useState<ProjectContext>({
    name: '',
    description: '',
    context: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(data);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <button 
        onClick={onCancel}
        className="flex items-center text-gray-500 hover:text-emerald-600 mb-8 transition-colors group"
      >
        <Icon name="ArrowLeft" className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-emerald-900 p-8 text-white">
          <div className="flex items-center space-x-4 mb-4">
             <div className="w-12 h-12 bg-emerald-700/50 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Icon name="Layers" size={24} className="text-emerald-300" />
             </div>
             <h2 className="text-2xl font-bold">New Project Setup</h2>
          </div>
          <p className="text-emerald-200">
            Define your project once, and we'll guide you through the entire management lifecycle using Gemini 3 Pro.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Project Name
            </label>
            <input
              required
              type="text"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
              placeholder="e.g. Website Redesign 2024"
              value={data.name}
              onChange={(e) => setData({...data, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Project Description
            </label>
            <p className="text-xs text-gray-500 mb-3">Briefly describe the goal and scope of this project.</p>
            <textarea
              required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
              rows={3}
              placeholder="e.g. Migrating our legacy CRM to a cloud-based solution to improve sales efficiency."
              value={data.description}
              onChange={(e) => setData({...data, description: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Context & Challenges
            </label>
            <p className="text-xs text-gray-500 mb-3">What are the current constraints, risks, or team situation?</p>
            <textarea
              required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
              rows={3}
              placeholder="e.g. Timeline is tight (3 months), budget is fixed, and the team is new to this tech stack."
              value={data.context}
              onChange={(e) => setData({...data, context: e.target.value})}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-200 hover:-translate-y-1 transition-all flex items-center justify-center"
            >
              Start Workflow
              <Icon name="ArrowRight" className="ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};