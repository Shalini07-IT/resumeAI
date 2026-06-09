import React from 'react';
import { ATSResult } from '../../types/resume';
import { Card, ProgressBar } from '../ui';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { clsx } from 'clsx';

interface Props {
  result: ATSResult;
}

const BREAKDOWN_LABELS = {
  contactInfo: 'Contact Info',
  summary: 'Summary',
  skills: 'Skills',
  experience: 'Experience',
  projects: 'Projects',
  education: 'Education',
  actionVerbs: 'Action Verbs',
  quantifiedAchievements: 'Quantified Wins',
  density: 'Resume Density',
  formatting: 'Formatting',
};

const BREAKDOWN_WEIGHTS = {
  contactInfo: 10,
  summary: 15,
  skills: 10,
  experience: 25,
  projects: 10,
  education: 10,
  actionVerbs: 8,
  quantifiedAchievements: 7,
  density: 3,
  formatting: 2,
};

export const ATSDashboard: React.FC<Props> = ({ result }) => {
  const { score, breakdown, suggestions, strengths } = result;

  const scoreColor = score >= 80 ? 'text-green-600 dark:text-green-400' :
    score >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
    'text-red-600 dark:text-red-400';

  const scoreBg = score >= 80 ? 'from-green-500 to-emerald-500' :
    score >= 60 ? 'from-yellow-500 to-amber-500' :
    'from-red-500 to-rose-500';

  const barColor = score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="space-y-4">
      {/* Score */}
      <Card className="p-6">
        <div className="flex items-center gap-6">
          <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${scoreBg} flex items-center justify-center shadow-lg shrink-0`}>
            <span className="text-2xl font-black text-white">{score}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">ATS Score</h3>
            <p className={clsx('text-sm font-medium', scoreColor)}>
              {score >= 80 ? '✅ Excellent — ATS ready!' : score >= 60 ? '⚠️ Good — room to improve' : '❌ Needs work — improve before applying'}
            </p>
            <div className="mt-2">
              <ProgressBar value={score} color={barColor} />
            </div>
          </div>
        </div>
      </Card>

      {/* Breakdown */}
      <Card className="p-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Score Breakdown</h4>
        <div className="space-y-2.5">
          {(Object.entries(breakdown) as [keyof typeof BREAKDOWN_LABELS, number][]).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-xs text-gray-600 dark:text-gray-400 w-32 shrink-0">{BREAKDOWN_LABELS[key]}</span>
              <div className="flex-1">
                <ProgressBar
                  value={value}
                  color={value >= 70 ? 'bg-green-500' : value >= 40 ? 'bg-yellow-500' : 'bg-red-400'}
                />
              </div>
              <span className={clsx('text-xs font-medium w-8 text-right shrink-0',
                value >= 70 ? 'text-green-600 dark:text-green-400' : value >= 40 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-500'
              )}>{value}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Card className="p-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Improvement Suggestions
          </h4>
          <ul className="space-y-2">
            {suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                <span className="text-amber-500 mt-0.5 shrink-0">→</span>
                {s}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Strengths */}
      {strengths.length > 0 && (
        <Card className="p-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Strengths
          </h4>
          <ul className="space-y-2">
            {strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};
