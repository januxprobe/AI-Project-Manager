export interface PromptTemplate {
  id: number;
  title: string;
  iconName: string; // mapping to lucide-react icons
  description: string;
  template: (data: FormData) => string;
  placeholderContext: string;
  placeholderProject: string;
}

export interface FormData {
  projectDescription: string;
  context: string;
  requirements?: string;
}

export interface ProjectContext {
  name: string;
  description: string;
  context: string;
}

export enum AppState {
  DASHBOARD = 'DASHBOARD',
  FORM = 'FORM',
  RESULT = 'RESULT',
  WORKFLOW_SETUP = 'WORKFLOW_SETUP',
  WORKFLOW = 'WORKFLOW'
}