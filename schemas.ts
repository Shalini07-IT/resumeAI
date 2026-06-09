import { z } from 'zod';

export const personalDetailsSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  professionalTitle: z.string().min(1, 'Professional title is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  location: z.string().min(1, 'Location is required'),
  linkedinUrl: z.string().url('Invalid URL').or(z.string().length(0)).optional(),
  githubUrl: z.string().url('Invalid URL').or(z.string().length(0)).optional(),
  portfolioUrl: z.string().url('Invalid URL').or(z.string().length(0)).optional(),
});

export const workExperienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  location: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isCurrent: z.boolean(),
  accomplishments: z.array(z.string()),
});

export const projectSchema = z.object({
  id: z.string(),
  projectName: z.string().min(1, 'Project name is required'),
  technologies: z.array(z.string()),
  repositoryUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  descriptions: z.array(z.string()),
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  major: z.string().optional(),
  graduationYear: z.string().min(1, 'Graduation year is required'),
  gpa: z.string().optional(),
});

export const technicalSkillsSchema = z.object({
  languages: z.array(z.string()),
  frameworks: z.array(z.string()),
  databases: z.array(z.string()),
  tools: z.array(z.string()),
  cloud: z.array(z.string()),
  hardware: z.array(z.string()),
});

export const resumeProfileSchema = z.object({
  id: z.string(),
  version: z.number(),
  lastModified: z.string(),
  personal: personalDetailsSchema,
  summary: z.string(),
  experience: z.array(workExperienceSchema),
  projects: z.array(projectSchema),
  education: z.array(educationSchema),
  skills: technicalSkillsSchema,
  sectionOrder: z.array(z.enum(['summary', 'experience', 'projects', 'education', 'skills'])),
});
