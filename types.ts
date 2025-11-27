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

export interface ProjectArtifact {
  id: string;
  promptId: number;
  title: string;
  content: string;
  timestamp: number;
}

export interface Project extends ProjectContext {
  id: string;
  createdAt: number;
  artifacts: ProjectArtifact[];
}

export enum AppState {
  DASHBOARD = 'DASHBOARD',
  PROJECT_SETUP = 'PROJECT_SETUP',
  PROJECT_VIEW = 'PROJECT_VIEW',
  FORM = 'FORM',
  RESULT = 'RESULT'
}