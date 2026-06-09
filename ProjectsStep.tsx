import React, { useState } from 'react';
import { Project } from '../../types/resume';
import { Input, Button, Card, SectionHeader, Textarea, TagInput } from '../ui';
import { Plus, Trash2, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  data: Project[];
  onChange: (data: Project[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const createProject = (): Project => ({
  id: crypto.randomUUID(),
  projectName: '',
  technologies: [],
  repositoryUrl: '',
  liveUrl: '',
  descriptions: [''],
});

export const ProjectsStep: React.FC<Props> = ({ data, onChange, onNext, onPrev }) => {
  const [expanded, setExpanded] = useState<string | null>(data[0]?.id || null);

  const add = () => {
    const p = createProject();
    onChange([...data, p]);
    setExpanded(p.id);
  };

  const remove = (id: string) => onChange(data.filter(p => p.id !== id));

  const update = (id: string, updates: Partial<Project>) => {
    onChange(data.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const addDesc = (id: string) => {
    const proj = data.find(p => p.id === id);
    if (proj) update(id, { descriptions: [...proj.descriptions, ''] });
  };

  const updateDesc = (projId: string, idx: number, value: string) => {
    const proj = data.find(p => p.id === projId);
    if (!proj) return;
    const newDesc = [...proj.descriptions];
    newDesc[idx] = value;
    update(projId, { descriptions: newDesc });
  };

  const removeDesc = (projId: string, idx: number) => {
    const proj = data.find(p => p.id === projId);
    if (!proj) return;
    update(projId, { descriptions: proj.descriptions.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Projects"
        subtitle="Showcase your technical projects and side work"
        action={
          <Button size="sm" onClick={add} icon={<Plus className="w-4 h-4" />}>
            Add Project
          </Button>
        }
      />

      {data.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Showcase your best technical projects</p>
          <Button onClick={add} icon={<Plus className="w-4 h-4" />}>Add First Project</Button>
        </div>
      )}

      <div className="space-y-3">
        {data.map(proj => (
          <Card key={proj.id} className="overflow-hidden">
            <div
              className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              onClick={() => setExpanded(expanded === proj.id ? null : proj.id)}
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white truncate">
                  {proj.projectName || 'Untitled Project'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {proj.technologies.slice(0, 3).join(', ') || 'No technologies listed'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={e => { e.stopPropagation(); remove(proj.id); }}
                  icon={<Trash2 className="w-3.5 h-3.5 text-red-500" />}
                />
                {expanded === proj.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
            </div>

            {expanded === proj.id && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
                <Input
                  label="Project Name *"
                  value={proj.projectName}
                  onChange={e => update(proj.id, { projectName: e.target.value })}
                  placeholder="e.g., CloudDeploy CLI, Portfolio Website"
                />

                <TagInput
                  label="Technologies Used"
                  tags={proj.technologies}
                  onChange={tags => update(proj.id, { technologies: tags })}
                  placeholder="React, TypeScript, Node.js..."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Repository URL"
                    value={proj.repositoryUrl}
                    onChange={e => update(proj.id, { repositoryUrl: e.target.value })}
                    placeholder="https://github.com/user/project"
                  />
                  <Input
                    label="Live URL"
                    value={proj.liveUrl}
                    onChange={e => update(proj.id, { liveUrl: e.target.value })}
                    placeholder="https://myproject.com"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Descriptions / Highlights
                    </label>
                    <Button size="sm" variant="ghost" onClick={() => addDesc(proj.id)} icon={<Plus className="w-3.5 h-3.5" />}>
                      Add bullet
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {proj.descriptions.map((desc, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <span className="text-gray-400 mt-2.5 text-sm">•</span>
                        <Textarea
                          value={desc}
                          onChange={e => updateDesc(proj.id, idx, e.target.value)}
                          placeholder="Built X feature that improved Y by Z%..."
                          rows={2}
                          className="flex-1 text-sm"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeDesc(proj.id, idx)}
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
        <Button onClick={onNext} icon={<ChevronRight className="w-4 h-4" />}>Next: Education</Button>
      </div>
    </div>
  );
};
