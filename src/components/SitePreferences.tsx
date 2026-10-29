'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import translations from '@/content/zh.json';
type Language = 'en' | 'zh';
const Preferences = createContext<{ language: Language; toggleLanguage: () => void } | null>(null);
export function SitePreferencesProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  useEffect(() => {
    let saved: Language = 'en';
    try { if (localStorage.getItem('site-language') === 'zh') saved = 'zh'; } catch {}
    setLanguage(saved);
    document.documentElement.lang = saved === 'zh' ? 'zh-CN' : 'en';
  }, []);
  const toggleLanguage = useCallback(() => {
    setLanguage(current => {
      const next = current === 'en' ? 'zh' : 'en';
      document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
      try { localStorage.setItem('site-language', next); } catch {}
      return next;
    });
  }, []);
  return <Preferences.Provider value={{ language, toggleLanguage }}>{children}</Preferences.Provider>;
}
export function useSitePreferences() {
  const value = useContext(Preferences);
  if (!value) throw new Error('SitePreferencesProvider is required');
  return value;
}
export function useT() {
  const { language } = useSitePreferences();
  return useCallback((en: string) => language === 'zh' ? (translations as Record<string, string>)[en] ?? en : en, [language]);
}
