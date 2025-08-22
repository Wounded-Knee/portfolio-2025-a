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
