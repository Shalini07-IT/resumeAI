import React, { useState } from 'react';
import { WorkExperience } from '../../types/resume';
import { Input, Button, Card, SectionHeader, Textarea } from '../ui';
import { Plus, Trash2, ChevronLeft, ChevronRight, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { FORM_GUIDANCE, ACTION_VERBS } from '../../data/guidance';

interface Props {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const createExp = (): WorkExperience => ({
  id: crypto.randomUUID(),
  company: '',
  position: '',
  location: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  accomplishments: [''],
});

export const ExperienceStep: React.FC<Props> = ({ data, onChange, onNext, onPrev }) => {
  const [expanded, setExpanded] = useState<string | null>(data[0]?.id || null);

  const addExp = () => {
    const newExp = createExp();
    onChange([...data, newExp]);
    setExpanded(newExp.id);
  };

  const removeExp = (id: string) => onChange(data.filter(e => e.id !== id));

  const updateExp = (id: string, updates: Partial<WorkExperience>) => {
    onChange(data.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const addAccomplishment = (id: string) => {
    const exp = data.find(e => e.id === id);
    if (exp) updateExp(id, { accomplishments: [...exp.accomplishments, ''] });
  };

  const updateAccomplishment = (expId: string, idx: number, value: string) => {
    const exp = data.find(e => e.id === expId);
    if (!exp) return;
    const newAcc = [...exp.accomplishments];
    newAcc[idx] = value;
    updateExp(expId, { accomplishments: newAcc });
  };

  const removeAccomplishment = (expId: string, idx: number) => {
    const exp = data.find(e => e.id === expId);
    if (!exp) return;
    updateExp(expId, { accomplishments: exp.accomplishments.filter((_, i) => i !== idx) });
  };

  const allVerbs = Object.values(ACTION_VERBS).flat().slice(0, 12);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Work Experience"
        subtitle="List your most recent positions first"
        action={
          <Button size="sm" onClick={addExp} icon={<Plus className="w-4 h-4" />}>
            Add Position
          </Button>
        }
      />

      {data.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No work experience added yet</p>
          <Button onClick={addExp} icon={<Plus className="w-4 h-4" />}>Add Your First Position</Button>
        </div>
      )}

      <div className="space-y-3">
        {data.map((exp, expIdx) => (
          <Card key={exp.id} className="overflow-hidden">
            <div
              className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
            >
              <GripVertical className="w-4 h-4 text-gray-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white truncate">
                  {exp.position || 'Untitled Position'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {exp.company || 'Company'} {exp.startDate && `• ${exp.startDate}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => { e.stopPropagation(); removeExp(exp.id); }}
                  icon={<Trash2 className="w-3.5 h-3.5 text-red-500" />}
                />
                {expanded === exp.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
            </div>

            {expanded === exp.id && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Company *"
                    value={exp.company}
                    onChange={e => updateExp(exp.id, { company: e.target.value })}
                    placeholder="e.g., Google, Inc."
                  />
                  <Input
                    label="Position *"
                    value={exp.position}
                    onChange={e => updateExp(exp.id, { position: e.target.value })}
                    placeholder="e.g., Senior Software Engineer"
                  />
                  <Input
                    label="Location"
                    value={exp.location}
                    onChange={e => updateExp(exp.id, { location: e.target.value })}
                    placeholder="e.g., Mountain View, CA / Remote"
                  />
                  <div className="flex gap-2">
                    <Input
                      label="Start Date"
                      type="month"
                      value={exp.startDate}
                      onChange={e => updateExp(exp.id, { startDate: e.target.value })}
                      className="flex-1"
                    />
                    {!exp.isCurrent && (
                      <Input
                        label="End Date"
                        type="month"
                        value={exp.endDate}
                        onChange={e => updateExp(exp.id, { endDate: e.target.value })}
                        className="flex-1"
                      />
                    )}
                  </div>
                </div>

                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exp.isCurrent}
                    onChange={e => updateExp(exp.id, { isCurrent: e.target.checked, endDate: '' })}
                    className="rounded text-indigo-600"
                  />
                  I currently work here
                </label>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Accomplishments
                    </label>
                    <Button size="sm" variant="ghost" onClick={() => addAccomplishment(exp.id)} icon={<Plus className="w-3.5 h-3.5" />}>
                      Add bullet
                    </Button>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 mb-3">
                    <p className="text-xs text-blue-700 dark:text-blue-300 mb-1">💡 Quick verb insert:</p>
                    <div className="flex flex-wrap gap-1">
                      {allVerbs.map(v => (
                        <button key={v} onClick={() => {
                          const lastIdx = exp.accomplishments.length - 1;
                          const last = exp.accomplishments[lastIdx] || '';
                          updateAccomplishment(exp.id, lastIdx, last ? last : `${v} `);
                        }}
                          className="text-xs px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors"
                        >{v}</button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {exp.accomplishments.map((acc, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <span className="text-gray-400 mt-2.5 text-sm">•</span>
                        <Textarea
                          value={acc}
                          onChange={e => updateAccomplishment(exp.id, idx, e.target.value)}
                          placeholder={FORM_GUIDANCE.experience.accomplishment.placeholder}
                          rows={2}
                          className="flex-1 text-sm"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeAccomplishment(exp.id, idx)}
                          icon={<Trash2 className="w-3.5 h-3.5 text-red-400" />}
                          className="mt-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onPrev} icon={<ChevronLeft className="w-4 h-4" />}>Back</Button>
        <Button onClick={onNext} icon={<ChevronRight className="w-4 h-4" />}>Next: Projects</Button>
      </div>
    </div>
  );
};
