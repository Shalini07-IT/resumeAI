import React from 'react';
import { LayoutProps, SectionTitle, ExperienceItem, ProjectItem, SkillsGrid } from './shared';

export const TechnicalGrid: React.FC<LayoutProps> = ({ resume, theme }) => {
  const { personal: p, summary, experience, projects, education, skills } = resume;

  return (
    <div style={{ width: '100%', maxWidth: '816px', margin: '0 auto', backgroundColor: '#ffffff', fontFamily: theme.fontPairing.body }}>
      {/* Grid header */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 0, borderBottom: `3px solid ${theme.accentColor}` }}>
        <div style={{ padding: '28px 28px 20px' }}>
          <h1 style={{ fontSize: '22pt', fontWeight: 900, color: theme.headingColor, fontFamily: theme.fontPairing.heading, margin: '0 0 4px' }}>
            {p.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '11pt', color: theme.accentColor, fontWeight: 600, margin: 0, fontFamily: theme.fontPairing.heading }}>
            {p.professionalTitle}
          </p>
        </div>
        <div style={{ padding: '28px 20px 20px', backgroundColor: theme.backgroundAccent, borderLeft: `1px solid #e5e7eb` }}>
          <div style={{ fontSize: '8.5pt', color: theme.bodyColor, lineHeight: '1.7' }}>
            {p.email && <div>{p.email}</div>}
            {p.phone && <div>{p.phone}</div>}
            {p.location && <div>{p.location}</div>}
            {p.linkedinUrl && <div style={{ color: theme.accentColor }}>LinkedIn</div>}
            {p.githubUrl && <div style={{ color: theme.accentColor }}>GitHub</div>}
            {p.portfolioUrl && <div style={{ color: theme.accentColor }}>Portfolio</div>}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 0 }}>
        {/* Main column */}
        <div style={{ padding: '20px 28px', borderRight: `1px solid #e5e7eb` }}>
          {summary && (
            <div style={{ marginBottom: '16px' }}>
              <SectionTitle title="Summary" theme={theme} />
              <p style={{ color: theme.bodyColor, fontSize: '9.5pt', lineHeight: '1.5', margin: 0 }}>{summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <SectionTitle title="Experience" theme={theme} />
              {experience.map(exp => <ExperienceItem key={exp.id} exp={exp} theme={theme} />)}
            </div>
          )}

          {projects.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <SectionTitle title="Projects" theme={theme} />
              {projects.map(proj => <ProjectItem key={proj.id} project={proj} theme={theme} />)}
            </div>
          )}
        </div>

        {/* Side column */}
        <div style={{ padding: '20px 20px', backgroundColor: `${theme.backgroundAccent}40` }}>
          {/* Skills grid */}
          <div style={{ marginBottom: '16px' }}>
            <SectionTitle title="Skills" theme={theme} />
            {[
              { label: 'Languages', items: skills.languages },
              { label: 'Frameworks', items: skills.frameworks },
              { label: 'Databases', items: skills.databases },
              { label: 'Tools', items: skills.tools },
              { label: 'Cloud', items: skills.cloud },
            ].filter(c => c.items.length > 0).map(cat => (
              <div key={cat.label} style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '7.5pt', fontWeight: 700, textTransform: 'uppercase', color: theme.accentColor, marginBottom: '3px', letterSpacing: '0.06em', fontFamily: theme.fontPairing.heading }}>
                  {cat.label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                  {cat.items.map(item => (
                    <span key={item} style={{ fontSize: '7.5pt', padding: '1px 6px', backgroundColor: `${theme.accentColor}15`, color: theme.bodyColor, borderRadius: '3px', border: `1px solid ${theme.accentColor}30` }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {education.length > 0 && (
            <div>
              <SectionTitle title="Education" theme={theme} />
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 700, fontSize: '9pt', color: theme.headingColor, fontFamily: theme.fontPairing.heading }}>{edu.institution}</div>
                  <div style={{ fontSize: '8.5pt', color: theme.bodyColor }}>{edu.degree}</div>
                  {edu.major && <div style={{ fontSize: '8.5pt', color: theme.bodyColor }}>{edu.major}</div>}
                  <div style={{ fontSize: '8.5pt', color: theme.accentColor }}>{edu.graduationYear}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
