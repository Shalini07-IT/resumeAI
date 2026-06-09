import React from 'react';
import { ResumeProfile, ThemeConfig } from '../../types/resume';

export interface LayoutProps {
  resume: ResumeProfile;
  theme: ThemeConfig;
}

export const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month) - 1]} ${year}`;
};

interface SectionTitleProps {
  title: string;
  theme: ThemeConfig;
  style?: 'classic' | 'modern' | 'minimal';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, theme, style = 'classic' }) => {
  if (style === 'modern') {
    return (
      <div className="flex items-center gap-3 mb-3">
        <h2 style={{ color: theme.headingColor, fontFamily: theme.fontPairing.heading, fontSize: '10pt', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {title}
        </h2>
        <div style={{ flex: 1, height: '2px', backgroundColor: theme.accentColor }} />
      </div>
    );
  }
  if (style === 'minimal') {
    return (
      <div style={{ borderBottom: `1px solid ${theme.accentColor}`, marginBottom: '8px', paddingBottom: '4px' }}>
        <h2 style={{ color: theme.headingColor, fontFamily: theme.fontPairing.heading, fontSize: '10pt', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          {title}
        </h2>
      </div>
    );
  }
  return (
    <div style={{ borderBottom: `2px solid ${theme.accentColor}`, marginBottom: '8px', paddingBottom: '3px' }}>
      <h2 style={{ color: theme.accentColor, fontFamily: theme.fontPairing.heading, fontSize: '11pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {title}
      </h2>
    </div>
  );
};

interface ExperienceItemProps {
  exp: ResumeProfile['experience'][0];
  theme: ThemeConfig;
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({ exp, theme }) => (
  <div style={{ marginBottom: '12px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
      <div>
        <span style={{ fontWeight: 700, color: theme.headingColor, fontSize: '10.5pt', fontFamily: theme.fontPairing.heading }}>{exp.position}</span>
        <span style={{ color: theme.accentColor, marginLeft: '6px', fontSize: '10pt' }}>@ {exp.company}</span>
        {exp.location && <span style={{ color: theme.bodyColor, fontSize: '9pt', marginLeft: '4px' }}>• {exp.location}</span>}
      </div>
      <span style={{ color: theme.bodyColor, fontSize: '9pt', whiteSpace: 'nowrap', marginLeft: '8px', flexShrink: 0 }}>
        {formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate || '')}
      </span>
    </div>
    <ul style={{ margin: 0, paddingLeft: '16px' }}>
      {exp.accomplishments.filter(Boolean).map((acc, i) => (
        <li key={i} style={{ color: theme.bodyColor, fontSize: '9.5pt', marginBottom: '2px', lineHeight: '1.4' }}>
          {acc}
        </li>
      ))}
    </ul>
  </div>
);

interface ProjectItemProps {
  project: ResumeProfile['projects'][0];
  theme: ThemeConfig;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({ project, theme }) => (
  <div style={{ marginBottom: '10px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
      <div>
        <span style={{ fontWeight: 700, color: theme.headingColor, fontSize: '10.5pt', fontFamily: theme.fontPairing.heading }}>{project.projectName}</span>
        {project.technologies.length > 0 && (
          <span style={{ color: theme.bodyColor, fontSize: '8.5pt', marginLeft: '6px' }}>
            [{project.technologies.join(', ')}]
          </span>
        )}
      </div>
      <div style={{ display: 'flex', gap: '8px', fontSize: '8.5pt' }}>
        {project.repositoryUrl && <span style={{ color: theme.accentColor }}>GitHub</span>}
        {project.liveUrl && <span style={{ color: theme.accentColor }}>Live</span>}
      </div>
    </div>
    <ul style={{ margin: 0, paddingLeft: '16px' }}>
      {project.descriptions.filter(Boolean).map((desc, i) => (
        <li key={i} style={{ color: theme.bodyColor, fontSize: '9.5pt', marginBottom: '2px', lineHeight: '1.4' }}>
          {desc}
        </li>
      ))}
    </ul>
  </div>
);

interface SkillsGridProps {
  skills: ResumeProfile['skills'];
  theme: ThemeConfig;
  compact?: boolean;
}

export const SkillsGrid: React.FC<SkillsGridProps> = ({ skills, theme, compact }) => {
  const categories = [
    { label: 'Languages', items: skills.languages },
    { label: 'Frameworks', items: skills.frameworks },
    { label: 'Databases', items: skills.databases },
    { label: 'Tools', items: skills.tools },
    { label: 'Cloud', items: skills.cloud },
    { label: 'Hardware', items: skills.hardware },
  ].filter(c => c.items.length > 0);

  return (
    <div>
      {categories.map(cat => (
        <div key={cat.label} style={{ marginBottom: compact ? '4px' : '6px' }}>
          <span style={{ fontWeight: 600, color: theme.headingColor, fontSize: '9pt', fontFamily: theme.fontPairing.heading }}>
            {cat.label}:{' '}
          </span>
          <span style={{ color: theme.bodyColor, fontSize: '9pt' }}>
            {cat.items.join(' • ')}
          </span>
        </div>
      ))}
    </div>
  );
};
