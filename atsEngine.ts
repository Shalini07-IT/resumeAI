import { ResumeProfile, ATSResult, ATSBreakdown } from '../types/resume';
import { ALL_ACTION_VERBS } from '../data/guidance';

const SCORE_WEIGHTS = {
  contactInfo: 10,
  summary: 15,
  skills: 10,
  experience: 25,
  projects: 10,
  education: 10,
  actionVerbs: 8,
  quantifiedAchievements: 7,
  density: 3,
  formatting: 2,
};

function scoreContactInfo(resume: ResumeProfile): number {
  const p = resume.personal;
  let score = 0;
  if (p.fullName) score += 20;
  if (p.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) score += 20;
  if (p.phone) score += 15;
  if (p.location) score += 15;
  if (p.professionalTitle) score += 15;
  if (p.linkedinUrl) score += 8;
  if (p.githubUrl) score += 4;
  if (p.portfolioUrl) score += 3;
  return Math.min(100, score);
}

function scoreSummary(summary: string): number {
  if (!summary) return 0;
  const words = summary.trim().split(/\s+/).length;
  let score = 0;
  if (words >= 20) score += 30;
  if (words >= 40) score += 20;
  if (words <= 100) score += 20;
  const hasMetrics = /\d+/.test(summary);
  if (hasMetrics) score += 20;
  const hasActionVerb = ALL_ACTION_VERBS.some(v =>
    summary.toLowerCase().includes(v.toLowerCase())
  );
  if (hasActionVerb) score += 10;
  return Math.min(100, score);
}

function scoreSkills(resume: ResumeProfile): number {
  const s = resume.skills;
  const total = [
    s.languages, s.frameworks, s.databases, s.tools, s.cloud, s.hardware,
  ].flat().filter(Boolean).length;
  let score = 0;
  if (total >= 5) score += 30;
  if (total >= 10) score += 30;
  if (total >= 15) score += 20;
  const categoriesFilled = [s.languages, s.frameworks, s.databases, s.tools, s.cloud]
    .filter(arr => arr.length > 0).length;
  score += categoriesFilled * 4;
  return Math.min(100, score);
}

function scoreExperience(resume: ResumeProfile): number {
  if (!resume.experience.length) return 0;
  let score = 0;
  resume.experience.forEach(exp => {
    if (exp.company) score += 5;
    if (exp.position) score += 5;
    if (exp.startDate) score += 3;
    if (exp.accomplishments.filter(Boolean).length >= 2) score += 10;
    if (exp.accomplishments.filter(Boolean).length >= 3) score += 5;
  });
  if (resume.experience.length >= 2) score += 15;
  return Math.min(100, score);
}

function scoreProjects(resume: ResumeProfile): number {
  if (!resume.projects.length) return 30;
  let score = 30;
  resume.projects.forEach(proj => {
    if (proj.projectName) score += 10;
    if (proj.technologies.length >= 2) score += 10;
    if (proj.descriptions.filter(Boolean).length >= 1) score += 15;
    if (proj.repositoryUrl || proj.liveUrl) score += 5;
  });
  return Math.min(100, score);
}

function scoreEducation(resume: ResumeProfile): number {
  if (!resume.education.length) return 20;
  let score = 20;
  resume.education.forEach(edu => {
    if (edu.institution) score += 20;
    if (edu.degree) score += 20;
    if (edu.graduationYear) score += 15;
    if (edu.major) score += 10;
    if (edu.gpa) score += 5;
  });
  return Math.min(100, score);
}

function scoreActionVerbs(resume: ResumeProfile): number {
  const allText = [
    ...resume.experience.flatMap(e => e.accomplishments),
    ...resume.projects.flatMap(p => p.descriptions),
  ].join(' ');
  if (!allText) return 0;
  const found = ALL_ACTION_VERBS.filter(v =>
    allText.toLowerCase().includes(v.toLowerCase())
  );
  const uniqueCount = new Set(found).size;
  if (uniqueCount === 0) return 0;
  if (uniqueCount <= 2) return 30;
  if (uniqueCount <= 5) return 60;
  if (uniqueCount <= 8) return 80;
  return 100;
}

function scoreQuantifiedAchievements(resume: ResumeProfile): number {
  const allText = [
    resume.summary,
    ...resume.experience.flatMap(e => e.accomplishments),
    ...resume.projects.flatMap(p => p.descriptions),
  ].join(' ');
  const matches = allText.match(/\d+[%$K M+x]?/g) || [];
  if (matches.length === 0) return 0;
  if (matches.length <= 2) return 30;
  if (matches.length <= 5) return 60;
  if (matches.length <= 10) return 80;
  return 100;
}

function scoreDensity(resume: ResumeProfile): number {
  const wordCount = JSON.stringify(resume).split(/\s+/).length;
  if (wordCount < 100) return 20;
  if (wordCount < 300) return 50;
  if (wordCount < 600) return 80;
  if (wordCount < 1000) return 100;
  return 80;
}

function scoreFormatting(resume: ResumeProfile): number {
  let score = 100;
  if (!resume.sectionOrder.length) score -= 30;
  return score;
}

export function calculateATSScore(resume: ResumeProfile): ATSResult {
  const breakdown: ATSBreakdown = {
    contactInfo: scoreContactInfo(resume),
    summary: scoreSummary(resume.summary),
    skills: scoreSkills(resume),
    experience: scoreExperience(resume),
    projects: scoreProjects(resume),
    education: scoreEducation(resume),
    actionVerbs: scoreActionVerbs(resume),
    quantifiedAchievements: scoreQuantifiedAchievements(resume),
    density: scoreDensity(resume),
    formatting: scoreFormatting(resume),
  };

  const score = Math.round(
    Object.entries(breakdown).reduce((total, [key, value]) => {
      return total + (value / 100) * SCORE_WEIGHTS[key as keyof ATSBreakdown];
    }, 0)
  );

  const suggestions: string[] = [];
  const strengths: string[] = [];

  if (breakdown.contactInfo < 60) suggestions.push('Add missing contact information (LinkedIn, GitHub, portfolio)');
  else strengths.push('Contact information is complete');

  if (breakdown.summary < 60) suggestions.push('Strengthen your executive summary with metrics and action verbs (aim for 40-80 words)');
  else strengths.push('Executive summary is well-crafted');

  if (breakdown.actionVerbs < 60) suggestions.push('Use stronger action verbs: Spearheaded, Architected, Optimized, Automated, Accelerated');
  else strengths.push('Good use of action verbs throughout');

  if (breakdown.quantifiedAchievements < 60) suggestions.push('Quantify achievements with metrics (e.g., "Reduced load time by 40%", "Served 1M+ users")');
  else strengths.push('Achievements are well-quantified');

  if (breakdown.skills < 60) suggestions.push('Add more technical skills across all categories (Languages, Frameworks, Tools, Cloud)');
  else strengths.push('Technical skills section is comprehensive');

  if (breakdown.experience < 60) suggestions.push('Add more work experience entries with 3+ bullet points each');
  else strengths.push('Work experience is detailed');

  if (breakdown.projects < 60) suggestions.push('Add projects with technologies used and measurable impact');
  else strengths.push('Projects section showcases technical ability');

  if (breakdown.education < 60) suggestions.push('Complete your education section');

  if (breakdown.density < 50) suggestions.push('Add more content to improve resume density and completeness');

  return { score, breakdown, suggestions, strengths };
}
