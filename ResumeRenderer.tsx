import React from 'react';
import { ResumeProfile, ThemeConfig } from '../../types/resume';
import { ATSClassic } from './ATSClassic';
import { DualColumn } from './DualColumn';
import { ModernExecutive } from './ModernExecutive';
import { TechnicalGrid } from './TechnicalGrid';
import { MinimalistClean } from './MinimalistClean';

interface Props {
  resume: ResumeProfile;
  layoutId: string;
  theme: ThemeConfig;
  id?: string;
}

export const ResumeRenderer: React.FC<Props> = ({ resume, layoutId, theme, id }) => {
  const commonProps = { resume, theme };

  const layout = (() => {
    switch (layoutId) {
      case 'dual-column': return <DualColumn {...commonProps} />;
      case 'modern-executive': return <ModernExecutive {...commonProps} />;
      case 'technical-grid': return <TechnicalGrid {...commonProps} />;
      case 'minimalist-clean': return <MinimalistClean {...commonProps} />;
      default: return <ATSClassic {...commonProps} />;
    }
  })();

  return (
    <div id={id} className="resume-output" style={{ fontFamily: theme.fontPairing.body }}>
      {layout}
    </div>
  );
};
