import { LogoObject } from '../utils/logo';

export interface Experience {
  title: string;
  clientId: string;
  period: string;
  description: string;
  technologies: string[];
  remote: boolean;
}

export interface CaseStudy {
  situation: string[];
  task: string[];
  action: string[];
  result: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string | null;
  category: string;
  clientId: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string | null;
  featured?: boolean;
  caseStudy?: CaseStudy;
}

export interface Technology {
  id: string;
  name: string;
  logo?: LogoObject;
  url: string;
  level: number;
}

export interface Client {
  id: string;
  name: string;
  type: string;
  industry: string;
  url: string | null;
  logo?: LogoObject;
  location: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  credentialId: string;
  logo?: LogoObject;
  url: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  date: string;
  photo: string;
  currentRole: string;
  currentCompany: string;
  relationship: string;
  testimony: string;
}

// Theme Color Morphing Types
export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  'card-foreground': string;
  popover: string;
  'popover-foreground': string;
  primary: string;
  'primary-foreground': string;
  secondary: string;
  'secondary-foreground': string;
  muted: string;
  'muted-foreground': string;
  accent: string;
  'accent-foreground': string;
  destructive: string;
  'destructive-foreground': string;
  border: string;
  input: string;
  ring: string;
  'focus-blue': string;
  'text-gray-600': string;
  'text-gray-400': string;
  'bg-gray-100': string;
  'bg-slate-800': string;
  'border-gray-300': string;
  'border-gray-600': string;
  'theme-color': string;
}

export type ThemeColorCallback = (colors: ThemeColors) => Partial<ThemeColors>;
