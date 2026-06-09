import React from 'react';
import { LayoutProps, SectionTitle, ExperienceItem, ProjectItem, formatDate } from './shared';

export const DualColumn: React.FC<LayoutProps> = ({ resume, theme }) => {
  const { personal: p, summary, experience, projects, education, skills } = resume;

  const allSkills = [
    ...skills.languages, ...skills.frameworks, ...skills.databases,
    ...skills.tools, ...skills.cloud, ...skills.hardware,
  ].filter(Boolean);

  return (
    <div style={{ width: '100%', maxWidth: '816px', margin: '0 auto', backgroundColor: '#ffffff', display: 'flex', fontFamily: theme.fontPairing.body }}>
      {/* Sidebar */}
      <div style={{ width: '240px', minWidth: '240px', backgroundColor: theme.backgroundAccent, padding: '28px 20px', borderRight: `1px solid #e5e7eb` }}>
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '16pt', fontWeight: 800, color: theme.headingColor, fontFamily: theme.fontPairing.heading, margin: '0 0 4px', lineHeight: 1.2 }}>
            {p.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '9.5pt', color: theme.accentColor, fontWeight: 600, margin: 0, fontFamily: theme.fontPairing.heading }}>
            {p.professionalTitle}
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '8.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.accentColor, marginBottom: '8px' }}>Contact</h3>
          {[p.email, p.phone, p.location, p.linkedinUrl && 'LinkedIn', p.githubUrl && 'GitHub', p.portfolioUrl && 'Portfolio']
            .filter(Boolean).map((item, i) => (
              <p key={i} style={{ fontSize: '8.5pt', color: theme.bodyColor, margin: '0 0 3px', wordBreak: 'break-all' }}>{item as string}</p>
            ))}
        </div>

        {allSkills.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '8.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.accentColor, marginBottom: '8px' }}>Skills</h3>
            {[
              { label: 'Languages', items: skills.languages },
              { label: 'Frameworks', items: skills.frameworks },
              { label: 'Databases', items: skills.databases },
              { label: 'Tools', items: skills.tools },
              { label: 'Cloud', items: skills.cloud },
            ].filter(c => c.items.length > 0).map(cat => (
              <div key={cat.label} style={{ marginBottom: '6px' }}>
                <p style={{ fontSize: '7.5pt', fontWeight: 600, color: theme.headingColor, textTransform: 'uppercase', margin: '0 0 2px', fontFamily: theme.fontPairing.heading }}>{cat.label}</p>
                <p style={{ fontSize: '8pt', color: theme.bodyColor, margin: 0, lineHeight: '1.4' }}>{cat.items.join(', ')}</p>
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h3 style={{ fontSize: '8.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.accentColor, marginBottom: '8px' }}>Education</h3>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '8px' }}>
                <p style={{ fontSize: '8.5pt', fontWeight: 700, color: theme.headingColor, margin: '0 0 2px', fontFamily: theme.fontPairing.heading }}>{edu.institution}</p>
                <p style={{ fontSize: '8pt', color: theme.bodyColor, margin: 0 }}>{edu.degree}</p>
                {edu.major && <p style={{ fontSize: '8pt', color: theme.bodyColor, margin: 0 }}>{edu.major}</p>}
                <p style={{ fontSize: '8pt', color: theme.accentColor, margin: 0 }}>{edu.graduationYear}{edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '28px 24px' }}>
        {summary && (
          <div style={{ marginBottom: '16px' }}>
            <SectionTitle title="Summary" theme={theme} style="modern" />
            <p style={{ color: theme.bodyColor, fontSize: '9.5pt', lineHeight: '1.5', margin: 0 }}>{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <SectionTitle title="Experience" theme={theme} style="modern" />
            {experience.map(exp => <ExperienceItem key={exp.id} exp={exp} theme={theme} />)}
          </div>
        )}

        {projects.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <SectionTitle title="Projects" theme={theme} style="modern" />
            {projects.map(proj => <ProjectItem key={proj.id} project={proj} theme={theme} />)}
          </div>
        )}
      </div>
    </div>
  );
};
