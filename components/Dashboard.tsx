import React from 'react';
import { PROMPTS } from '../data/prompts';
import { PromptTemplate } from '../types';
import { Icon } from './Icon';

interface DashboardProps {
  onSelectPrompt: (prompt: PromptTemplate) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectPrompt }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Master Projects with <span className="text-emerald-600">Gemini 3 Pro</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Leverage the power of advanced AI to handle planning, risks, budgets, and team management effortlessly. Select a module to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROMPTS.map((prompt) => (
          <div 
            key={prompt.id}
            onClick={() => onSelectPrompt(prompt)}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            
            <div className="p-8 flex-1">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                <Icon name={prompt.iconName} size={28} />
              </div>
              
              <div className="flex items-center mb-3">
                <span className="bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded mr-3">
                  #{prompt.id}
                </span>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {prompt.title}
                </h3>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                {prompt.description}
              </p>
            </div>
            
            <div className="bg-gray-50 px-8 py-4 flex justify-between items-center border-t border-gray-100">
              <span className="text-sm font-medium text-gray-500 group-hover:text-emerald-600 transition-colors">Start Module</span>
              <Icon name="ArrowRight" className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
