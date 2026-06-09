import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ResumeRenderer } from './components/layouts/ResumeRenderer';
import { PersonalStep } from './components/wizard/PersonalStep';
import { SummaryStep } from './components/wizard/SummaryStep';
import { ExperienceStep } from './components/wizard/ExperienceStep';
import { ProjectsStep } from './components/wizard/ProjectsStep';
import { EducationStep } from './components/wizard/EducationStep';
import { SkillsStep } from './components/wizard/SkillsStep';
import { ATSDashboard } from './components/dashboard/ATSDashboard';
import { VersionHistory } from './components/dashboard/VersionHistory';
import { Button, Card, ProgressBar, Tooltip } from './components/ui';
import { useResumeState } from './hooks/useResumeState';
import { useAppSettings } from './hooks/useAppSettings';
import { calculateATSScore } from './utils/atsEngine';
import { calculateCompleteness, exportResumeJSON, importResumeJSON, saveVersion, saveResume } from './utils/storage';
import { exportToPDF } from './utils/pdfExport';
import { THEMES } from './data/themes';
import { LAYOUTS } from './data/layouts';
import { SAMPLE_RESUME } from './data/defaults';
import { clsx } from 'clsx';
import {
  FileText, Download, Upload, Moon, Sun, Undo2, Redo2, Save,
  Eye, Edit3, BarChart3, History, Palette, Layout, ZapIcon, Printer, RefreshCw
} from 'lucide-react';

const WIZARD_STEPS = [
  { id: 0, label: 'Personal', short: 'Info' },
  { id: 1, label: 'Summary', short: 'Sum' },
  { id: 2, label: 'Experience', short: 'Exp' },
  { id: 3, label: 'Projects', short: 'Proj' },
  { id: 4, label: 'Education', short: 'Edu' },
  { id: 5, label: 'Skills', short: 'Skills' },
];

type TabKey = 'edit' | 'preview' | 'ats' | 'history';

