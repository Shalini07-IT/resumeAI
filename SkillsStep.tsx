import React from 'react';
import { TechnicalSkills } from '../../types/resume';
import { TagInput, Button, SectionHeader, Card } from '../ui';
import { ChevronLeft, CheckCircle } from 'lucide-react';

interface Props {
  data: TechnicalSkills;
  onChange: (data: TechnicalSkills) => void;
  onFinish: () => void;
  onPrev: () => void;
}

const SKILL_SECTIONS = [
  { key: 'languages' as const, label: 'Programming Languages', placeholder: 'TypeScript, Python, Go, Rust...', icon: '💻' },
  { key: 'frameworks' as const, label: 'Frameworks & Libraries', placeholder: 'React, Node.js, FastAPI, Next.js...', icon: '🔧' },
  { key: 'databases' as const, label: 'Databases', placeholder: 'PostgreSQL, MongoDB, Redis...', icon: '🗄️' },
  { key: 'tools' as const, label: 'Tools & DevOps', placeholder: 'Docker, Kubernetes, Git, CI/CD...', icon: '🛠️' },
  { key: 'cloud' as const, label: 'Cloud & Infrastructure', placeholder: 'AWS, GCP, Azure, Terraform...', icon: '☁️' },
  { key: 'hardware' as const, label: 'Hardware & Embedded', placeholder: 'Arduino, Raspberry Pi, FPGA...', icon: '⚡' },
];

export const SkillsStep: React.FC<Props> = ({ data, onChange, onFinish, onPrev }) => {
  const update = (key: keyof TechnicalSkills, tags: string[]) => {
    onChange({ ...data, [key]: tags });
  };

  const totalSkills = Object.values(data).flat().filter(Boolean).length;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Technical Skills"
        subtitle="Categorize your skills for ATS optimization"
      />

      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg p-4">
        <p className="text-sm text-indigo-800 dark:text-indigo-200">
          <span className="font-medium">💡 ATS Tip:</span> Categorizing skills helps ATS systems match your resume to job requirements. Aim for 15+ skills across all categories.
        </p>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-2 bg-indigo-200 dark:bg-indigo-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all"
              style={{ width: `${Math.min(100, (totalSkills / 15) * 100)}%` }}
            />
          </div>
          <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">{totalSkills}/15+</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SKILL_SECTIONS.map(section => (
          <Card key={section.key} className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{section.icon}</span>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{section.label}</h3>
              {data[section.key].length > 0 && (
                <span className="ml-auto text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  {data[section.key].length} skills
                </span>
              )}
            </div>
            <TagInput
              tags={data[section.key]}
              onChange={tags => update(section.key, tags)}
              placeholder={section.placeholder}
            />
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onPrev} icon={<ChevronLeft className="w-4 h-4" />}>Back</Button>
        <Button
          onClick={onFinish}
          icon={<CheckCircle className="w-4 h-4" />}
          className="bg-green-600 hover:bg-green-700 focus:ring-green-500"
        >
          Finish & Preview
        </Button>
      </div>
    </div>
  );
};
