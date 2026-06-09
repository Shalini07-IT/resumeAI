import React, { useState } from 'react';
import { Education } from '../../types/resume';
import { Input, Button, Card, SectionHeader } from '../ui';
import { Plus, Trash2, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  data: Education[];
  onChange: (data: Education[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const createEducation = (): Education => ({
  id: crypto.randomUUID(),
  institution: '',
  degree: '',
  major: '',
  graduationYear: '',
  gpa: '',
});

export const EducationStep: React.FC<Props> = ({ data, onChange, onNext, onPrev }) => {
  const [expanded, setExpanded] = useState<string | null>(data[0]?.id || null);

  const add = () => {
    const e = createEducation();
    onChange([...data, e]);
    setExpanded(e.id);
  };

  const remove = (id: string) => onChange(data.filter(e => e.id !== id));

  const update = (id: string, updates: Partial<Education>) => {
    onChange(data.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Education"
        subtitle="Your academic background and credentials"
        action={<Button size="sm" onClick={add} icon={<Plus className="w-4 h-4" />}>Add Education</Button>}
      />

      {data.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Add your educational background</p>
          <Button onClick={add} icon={<Plus className="w-4 h-4" />}>Add Education</Button>
        </div>
      )}

      <div className="space-y-3">
        {data.map(edu => (
          <Card key={edu.id} className="overflow-hidden">
            <div
              className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              onClick={() => setExpanded(expanded === edu.id ? null : edu.id)}
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white truncate">
                  {edu.institution || 'Institution Name'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {[edu.degree, edu.major].filter(Boolean).join(' in ')} {edu.graduationYear && `• ${edu.graduationYear}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" onClick={e => { e.stopPropagation(); remove(edu.id); }} icon={<Trash2 className="w-3.5 h-3.5 text-red-500" />} />
                {expanded === edu.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
            </div>

            {expanded === edu.id && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Institution *"
                    value={edu.institution}
                    onChange={e => update(edu.id, { institution: e.target.value })}
                    placeholder="MIT, Stanford University..."
                  />
                  <Input
                    label="Degree *"
                    value={edu.degree}
                    onChange={e => update(edu.id, { degree: e.target.value })}
                    placeholder="Bachelor of Science, Master of..."
                  />
                  <Input
                    label="Major / Field of Study"
                    value={edu.major}
                    onChange={e => update(edu.id, { major: e.target.value })}
                    placeholder="Computer Science, Data Engineering..."
                  />
                  <Input
                    label="Graduation Year"
                    value={edu.graduationYear}
                    onChange={e => update(edu.id, { graduationYear: e.target.value })}
                    placeholder="2024"
                    maxLength={4}
                  />
                  <Input
                    label="GPA (optional)"
                    value={edu.gpa}
                    onChange={e => update(edu.id, { gpa: e.target.value })}
                    placeholder="3.8"
                  />
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onPrev} icon={<ChevronLeft className="w-4 h-4" />}>Back</Button>
        <Button onClick={onNext} icon={<ChevronRight className="w-4 h-4" />}>Next: Skills</Button>
      </div>
    </div>
  );
};
