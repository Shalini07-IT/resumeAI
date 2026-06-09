import React from 'react';
import { LayoutProps, SectionTitle, ExperienceItem, ProjectItem, SkillsGrid } from './shared';

export const ModernExecutive: React.FC<LayoutProps> = ({ resume, theme }) => {
  const { personal: p, summary, experience, projects, education, skills } = resume;

  return (
    <div style={{ width: '100%', maxWidth: '816px', margin: '0 auto', backgroundColor: '#ffffff', fontFamily: theme.fontPairing.body }}>
      {/* Bold Header */}
      <div style={{ backgroundColor: theme.headingColor, padding: '32px 48px 24px', color: '#ffffff' }}>
        <h1 style={{ fontSize: '26pt', fontWeight: 900, margin: '0 0 4px', fontFamily: theme.fontPairing.heading, letterSpacing: '-0.5px' }}>
          {p.fullName || 'Your Name'}
        </h1>
        <p style={{ fontSize: '13pt', margin: '0 0 16px', color: theme.accentColor, fontWeight: 600, fontFamily: theme.fontPairing.heading }}>
          {p.professionalTitle || 'Professional Title'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '8.5pt', opacity: 0.85 }}>
          {p.email && <span>📧 {p.email}</span>}
          {p.phone && <span>📱 {p.phone}</span>}
          {p.location && <span>📍 {p.location}</span>}
          {p.linkedinUrl && <span>🔗 LinkedIn</span>}
          {p.githubUrl && <span>💻 GitHub</span>}
          {p.portfolioUrl && <span>🌐 Portfolio</span>}
        </div>
      </div>

      {/* Accent bar */}
      <div style={{ height: '4px', backgroundColor: theme.accentColor }} />

      {/* Body */}
      <div style={{ padding: '28px 48px' }}>
        {summary && (
          <div style={{ marginBottom: '18px', padding: '12px 16px', backgroundColor: theme.backgroundAccent, borderLeft: `4px solid ${theme.accentColor}`, borderRadius: '0 6px 6px 0' }}>
            <p style={{ color: theme.bodyColor, fontSize: '9.5pt', lineHeight: '1.6', margin: 0, fontStyle: 'italic' }}>{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <SectionTitle title="Professional Experience" theme={theme} style="modern" />
            {experience.map(exp => <ExperienceItem key={exp.id} exp={exp} theme={theme} />)}
          </div>
        )}

        {projects.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <SectionTitle title="Projects" theme={theme} style="modern" />
            {projects.map(proj => <ProjectItem key={proj.id} project={proj} theme={theme} />)}
          </div>
        )}

        <div style={{ display: 'flex', gap: '32px' }}>
          {education.length > 0 && (
            <div style={{ flex: 1 }}>
              <SectionTitle title="Education" theme={theme} style="modern" />
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: '8px' }}>
                  <div style={{ fontWeight: 700, color: theme.headingColor, fontSize: '10pt', fontFamily: theme.fontPairing.heading }}>{edu.institution}</div>
                  <div style={{ color: theme.bodyColor, fontSize: '9pt' }}>{edu.degree}{edu.major ? ` • ${edu.major}` : ''}</div>
                  <div style={{ color: theme.accentColor, fontSize: '9pt' }}>{edu.graduationYear}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ flex: 2 }}>
            <SectionTitle title="Technical Skills" theme={theme} style="modern" />
            <SkillsGrid skills={skills} theme={theme} compact />
          </div>
        </div>
      </div>
    </div>
  );
};
