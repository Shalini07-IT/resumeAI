import { ResumeProfile, ResumeVersion } from '../types/resume';

const STORAGE_KEY = 'resume_builder_data';
const VERSIONS_KEY = 'resume_builder_versions';
const SETTINGS_KEY = 'resume_builder_settings';

export interface AppSettings {
  theme: string;
  layout: string;
  darkMode: boolean;
  activeResumeId: string | null;
}

export const defaultSettings: AppSettings = {
  theme: 'slate-pro',
  layout: 'ats-classic',
  darkMode: false,
  activeResumeId: null,
};

export function saveResume(resume: ResumeProfile): void {
  const updated = { ...resume, lastModified: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function loadResume(): ResumeProfile | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function saveVersion(resume: ResumeProfile, label?: string): void {
  const versions = loadVersions();
  const version: ResumeVersion = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    label: label || `Version ${versions.length + 1}`,
    data: { ...resume },
  };
  const updated = [version, ...versions].slice(0, 20);
  localStorage.setItem(VERSIONS_KEY, JSON.stringify(updated));
}

export function loadVersions(): ResumeVersion[] {
  const raw = localStorage.getItem(VERSIONS_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

export function deleteVersion(id: string): void {
  const versions = loadVersions().filter(v => v.id !== id);
  localStorage.setItem(VERSIONS_KEY, JSON.stringify(versions));
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadSettings(): AppSettings {
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) return defaultSettings;
  try { return { ...defaultSettings, ...JSON.parse(raw) }; } catch { return defaultSettings; }
}

export function exportResumeJSON(resume: ResumeProfile): void {
  const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${resume.personal.fullName || 'resume'}_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importResumeJSON(file: File): Promise<ResumeProfile> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        resolve(data);
      } catch {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

export function clearStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(VERSIONS_KEY);
}

export function calculateCompleteness(resume: ResumeProfile): number {
  let points = 0;
  const total = 20;
  const p = resume.personal;
  if (p.fullName) points++;
  if (p.professionalTitle) points++;
  if (p.email) points++;
  if (p.phone) points++;
  if (p.location) points++;
  if (p.linkedinUrl) points++;
  if (p.githubUrl) points++;
  if (resume.summary && resume.summary.split(' ').length >= 20) points++;
  if (resume.experience.length >= 1) points++;
  if (resume.experience.length >= 2) points++;
  if (resume.experience.some(e => e.accomplishments.filter(Boolean).length >= 3)) points++;
  if (resume.projects.length >= 1) points++;
  if (resume.education.length >= 1) points++;
  const s = resume.skills;
  if (s.languages.length >= 3) points++;
  if (s.frameworks.length >= 2) points++;
  if (s.tools.length >= 2) points++;
  if (s.databases.length >= 1) points++;
  if (s.cloud.length >= 1) points++;
  if (p.portfolioUrl || p.githubUrl) points++;
  if (resume.projects.some(p => p.technologies.length >= 2)) points++;
  return Math.round((points / total) * 100);
}
