import React from 'react';
import { LayoutProps, SectionTitle, ExperienceItem, ProjectItem, SkillsGrid, formatDate } from './shared';

export const ATSClassic: React.FC<LayoutProps> = ({ resume, theme }) => {
  const { personal: p, summary, experience, projects, education, skills, sectionOrder } = resume;
  const density = theme.densityScale;

  const sectionMap: Record<string, React.ReactNode> = {
    summary: summary ? (
      <div key="summary" style={{ marginBottom: `${14 * density}px` }}>
        <SectionTitle title="Professional Summary" theme={theme} />
        <p style={{ color: theme.bodyColor, fontSize: '9.5pt', lineHeight: '1.5' }}>{summary}</p>
      </div>
    ) : null,
    experience: experience.length > 0 ? (
      <div key="experience" style={{ marginBottom: `${14 * density}px` }}>
        <SectionTitle title="Work Experience" theme={theme} />
        {experience.map(exp => <ExperienceItem key={exp.id} exp={exp} theme={theme} />)}
      </div>
    ) : null,
    projects: projects.length > 0 ? (
      <div key="projects" style={{ marginBottom: `${14 * density}px` }}>
        <SectionTitle title="Projects" theme={theme} />
        {projects.map(proj => <ProjectItem key={proj.id} project={proj} theme={theme} />)}
      </div>
    ) : null,
    education: education.length > 0 ? (
      <div key="education" style={{ marginBottom: `${14 * density}px` }}>
        <SectionTitle title="Education" theme={theme} />
        {education.map(edu => (
          <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div>
              <div style={{ fontWeight: 700, color: theme.headingColor, fontSize: '10.5pt', fontFamily: theme.fontPairing.heading }}>{edu.institution}</div>
              <div style={{ color: theme.bodyColor, fontSize: '9.5pt' }}>
                {edu.degree}{edu.major ? ` in ${edu.major}` : ''}
                {edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
              </div>
            </div>
            <div style={{ color: theme.bodyColor, fontSize: '9pt', whiteSpace: 'nowrap' }}>{edu.graduationYear}</div>
          </div>
        ))}
      </div>
    ) : null,
    skills: (
      <div key="skills" style={{ marginBottom: `${14 * density}px` }}>
        <SectionTitle title="Technical Skills" theme={theme} />
        <SkillsGrid skills={skills} theme={theme} />
      </div>
    ),
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '816px',
      margin: '0 auto',
      padding: '36px 48px',
      backgroundColor: '#ffffff',
      fontFamily: theme.fontPairing.body,
      color: theme.bodyColor,
    }}>
      {/* Header */}
      <div style={{ marginBottom: '18px', borderBottom: `3px solid ${theme.accentColor}`, paddingBottom: '12px' }}>
        <h1 style={{ fontSize: '22pt', fontWeight: 800, color: theme.headingColor, fontFamily: theme.fontPairing.heading, margin: 0 }}>
          {p.fullName || 'Your Name'}
        </h1>
        <p style={{ fontSize: '12pt', color: theme.accentColor, fontWeight: 600, margin: '3px 0 8px', fontFamily: theme.fontPairing.heading }}>
          {p.professionalTitle || 'Professional Title'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '9pt', color: theme.bodyColor }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>• {p.phone}</span>}
          {p.location && <span>• {p.location}</span>}
          {p.linkedinUrl && <span>• LinkedIn</span>}
          {p.githubUrl && <span>• GitHub</span>}
          {p.portfolioUrl && <span>• Portfolio</span>}
        </div>
      </div>

      {/* Sections in order */}
      {sectionOrder.map(key => sectionMap[key]).filter(Boolean)}
    </div>
  );
};