export default function App() {
  const { resume, updateResume, setResume, undo, redo, canUndo, canRedo, saveSnapshot } = useResumeState();
  const { settings, updateSettings } = useAppSettings();
  const [step, setStep] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>('edit');
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [autoSaveMsg, setAutoSaveMsg] = useState('');

  const atsResult = useMemo(() => calculateATSScore(resume), [resume]);
  const completeness = useMemo(() => calculateCompleteness(resume), [resume]);
  const activeTheme = useMemo(() => THEMES.find(t => t.id === settings.theme) || THEMES[0], [settings.theme]);

  useEffect(() => {
    const timer = setInterval(() => {
      saveResume(resume);
      setAutoSaveMsg('Auto-saved');
      setTimeout(() => setAutoSaveMsg(''), 2000);
    }, 5000);
    return () => clearInterval(timer);
  }, [resume]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.darkMode);
  }, [settings.darkMode]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); redo(); }
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        saveSnapshot();
        setAutoSaveMsg('Saved!');
        setTimeout(() => setAutoSaveMsg(''), 2000);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo, saveSnapshot]);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await importResumeJSON(file);
      setResume(data);
    } catch {
      alert('Invalid JSON file. Please use a valid resume export.');
    }
    e.target.value = '';
  };

  const handlePdfExport = async () => {
    setActiveTab('preview');
    await new Promise(r => setTimeout(r, 300));
    setIsPdfLoading(true);
    try {
      const name = resume.personal.fullName || 'resume';
      await exportToPDF('resume-preview', `${name}_resume.pdf`);
    } finally {
      setIsPdfLoading(false);
    }
  };

  const scoreColor =
    atsResult.score >= 80 ? 'text-green-600 dark:text-green-400' :
    atsResult.score >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
    'text-red-500';

  const completeColor =
    completeness >= 80 ? 'bg-green-500' :
    completeness >= 50 ? 'bg-yellow-500' : 'bg-red-500';

  const atsBarColor =
    atsResult.score >= 80 ? 'bg-green-500' :
    atsResult.score >= 60 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-200">
      {/* ── Top Nav ── */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 h-14 flex items-center gap-2 sm:gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2 mr-2 sm:mr-4 shrink-0">
            <div className="w-7 h-7 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center shadow">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white hidden sm:block text-sm">ResumeForge</span>
          </div>

          {/* Tabs */}
          <nav className="flex items-center gap-0.5 flex-1 overflow-x-auto no-scrollbar">
            {([
              { key: 'edit' as TabKey, icon: <Edit3 className="w-3.5 h-3.5" />, label: 'Edit' },
              { key: 'preview' as TabKey, icon: <Eye className="w-3.5 h-3.5" />, label: 'Preview' },
              { key: 'ats' as TabKey, icon: <BarChart3 className="w-3.5 h-3.5" />, label: 'ATS' },
              { key: 'history' as TabKey, icon: <History className="w-3.5 h-3.5" />, label: 'History' },
            ]).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={clsx(
                  'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap',
                  activeTab === tab.key
                    ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.key === 'ats' && (
                  <span className={clsx('text-xs font-bold ml-0.5', scoreColor)}>{atsResult.score}</span>
                )}
              </button>
            ))}
          </nav>

          {/* Action bar */}
          <div className="flex items-center gap-1 shrink-0">
            {autoSaveMsg && (
              <span className="text-xs text-green-600 dark:text-green-400 font-medium hidden md:block mr-1">{autoSaveMsg}</span>
            )}

            <Tooltip text="Undo (Ctrl+Z)">
              <Button size="sm" variant="ghost" onClick={undo} disabled={!canUndo} icon={<Undo2 className="w-4 h-4" />} />
            </Tooltip>
            <Tooltip text="Redo (Ctrl+Y)">
              <Button size="sm" variant="ghost" onClick={redo} disabled={!canRedo} icon={<Redo2 className="w-4 h-4" />} />
            </Tooltip>
            <Tooltip text="Save version (Ctrl+S)">
              <Button size="sm" variant="ghost" onClick={() => { saveSnapshot(); setAutoSaveMsg('Saved!'); setTimeout(() => setAutoSaveMsg(''), 2000); }} icon={<Save className="w-4 h-4" />} />
            </Tooltip>

            <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-0.5" />

            <Tooltip text="Load sample resume">
              <Button size="sm" variant="ghost" onClick={() => setResume(SAMPLE_RESUME)} icon={<RefreshCw className="w-4 h-4" />} />
            </Tooltip>

            <label className="cursor-pointer">
              <Tooltip text="Import JSON">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:block">Import</span>
                </div>
              </Tooltip>
              <input type="file" accept=".json" className="hidden" onChange={handleImport} />
            </label>

            <Button size="sm" variant="ghost" onClick={() => exportResumeJSON(resume)} icon={<Download className="w-4 h-4" />}>
              <span className="hidden sm:block">JSON</span>
            </Button>

            <Button
              size="sm"
              variant="primary"
              onClick={handlePdfExport}
              disabled={isPdfLoading}
              icon={isPdfLoading ? <span className="animate-spin inline-block">↻</span> : <Printer className="w-4 h-4" />}
            >
              <span className="hidden sm:block">{isPdfLoading ? 'Exporting…' : 'PDF'}</span>
            </Button>

            <button
              onClick={() => updateSettings({ darkMode: !settings.darkMode })}
              className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Toggle dark mode"
            >
              {settings.darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="max-w-screen-2xl mx-auto p-3 sm:p-4">

        {/* ════════════ EDIT TAB ════════════ */}
        {activeTab === 'edit' && (
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">

            {/* Left: wizard (3 cols) */}
            <div className="xl:col-span-3 space-y-4">

              {/* Completeness meter */}
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Resume Completeness</span>
                  <span className={clsx('text-sm font-bold',
                    completeness >= 80 ? 'text-green-600 dark:text-green-400' :
                    completeness >= 50 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-500'
                  )}>{completeness}%</span>
                </div>
                <ProgressBar value={completeness} color={completeColor} />
              </Card>

              {/* Step tabs */}
              <Card className="p-1.5 overflow-x-auto">
                <div className="flex gap-1 min-w-max sm:min-w-0">
                  {WIZARD_STEPS.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setStep(i)}
                      className={clsx(
                        'flex-1 py-2 px-3 text-xs font-medium rounded-md transition-all whitespace-nowrap',
                        step === i
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      )}
                    >
                      <span className="sm:hidden">{s.short}</span>
                      <span className="hidden sm:block">{s.label}</span>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Form card */}
              <Card className="p-5 sm:p-6">
                {step === 0 && (
                  <PersonalStep
                    data={resume.personal}
                    onChange={d => updateResume(r => ({ ...r, personal: d }))}
                    onNext={() => setStep(1)}
                  />
                )}
                {step === 1 && (
                  <SummaryStep
                    value={resume.summary}
                    onChange={s => updateResume(r => ({ ...r, summary: s }))}
                    onNext={() => setStep(2)}
                    onPrev={() => setStep(0)}
                  />
                )}
                {step === 2 && (
                  <ExperienceStep
                    data={resume.experience}
                    onChange={d => updateResume(r => ({ ...r, experience: d }))}
                    onNext={() => setStep(3)}
                    onPrev={() => setStep(1)}
                  />
                )}
                {step === 3 && (
                  <ProjectsStep
                    data={resume.projects}
                    onChange={d => updateResume(r => ({ ...r, projects: d }))}
                    onNext={() => setStep(4)}
                    onPrev={() => setStep(2)}
                  />
                )}
                {step === 4 && (
                  <EducationStep
                    data={resume.education}
                    onChange={d => updateResume(r => ({ ...r, education: d }))}
                    onNext={() => setStep(5)}
                    onPrev={() => setStep(3)}
                  />
                )}
                {step === 5 && (
                  <SkillsStep
                    data={resume.skills}
                    onChange={d => updateResume(r => ({ ...r, skills: d }))}
                    onFinish={() => setActiveTab('preview')}
                    onPrev={() => setStep(4)}
                  />
                )}
              </Card>
            </div>

            {/* Right: mini-preview + ATS (2 cols) */}
            <div className="xl:col-span-2 space-y-4">

              {/* Mini preview */}
              <Card className="overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Live Preview</span>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Full view →
                  </button>
                </div>
                <div className="relative overflow-hidden" style={{ maxHeight: '380px' }}>
                  <div style={{ transform: 'scale(0.46)', transformOrigin: 'top left', width: '217%', pointerEvents: 'none' }}>
                    <ResumeRenderer resume={resume} layoutId={settings.layout} theme={activeTheme} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-800 to-transparent pointer-events-none" />
                </div>
              </Card>

              {/* ATS quick card */}
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ZapIcon className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">ATS Score</span>
                  </div>
                  <span className={clsx('text-3xl font-black', scoreColor)}>{atsResult.score}</span>
                </div>
                <ProgressBar value={atsResult.score} color={atsBarColor} />
                {atsResult.suggestions.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Top fixes:</p>
                    {atsResult.suggestions.slice(0, 3).map((s, i) => (
                      <p key={i} className="text-xs text-amber-700 dark:text-amber-300 leading-snug">→ {s}</p>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setActiveTab('ats')}
                  className="mt-3 w-full text-xs text-center text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View full ATS report →
                </button>
              </Card>

              {/* Design quick-switcher */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Design</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">{activeTheme.name}</span>
                </div>
                {/* Color swatches */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {THEMES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => updateSettings({ theme: t.id })}
                      title={t.name}
                      className={clsx(
                        'w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 shadow-sm',
                        settings.theme === t.id ? 'border-gray-800 dark:border-white scale-110' : 'border-white dark:border-gray-700'
                      )}
                      style={{ backgroundColor: t.accentColor }}
                    />
                  ))}
                </div>
                {/* Layout chips */}
                <div className="flex flex-wrap gap-1.5">
                  {LAYOUTS.map(l => (
                    <button
                      key={l.id}
                      onClick={() => updateSettings({ layout: l.id })}
                      className={clsx(
                        'px-2 py-0.5 text-xs font-medium rounded border transition-all',
                        settings.layout === l.id
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      )}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ════════════ PREVIEW TAB ════════════ */}
        {activeTab === 'preview' && (
          <div className="space-y-4">
            {/* Controls bar */}
            <Card className="p-4">
              <div className="flex flex-wrap items-start gap-6">
                {/* Layout */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1 uppercase tracking-wide">
                    <Layout className="w-3.5 h-3.5" /> Layout
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {LAYOUTS.map(l => (
                      <button
                        key={l.id}
                        onClick={() => updateSettings({ layout: l.id })}
                        className={clsx(
                          'px-2.5 py-1 text-xs font-medium rounded-md border transition-all',
                          settings.layout === l.id
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        )}
                      >
                        {l.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="hidden sm:block w-px self-stretch bg-gray-200 dark:bg-gray-700" />

                {/* Themes */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1 uppercase tracking-wide">
                    <Palette className="w-3.5 h-3.5" /> Theme — <span className="font-medium text-gray-700 dark:text-gray-300">{activeTheme.name}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {THEMES.map(t => (
                      <button
                        key={t.id}
                        onClick={() => updateSettings({ theme: t.id })}
                        title={t.name}
                        className={clsx(
                          'w-7 h-7 rounded-full border-2 shadow transition-transform hover:scale-110',
                          settings.theme === t.id
                            ? 'border-gray-900 dark:border-white scale-110'
                            : 'border-white dark:border-gray-700'
                        )}
                        style={{ backgroundColor: t.accentColor }}
                      />
                    ))}
                  </div>
                </div>

                {/* Export buttons */}
                <div className="flex gap-2 ml-auto self-end">
                  <Button size="sm" variant="secondary" onClick={() => exportResumeJSON(resume)} icon={<Download className="w-4 h-4" />}>
                    JSON
                  </Button>
                  <Button size="sm" onClick={handlePdfExport} disabled={isPdfLoading} icon={<Printer className="w-4 h-4" />}>
                    {isPdfLoading ? 'Generating…' : 'Download PDF'}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Resume canvas */}
            <div className="bg-neutral-400 dark:bg-neutral-700 rounded-2xl p-4 sm:p-8 overflow-x-auto">
              <div className="shadow-2xl rounded overflow-hidden max-w-4xl mx-auto" style={{ minWidth: '640px' }}>
                <ResumeRenderer
                  id="resume-preview"
                  resume={resume}
                  layoutId={settings.layout}
                  theme={activeTheme}
                />
              </div>
            </div>
          </div>
        )}

        {/* ════════════ ATS TAB ════════════ */}
        {activeTab === 'ats' && (
          <div className="max-w-2xl mx-auto">
            <ATSDashboard result={atsResult} />
          </div>
        )}

        {/* ════════════ HISTORY TAB ════════════ */}
        {activeTab === 'history' && (
          <div className="max-w-lg mx-auto space-y-4">
            <Card className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Snapshots are stored in your browser's local storage. Up to 20 versions are kept.
              </p>
              <Button
                onClick={() => {
                  saveSnapshot(`Manual save — ${new Date().toLocaleTimeString()}`);
                  setAutoSaveMsg('Version saved!');
                  setTimeout(() => setAutoSaveMsg(''), 2000);
                }}
                icon={<Save className="w-4 h-4" />}
              >
                Save Current Version
              </Button>
            </Card>
            <VersionHistory
              onRestore={data => {
                setResume(data);
                setActiveTab('edit');
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
