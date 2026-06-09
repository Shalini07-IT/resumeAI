import { useState, useCallback } from 'react';
import { AppSettings, saveSettings, loadSettings } from '../utils/storage';

export function useAppSettings() {
  const [settings, setSettingsState] = useState<AppSettings>(() => loadSettings());

  const updateSettings = useCallback((updates: Partial<AppSettings>) => {
    setSettingsState(prev => {
      const next = { ...prev, ...updates };
      saveSettings(next);
      return next;
    });
  }, []);

  return { settings, updateSettings };
}
