export interface PersonalDetails {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  accomplishments: string[];
}

export interface Project {
  id: string;
  projectName: string;
  technologies: string[];
  repositoryUrl: string;
  liveUrl: string;
  descriptions: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  major: string;
  graduationYear: string;
  gpa: string;
}

export interface TechnicalSkills {
  languages: string[];
  frameworks: string[];
  databases: string[];
  tools: string[];
  cloud: string[];
  hardware: string[];
}

export interface ResumeProfile {
  id: string;
  version: number;
  lastModified: string;
  personal: PersonalDetails;
  summary: string;
  experience: WorkExperience[];
  projects: Project[];
  education: Education[];
  skills: TechnicalSkills;
  sectionOrder: SectionKey[];
}

export type SectionKey = 'summary' | 'experience' | 'projects' | 'education' | 'skills';

export interface ResumeVersion {
  id: string;
  timestamp: string;
  label: string;
  data: ResumeProfile;
}

export interface LayoutConfig {
  id: string;
  name: string;
  description: string;
  component: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  headingColor: string;
  bodyColor: string;
  accentColor: string;
  backgroundAccent: string;
  fontPairing: { heading: string; body: string };
  densityScale: number;
  borderStyle: string;
  badgeStyle: string;
}

export interface ATSResult {
  score: number;
  breakdown: ATSBreakdown;
  suggestions: string[];
  strengths: string[];
}

export interface ATSBreakdown {
  contactInfo: number;
  summary: number;
  skills: number;
  experience: number;
  projects: number;
  education: number;
  actionVerbs: number;
  quantifiedAchievements: number;
  density: number;
  formatting: number;
}
