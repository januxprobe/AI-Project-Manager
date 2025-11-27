import React from 'react';
import { Icon } from './Icon';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center mr-3 shadow-lg">
            <span className="text-white font-bold text-xl">AI</span>
          </div>
          <span className="text-2xl font-bold text-gray-900 tracking-tight">Central</span>
        </div>
        <button 
          onClick={onGetStarted}
          className="text-gray-600 font-medium hover:text-emerald-600 transition-colors"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-24 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 mb-8 shadow-sm">
            <Icon name="Sparkles" size={16} className="text-emerald-600 mr-2" />
            <span className="text-sm font-semibold text-emerald-800 tracking-wide uppercase">Powered by Gemini 3 Pro</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
            Master Projects using <br />
            <span className="bg-gradient-to-r from-emerald-500 to-blue-600 text-transparent bg-clip-text">AI Superpowers</span>
          </h1>
          
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop struggling with spreadsheets. Use our 10 specialized AI agents to generate plans, risk assessments, and budgets in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold text-lg rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center"
            >
              Start Your First Project
              <Icon name="ArrowRight" className="ml-2" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-100 hover:border-gray-300 text-gray-700 font-bold text-lg rounded-xl transition-all flex items-center justify-center">
              View Demo
            </button>
          </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none -z-0 opacity-40">
           <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
           <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
           <div className="absolute -bottom-32 left-1/3 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Everything you need to deliver</h2>
            <p className="mt-4 text-gray-500">From kickoff to closure, we have an AI agent for that.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="Rocket" 
              title="Instant Planning" 
              description="Generate comprehensive project plans, timelines, and milestones from a simple description." 
            />
            <FeatureCard 
              icon="ShieldAlert" 
              title="Risk Radar" 
              description="Identify hidden risks and generate mitigation strategies before they become problems." 
            />
            <FeatureCard 
              icon="Users" 
              title="Stakeholder Magic" 
              description="Create stakeholder matrices and engagement plans to keep everyone aligned." 
            />
            <FeatureCard 
              icon="DollarSign" 
              title="Smart Budgeting" 
              description="Estimate costs, labor, and overheads with precision using historical data analysis." 
            />
            <FeatureCard 
              icon="Zap" 
              title="Agile Transformation" 
              description="Get step-by-step guides to transition your team to Agile sprints and stand-ups." 
            />
            <FeatureCard 
              icon="CheckCircle" 
              title="Perfect Closure" 
              description="Automate your project closure reports, checklists, and lessons learned documents." 
            />
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-6">How AI Central works</h2>
                <div className="space-y-8">
                  <Step number="01" title="Define Context" description="Tell us about your project, team, and challenges once." />
                  <Step number="02" title="Select Module" description="Choose from 10 specialized modules like Risk, Budget, or Planning." />
                  <Step number="03" title="Get Strategy" description="Receive detailed, actionable artifacts generated by Gemini 3 Pro." />
                </div>
              </div>
              <div className="bg-gray-900 rounded-3xl p-8 shadow-2xl relative rotate-2 hover:rotate-0 transition-all duration-500">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-t-3xl"></div>
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-32 bg-gray-800 rounded-xl border border-gray-700 p-4 mt-6">
                       <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                            <Icon name="Sparkles" size={16} className="text-emerald-400" />
                          </div>
                          <div className="space-y-2 flex-1">
                             <div className="h-3 bg-gray-600 rounded w-full"></div>
                             <div className="h-3 bg-gray-600 rounded w-5/6"></div>
                             <div className="h-3 bg-gray-600 rounded w-4/6"></div>
                          </div>
                       </div>
                    </div>
                  </div>
              </div>
           </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-200">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-400 font-medium">© {new Date().getFullYear()} AI Central. Master your projects.</p>
         </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: string, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
      <Icon name={icon} size={24} />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{description}</p>
  </div>
);

const Step = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="flex items-start">
    <span className="text-4xl font-black text-gray-200 mr-6">{number}</span>
    <div>
      <h4 className="text-lg font-bold text-gray-900 mb-1">{title}</h4>
      <p className="text-gray-500">{description}</p>
    </div>
  </div>
);
