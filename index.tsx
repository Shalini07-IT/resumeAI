import React from 'react';
import { clsx } from 'clsx';

// Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary', size = 'md', icon, children, className, ...props
}) => (
  <button
    className={clsx(
      'inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      {
        'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500': variant === 'primary',
        'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-indigo-500': variant === 'secondary',
        'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-400': variant === 'ghost',
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500': variant === 'danger',
        'px-2.5 py-1.5 text-xs': size === 'sm',
        'px-4 py-2 text-sm': size === 'md',
        'px-6 py-3 text-base': size === 'lg',
      },
      className
    )}
    {...props}
  >
    {icon && <span className="shrink-0">{icon}</span>}
    {children}
  </button>
);

// Input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}
export const Input: React.FC<InputProps> = ({ label, error, hint, className, id, ...props }) => (
  <div className="flex flex-col gap-1">
    {label && <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
    <input
      id={id}
      className={clsx(
        'block w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
        error
          ? 'border-red-400 bg-red-50 dark:bg-red-900/10 dark:border-red-500'
          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
        className
      )}
      {...props}
    />
    {hint && !error && <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

// Textarea
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}
export const Textarea: React.FC<TextareaProps> = ({ label, error, hint, className, id, ...props }) => (
  <div className="flex flex-col gap-1">
    {label && <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
    <textarea
      id={id}
      className={clsx(
        'block w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none',
        error
          ? 'border-red-400 bg-red-50 dark:bg-red-900/10'
          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
        className
      )}
      {...props}
    />
    {hint && !error && <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

// Card
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={clsx('bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm', className)}>
    {children}
  </div>
);

// Badge
export const Badge: React.FC<{ children: React.ReactNode; color?: string; onRemove?: () => void }> = ({
  children, onRemove
}) => (
  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200">
    {children}
    {onRemove && (
      <button onClick={onRemove} className="ml-0.5 hover:text-indigo-600 dark:hover:text-indigo-300 rounded-full">
        ×
      </button>
    )}
  </span>
);

// Progress bar
export const ProgressBar: React.FC<{ value: number; max?: number; color?: string; label?: string }> = ({
  value, max = 100, color = 'bg-indigo-500', label
}) => (
  <div className="flex flex-col gap-1">
    {label && <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>}
    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div
        className={clsx('h-full rounded-full transition-all duration-500', color)}
        style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
      />
    </div>
  </div>
);

// Tooltip
export const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
  <div className="relative group">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
      {text}
    </div>
  </div>
);

// Section header
export const SectionHeader: React.FC<{ title: string; subtitle?: string; action?: React.ReactNode }> = ({
  title, subtitle, action
}) => (
  <div className="flex items-start justify-between gap-4 mb-6">
    <div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>}
    </div>
    {action}
  </div>
);

// Tag input
interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
}
export const TagInput: React.FC<TagInputProps> = ({ tags, onChange, placeholder, label }) => {
  const [input, setInput] = React.useState('');

  const addTag = (value: string) => {
    const tag = value.trim();
    if (tag && !tags.includes(tag)) {
      onChange([...tags, tag]);
    }
    setInput('');
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <div className="flex flex-wrap gap-1.5 min-h-10 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent">
        {tags.map(tag => (
          <Badge key={tag} onRemove={() => onChange(tags.filter(t => t !== tag))}>{tag}</Badge>
        ))}
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          onBlur={() => input && addTag(input)}
          placeholder={tags.length === 0 ? placeholder : 'Add more...'}
          className="flex-1 min-w-24 bg-transparent text-sm text-gray-900 dark:text-gray-100 outline-none placeholder-gray-400"
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Press Enter or comma to add</p>
    </div>
  );
};
