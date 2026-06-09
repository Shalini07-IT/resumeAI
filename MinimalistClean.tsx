import React from 'react';
import { LayoutProps, SectionTitle, ExperienceItem, ProjectItem, SkillsGrid, formatDate } from './shared';

export const MinimalistClean: React.FC<LayoutProps> = ({ resume, theme }) => {
  const { personal: p, summary, experience, projects, education, skills } = resume;

  return (
    <div style={{ width: '100%', maxWidth: '816px', margin: '0 auto', backgroundColor: '#ffffff', fontFamily: theme.fontPairing.body, padding: '40px 56px' }}>
      {/* Minimal header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28pt', fontWeight: 300, color: theme.headingColor, fontFamily: theme.fontPairing.heading, margin: '0 0 6px', letterSpacing: '-1px' }}>
          {p.fullName || 'Your Name'}
        </h1>
        <p style={{ fontSize: '11pt', color: theme.accentColor, margin: '0 0 12px', fontWeight: 400, letterSpacing: '0.02em' }}>
          {p.professionalTitle}
        </p>
        <div style={{ display: 'flex', gap: '20px', fontSize: '8.5pt', color: theme.bodyColor, opacity: 0.75 }}>
          {[p.email, p.phone, p.location, p.linkedinUrl && 'LinkedIn', p.githubUrl && 'GitHub', p.portfolioUrl && 'Portfolio']
            .filter(Boolean).map((item, i) => (
              <span key={i}>{item as string}</span>
            ))}
        </div>
      </div>

      {summary && (
        <div style={{ marginBottom: '20px' }}>
          <SectionTitle title="About" theme={theme} style="minimal" />
          <p style={{ color: theme.bodyColor, fontSize: '9.5pt', lineHeight: '1.7', margin: 0, maxWidth: '600px' }}>{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <SectionTitle title="Experience" theme={theme} style="minimal" />
          {experience.map(exp => <ExperienceItem key={exp.id} exp={exp} theme={theme} />)}
        </div>
      )}

      {projects.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <SectionTitle title="Projects" theme={theme} style="minimal" />
          {projects.map(proj => <ProjectItem key={proj.id} project={proj} theme={theme} />)}
        </div>
      )}

      <div style={{ display: 'flex', gap: '40px' }}>
        {education.length > 0 && (
          <div style={{ flex: 1 }}>
            <SectionTitle title="Education" theme={theme} style="minimal" />
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600, color: theme.headingColor, fontSize: '10pt', fontFamily: theme.fontPairing.heading }}>{edu.institution}</span>
                  <span style={{ color: theme.bodyColor, fontSize: '9pt' }}>{edu.graduationYear}</span>
                </div>
                <div style={{ color: theme.bodyColor, fontSize: '9pt' }}>{edu.degree}{edu.major ? `, ${edu.major}` : ''}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ flex: 2 }}>
          <SectionTitle title="Skills" theme={theme} style="minimal" />
          <SkillsGrid skills={skills} theme={theme} compact />
        </div>
      </div>
    </div>
  );
};
