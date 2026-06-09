import { LayoutConfig } from '../types/resume';

export const LAYOUTS: LayoutConfig[] = [
  {
    id: 'ats-classic',
    name: 'ATS Classic',
    description: 'Single-column, ATS-optimized format with clean hierarchy',
    component: 'ATSClassic',
  },
  {
    id: 'dual-column',
    name: 'Dual Column',
    description: 'Two-column layout with sidebar for skills and contact',
    component: 'DualColumn',
  },
  {
    id: 'modern-executive',
    name: 'Modern Executive',
    description: 'Bold header with prominent branding and clean sections',
    component: 'ModernExecutive',
  },
  {
    id: 'technical-grid',
    name: 'Technical Grid',
    description: 'Grid-based layout optimized for technical roles',
    component: 'TechnicalGrid',
  },
  {
    id: 'minimalist-clean',
    name: 'Minimalist Clean',
    description: 'Ultra-clean typography-focused minimal design',
    component: 'MinimalistClean',
  },
];

export const getLayout = (id: string): LayoutConfig =>
  LAYOUTS.find((l) => l.id === id) || LAYOUTS[0];
