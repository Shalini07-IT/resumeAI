import React, { useState } from 'react';
import { Textarea, SectionHeader, Button, Badge } from '../ui';
import { FORM_GUIDANCE, ACTION_VERBS } from '../../data/guidance';
import { ChevronLeft, ChevronRight, Wand2 } from 'lucide-react';
import { clsx } from 'clsx';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const SummaryStep: React.FC<Props> = ({ value, onChange, onNext, onPrev }) => {
  const [text, setText] = React.useState(value);
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const g = FORM_GUIDANCE.summary;

  const handleNext = () => {
    onChange(text);
    onNext();
  };

  const insertVerb = (verb: string) => {
    setText(prev => prev ? `${verb} ${prev}` : `${verb} `);
  };

  const densityColor = wordCount < 20 ? 'text-red-500' : wordCount > 100 ? 'text-orange-500' : 'text-green-500';

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Executive Summary"
        subtitle="Your professional pitch — 2-4 sentences of high-impact value"
      />

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">✨ Template to get started:</p>
        <p className="text-xs text-blue-700 dark:text-blue-300 font-mono italic">{g.placeholder}</p>
        <button
          onClick={() => setText(g.placeholder)}
          className="mt-2 text-xs text-blue-600 dark:text-blue-400 underline hover:no-underline"
        >
          Use this template →
        </button>
      </div>

      <div className="space-y-2">
        <Textarea
          label="Professional Summary"
          id="summary"
          value={text}
          onChange={e => setText(e.target.value)}
          rows={5}
          placeholder="Write a compelling 2-4 sentence summary..."
          hint={g.tip}
        />
        <div className="flex items-center justify-between text-xs">
          <span className={clsx('font-medium', densityColor)}>
            {wordCount} words {wordCount < 20 ? '(too short)' : wordCount > 100 ? '(too long)' : '(good length)'}
          </span>
          <span className="text-gray-400">Aim for 40–80 words</span>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          <Wand2 className="w-4 h-4 inline mr-1" />
          Power Verbs — click to insert
        </p>
        <div className="space-y-2">
          {Object.entries(ACTION_VERBS).map(([category, verbs]) => (
            <div key={category}>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 capitalize">{category}</p>
              <div className="flex flex-wrap gap-1.5">
                {verbs.map(verb => (
                  <button
                    key={verb}
                    onClick={() => insertVerb(verb)}
                    className="px-2 py-0.5 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    {verb}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onPrev} icon={<ChevronLeft className="w-4 h-4" />}>Back</Button>
        <Button onClick={handleNext} icon={<ChevronRight className="w-4 h-4" />}>Next: Experience</Button>
      </div>
    </div>
  );
};
