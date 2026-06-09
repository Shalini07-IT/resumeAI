import { useState, useCallback, useEffect, useRef } from 'react';
import { ResumeProfile } from '../types/resume';
import { createEmptyResume } from '../data/defaults';
import { saveResume, loadResume, saveVersion } from '../utils/storage';

const MAX_HISTORY = 50;

export function useResumeState() {
  const [history, setHistory] = useState<ResumeProfile[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialized = useRef(false);

  const currentResume: ResumeProfile = historyIndex >= 0 ? history[historyIndex] : createEmptyResume();

  useEffect(() => {
    if (!isInitialized.current) {
      const saved = loadResume();
      const initial = saved || createEmptyResume();
      setHistory([initial]);
      setHistoryIndex(0);
      isInitialized.current = true;
    }
  }, []);

  const updateResume = useCallback((updater: (prev: ResumeProfile) => ResumeProfile) => {
    setHistory(prev => {
      const current = prev[historyIndex] || createEmptyResume();
      const next = updater(current);
      const newHistory = [...prev.slice(0, historyIndex + 1), next].slice(-MAX_HISTORY);
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, MAX_HISTORY - 1));

    // Auto-save
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      setHistory(h => {
        setHistoryIndex(i => {
          const resume = h[i];
          if (resume) saveResume(resume);
          return i;
        });
        return h;
      });
    }, 5000);
  }, [historyIndex]);

  const setResume = useCallback((resume: ResumeProfile) => {
    setHistory(prev => {
      const newHistory = [...prev.slice(0, historyIndex + 1), resume].slice(-MAX_HISTORY);
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) setHistoryIndex(i => i - 1);
  }, [historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) setHistoryIndex(i => i + 1);
  }, [historyIndex, history.length]);

  const saveSnapshot = useCallback((label?: string) => {
    saveVersion(currentResume, label);
    saveResume(currentResume);
  }, [currentResume]);

  return {
    resume: currentResume,
    updateResume,
    setResume,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    saveSnapshot,
  };
}
