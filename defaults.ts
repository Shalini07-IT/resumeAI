import { ResumeProfile } from '../types/resume';

export function createEmptyResume(): ResumeProfile {
  return {
    id: crypto.randomUUID(),
    version: 1,
    lastModified: new Date().toISOString(),
    personal: {
      fullName: '',
      professionalTitle: '',
      email: '',
      phone: '',
      location: '',
      linkedinUrl: '',
      githubUrl: '',
      portfolioUrl: '',
    },
    summary: '',
    experience: [],
    projects: [],
    education: [],
    skills: {
      languages: [],
      frameworks: [],
      databases: [],
      tools: [],
      cloud: [],
      hardware: [],
    },
    sectionOrder: ['summary', 'experience', 'projects', 'education', 'skills'],
  };
}

export const SAMPLE_RESUME: ResumeProfile = {
  id: 'sample-001',
  version: 1,
  lastModified: new Date().toISOString(),
  personal: {
    fullName: 'Alex Chen',
    professionalTitle: 'Senior Full-Stack Engineer',
    email: 'alex.chen@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedinUrl: 'https://linkedin.com/in/alexchen',
    githubUrl: 'https://github.com/alexchen',
    portfolioUrl: 'https://alexchen.dev',
  },
  summary: 'Results-driven Full-Stack Engineer with 6+ years of experience designing and deploying scalable web applications serving 1M+ users. Spearheaded migration to microservices architecture reducing system latency by 40%. Proven track record of delivering high-impact features that increased revenue by 25% and improved team velocity by 30%.',
  experience: [
    {
      id: crypto.randomUUID(),
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: '',
      isCurrent: true,
      accomplishments: [
        'Architected and implemented a real-time data pipeline processing 500K events/day, reducing ingestion latency by 60%',
        'Led a cross-functional team of 5 engineers to deliver a new payment gateway, increasing transaction throughput by 35%',
        'Optimized core API endpoints reducing average response time from 800ms to 120ms serving 2M monthly active users',
      ],
    },
    {
      id: crypto.randomUUID(),
      company: 'StartupXYZ',
      position: 'Full-Stack Developer',
      location: 'Remote',
      startDate: '2019-06',
      endDate: '2021-02',
      isCurrent: false,
      accomplishments: [
        'Developed and launched 3 customer-facing features that boosted user retention by 22%',
        'Implemented automated CI/CD pipeline reducing deployment time from 2 hours to 15 minutes',
        'Redesigned database schema and added indexing strategies improving query performance by 45%',
      ],
    },
  ],
  projects: [
    {
      id: crypto.randomUUID(),
      projectName: 'CloudDeploy CLI',
      technologies: ['Go', 'Docker', 'Kubernetes', 'AWS'],
      repositoryUrl: 'https://github.com/alexchen/cloudeploy',
      liveUrl: '',
      descriptions: [
        'Engineered a CLI tool automating multi-cloud deployments, reducing manual configuration by 80%',
        'Achieved 500+ GitHub stars and 200+ active weekly users within 3 months of launch',
      ],
    },
  ],
  education: [
    {
      id: crypto.randomUUID(),
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      major: 'Computer Science',
      graduationYear: '2019',
      gpa: '3.8',
    },
  ],
  skills: {
    languages: ['TypeScript', 'Python', 'Go', 'Rust', 'SQL'],
    frameworks: ['React', 'Node.js', 'FastAPI', 'Next.js', 'GraphQL'],
    databases: ['PostgreSQL', 'Redis', 'MongoDB', 'Elasticsearch'],
    tools: ['Docker', 'Kubernetes', 'Terraform', 'Git', 'Prometheus'],
    cloud: ['AWS', 'GCP', 'Azure', 'Cloudflare'],
    hardware: [],
  },
  sectionOrder: ['summary', 'experience', 'projects', 'education', 'skills'],
};
