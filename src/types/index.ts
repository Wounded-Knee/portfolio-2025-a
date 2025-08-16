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
  logo?: string;
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
