import React, { useState } from 'react';
import { PromptTemplate, FormData } from '../types';
import { Icon } from './Icon';

interface PromptFormProps {
  prompt: PromptTemplate;
  onSubmit: (data: FormData) => void;
  onBack: () => void;
  isLoading: boolean;
}

export const PromptForm: React.FC<PromptFormProps> = ({ prompt, onSubmit, onBack, isLoading }) => {
  const [formData, setFormData] = useState<FormData>({
    context: '',
    projectDescription: '',
    requirements: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-emerald-600 mb-8 transition-colors group"
      >
        <Icon name="ArrowLeft" className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-emerald-600 p-8 text-white flex items-center">
           <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mr-6">
                <Icon name={prompt.iconName} size={24} className="text-white" />
           </div>
           <div>
             <h2 className="text-2xl font-bold">{prompt.title}</h2>
             <p className="text-emerald-100 mt-1">Configure your AI assistant</p>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Context & Challenges
            </label>
            <p className="text-xs text-gray-500 mb-3">Describe the problem you are facing or the current situation.</p>
            <textarea
              required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
              rows={3}
              placeholder={prompt.placeholderContext}
              value={formData.context}
              onChange={(e) => setFormData({...formData, context: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Project Description
            </label>
            <p className="text-xs text-gray-500 mb-3">Briefly describe what the project is about.</p>
            <textarea
              required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
              rows={3}
              placeholder={prompt.placeholderProject}
              value={formData.projectDescription}
              onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Specific Output Requirements <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <p className="text-xs text-gray-500 mb-3">How do you want the result formatted? (e.g., table, list, executive summary)</p>
            <input
              type="text"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
              placeholder="e.g., Format as a checklist with deadlines"
              value={formData.requirements}
              onChange={(e) => setFormData({...formData, requirements: e.target.value})}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center transition-all ${
                isLoading 
                  ? 'bg-emerald-400 cursor-wait' 
                  : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-200 hover:-translate-y-1'
              }`}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" className="animate-spin mr-3" />
                  Generating Intelligence...
                </>
              ) : (
                <>
                  <Icon name="Sparkles" className="mr-2" />
                  Generate Strategy
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
