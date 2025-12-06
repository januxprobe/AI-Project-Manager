import React, { useState, useEffect, useRef } from 'react';
import { PromptTemplate, FormData } from '../types';
import { Icon } from './Icon';

interface PromptFormProps {
  prompt: PromptTemplate;
  onSubmit: (data: FormData) => void;
  onBack: () => void;
  isLoading: boolean;
  initialData?: Partial<FormData>;
  isWorkflow?: boolean;
}

export const PromptForm: React.FC<PromptFormProps> = ({ 
  prompt, 
  onSubmit, 
  onBack, 
  isLoading,
  initialData,
  isWorkflow = false
}) => {
  const [formData, setFormData] = useState<FormData>({
    context: '',
    projectDescription: '',
    requirements: '',
    ...initialData
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setFormData(prev => ({ ...prev, context: text }));
      }
    };
    reader.readAsText(file);
    // Reset file input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setFormData(prev => ({ ...prev, context: text }));
    } catch (err) {
      console.error("Failed to read clipboard:", err);
      // Fallback for browsers that block clipboard access without direct user gesture in some contexts
      alert("Please press Ctrl+V / Cmd+V to paste manually if the button doesn't work.");
    }
  };

  const isMeetingParser = prompt.id === 11;
  const contextLabel = isMeetingParser ? "Raw Meeting Notes" : "Context & Challenges";
  const contextDescription = isMeetingParser 
    ? "Paste the raw text from your meeting transcript or notes here." 
    : "Describe the problem you are facing or the current situation.";

  // Show input if it's the standard form OR if it's the meeting parser (even in workflow mode)
  const showContextInput = !isWorkflow || isMeetingParser;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-emerald-600 mb-8 transition-colors group"
      >
        <Icon name="ArrowLeft" className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
        {isWorkflow ? 'Back to Overview' : 'Back to Dashboard'}
      </button>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-emerald-600 p-8 text-white flex items-center">
           <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mr-6 shrink-0">
                <Icon name={prompt.iconName} size={24} className="text-white" />
           </div>
           <div>
             <h2 className="text-2xl font-bold">{prompt.title}</h2>
             <p className="text-emerald-100 mt-1">Configure your AI assistant</p>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* READ-ONLY SUMMARY for Workflow (except Meeting Parser) */}
          {isWorkflow && !isMeetingParser && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-sm text-emerald-800">
               <div className="font-bold mb-1">Project:</div>
               <p className="opacity-80 line-clamp-2">{formData.projectDescription}</p>
               <div className="font-bold mt-2 mb-1">Context Applied:</div>
               <p className="opacity-80 line-clamp-2">{formData.context}</p>
            </div>
          )}

          {/* PROJECT DESCRIPTION (Only if NOT workflow) */}
          {!isWorkflow && (
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
          )}

          {/* CONTEXT INPUT SECTION */}
          {showContextInput && (
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="block text-sm font-bold text-gray-700">
                    {contextLabel}
                  </label>
                  
                  {/* Toolbar */}
                  <div className="flex space-x-2">
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      className="hidden" 
                      accept=".txt,.md,.csv" 
                      onChange={handleFileUpload}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs flex items-center bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg transition-colors border border-gray-200"
                      title="Upload text file"
                    >
                      <Icon name="Upload" size={14} className="mr-1.5" />
                      Upload
                    </button>
                    <button
                      type="button"
                      onClick={handlePasteClipboard}
                      className="text-xs flex items-center bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg transition-colors border border-gray-200"
                      title="Paste from clipboard"
                    >
                      <Icon name="Clipboard" size={14} className="mr-1.5" />
                      Paste
                    </button>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mb-3">{contextDescription}</p>
                <textarea
                  required
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none font-mono text-sm"
                  rows={isMeetingParser ? 12 : 4}
                  placeholder={prompt.placeholderContext}
                  value={formData.context}
                  onChange={(e) => setFormData({...formData, context: e.target.value})}
                />
              </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Specific Output Requirements <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <p className="text-xs text-gray-500 mb-3">How do you want the result formatted? (e.g., table, list, executive summary)</p>
            <input
              type="text"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
              placeholder="e.g., Format as a checklist with deadlines"
              value={formData.requirements || ''}
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
                  Processing...
                </>
              ) : (
                <>
                  <Icon name="Sparkles" className="mr-2" />
                  {isMeetingParser ? "Process Notes" : "Generate Strategy"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};