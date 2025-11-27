import { PromptTemplate, FormData } from '../types';

export const PROMPTS: PromptTemplate[] = [
  {
    id: 1,
    title: "Project Planning & Scheduling",
    iconName: "Calendar",
    description: "Create a detailed project plan with timelines, milestones, and deliverables.",
    placeholderContext: "e.g., We are struggling to coordinate between remote teams...",
    placeholderProject: "e.g., A new mobile application launch...",
    template: (data: FormData) => `I am ${data.context}. I'm managing a project with ${data.projectDescription}. I need to create a detailed project plan. Can you help outline a plan with a comprehensive timeline, including key milestones, tasks, and deliverables for the next 6 months? Please include suggested software tools and methodologies that could be used for planning and tracking. I want you to ${data.requirements || "provide a detailed breakdown in a table format"}.`
  },
  {
    id: 2,
    title: "Risk Management",
    iconName: "ShieldAlert",
    description: "Identify potential risks, their impact, and mitigation strategies.",
    placeholderContext: "e.g., We are using a new experimental technology...",
    placeholderProject: "e.g., A cloud infrastructure migration...",
    template: (data: FormData) => `I am ${data.context}. For my project on ${data.projectDescription}, I need to identify potential risks and develop a risk management plan. Can you list the possible risks we might face during the project lifecycle, including their likelihood and impact? Additionally, suggest mitigation strategies and how to monitor these risks effectively. I want you to ${data.requirements || "present this as a risk matrix"}.`
  },
  {
    id: 3,
    title: "Stakeholder Analysis",
    iconName: "Users",
    description: "Identify stakeholders and strategies for managing their engagement.",
    placeholderContext: "e.g., There is conflicting interest between marketing and engineering...",
    placeholderProject: "e.g., An internal CRM rollout...",
    template: (data: FormData) => `I am ${data.context}. I'm leading a project on ${data.projectDescription}. I need to conduct a stakeholder analysis to identify and prioritize stakeholders. Can you help create a stakeholder matrix that includes stakeholders' names (generic roles), roles, their level of interest and influence, and strategies for managing their engagement throughout the project? I want you to ${data.requirements || "categorize them by influence/interest"}.`
  },
  {
    id: 4,
    title: "Resource Allocation",
    iconName: "Layers",
    description: "Efficiently allocate personnel, budget, and equipment.",
    placeholderContext: "e.g., We have a limited budget and tight deadlines...",
    placeholderProject: "e.g., Construction of a community center...",
    template: (data: FormData) => `I am ${data.context}. I'm overseeing a project with the goal of ${data.projectDescription}. We need to allocate resources efficiently. Can you provide a detailed resource allocation plan, including personnel, budget, and equipment needs? Also, suggest how to handle potential resource conflicts and adjustments over the project timeline. I want you to ${data.requirements || "outline monthly resource requirements"}.`
  },
  {
    id: 5,
    title: "Communication Strategy",
    iconName: "MessageSquare",
    description: "Develop a plan for effective communication and updates.",
    placeholderContext: "e.g., Stakeholders feel out of the loop...",
    placeholderProject: "e.g., A company-wide rebranding...",
    template: (data: FormData) => `I am ${data.context}. For our project on ${data.projectDescription}, I need to develop an effective communication plan. Can you outline a plan that includes communication objectives, key messages, target audiences, communication methods, and frequency? Please also include a section on how to manage and update the plan as the project progresses. I want you to ${data.requirements || "create a communication schedule"}.`
  },
  {
    id: 6,
    title: "Agile Project Management",
    iconName: "RefreshCw",
    description: "Guide to setting up Agile frameworks, sprints, and stand-ups.",
    placeholderContext: "e.g., Our team is new to Agile...",
    placeholderProject: "e.g., SaaS product development...",
    template: (data: FormData) => `I am ${data.context}. Our team is transitioning to Agile methodologies for a project involving ${data.projectDescription}. Can you guide us through setting up an Agile framework, including how to create and manage product backlogs, sprint planning, and conducting daily stand-ups and retrospectives? Please suggest tools and techniques to facilitate this process. I want you to ${data.requirements || "provide a step-by-step transition guide"}.`
  },
  {
    id: 7,
    title: "Project Budgeting",
    iconName: "DollarSign",
    description: "Create comprehensive budget plans and cost estimates.",
    placeholderContext: "e.g., Costs have been creeping up unexpectedly...",
    placeholderProject: "e.g., Hosting a large corporate event...",
    template: (data: FormData) => `I am ${data.context}. I'm tasked with creating a budget for a project aimed at ${data.projectDescription}. Can you help develop a comprehensive budget plan, including cost estimates for labor, materials, and overheads? Also, provide tips on monitoring and controlling the budget to avoid overspending and managing changes to the budget. I want you to ${data.requirements || "break down costs by category"}.`
  },
  {
    id: 8,
    title: "Performance Oversight",
    iconName: "Activity",
    description: "Metrics and KPIs to track progress and corrective actions.",
    placeholderContext: "e.g., We are halfway through and unsure of true velocity...",
    placeholderProject: "e.g., Software integration project...",
    template: (data: FormData) => `I am ${data.context}. We are halfway through a project on ${data.projectDescription}. I need a system to monitor and control project performance. Can you recommend metrics and KPIs to track our progress? Also, provide methods to analyze project performance and strategies for corrective actions if we are not on track. I want you to ${data.requirements || "define a dashboard structure"}.`
  },
  {
    id: 9,
    title: "Project Closure",
    iconName: "CheckCircle",
    description: "Checklists and reports for formally closing a project.",
    placeholderContext: "e.g., We are wrapping up but don't want to miss admin tasks...",
    placeholderProject: "e.g., Annual marketing campaign...",
    template: (data: FormData) => `I am ${data.context}. We are closing out a project on ${data.projectDescription}. I need a system to formally close the project. Can you provide a comprehensive project closure checklist, a template for a final project report, and strategies for documenting lessons learned? I want you to ${data.requirements || "ensure all administrative and technical aspects are covered"}.`
  },
  {
    id: 10,
    title: "Team Management",
    iconName: "Smile",
    description: "Strategies for motivation, conflict resolution, and rewards.",
    placeholderContext: "e.g., Morale is low due to recent overtime...",
    placeholderProject: "e.g., High-pressure product launch...",
    template: (data: FormData) => `I am ${data.context}. As a project manager for ${data.projectDescription}, I need to keep my team motivated and productive. Can you provide strategies for managing team dynamics, resolving conflicts, and enhancing team collaboration? Additionally, suggest ways to recognize and reward team contributions to maintain high morale throughout the project. I want you to ${data.requirements || "suggest specific team-building activities"}.`
  }
];
