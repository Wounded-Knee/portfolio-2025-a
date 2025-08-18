export interface Experience {
  title: string;
  clientId: string;
  period: string;
  description: string;
  technologies: string[];
  remote: boolean;
  location: string;
}

export interface Technology {
  id: string;
  name: string;
  logo: string;
  url: string;
  level: number;
}

export interface Client {
  id: string;
  name: string;
  type: string;
  industry: string;
  url: string | null;
  logo: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  credentialId: string;
  logo: string;
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
