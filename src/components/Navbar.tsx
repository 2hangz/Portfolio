'use client';

import Link from 'next/link';
import { useSitePreferences, useT } from '@/components/SitePreferences';
import { usePathname } from 'next/navigation';
import { Home, User, Sun, Moon, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { language, toggleLanguage } = useSitePreferences();
  const t = useT();
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    let saved = 'dark';
    try { saved = localStorage.getItem('site-theme') || 'dark'; } catch {}
    const dark = saved !== 'light';
    setDarkMode(dark);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }, []);

  function toggleTheme() {
    const dark = !darkMode;
    setDarkMode(dark);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    try { localStorage.setItem('site-theme', dark ? 'dark' : 'light'); } catch {}
  }

  const navItems = [
    { href: '/', icon: <Home size={18} />, label: 'Home' },
    { href: '/about', icon: <User size={18} />, label: 'About' },
    // { href: '/projects', icon: <Layout size={18} />, label: 'Projects' },
    // { href: '/contact', icon: <Briefcase size={18} />, label: 'Contact' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 flex items-center justify-between w-[90%] max-w-3xl px-5 py-3 rounded-2xl bg-[var(--surface)]/80 border border-gray-800 backdrop-blur-md shadow-lg z-50">
      <div className="flex items-center gap-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-label={t(item.label)}
            title={t(item.label)}
            className={`p-2 rounded-lg transition ${
              pathname === item.href
                ? 'bg-gray-800 text-gray-100'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
            }`}
          >
            {item.icon}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button type="button" onClick={toggleLanguage}
          aria-label={language === 'en' ? '切换到中文' : 'Switch to English'}
          className="px-2 py-1.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800 transition">
          <span lang={language === 'en' ? 'zh-CN' : 'en'}>{language === 'en' ? '中文' : 'EN'}</span>
        </button>
        <button
          onClick={toggleTheme}
          aria-label={t(darkMode ? 'Switch to light mode' : 'Switch to dark mode')}
          aria-pressed={!darkMode}
          className="p-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800/60 transition"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Hire Me Button */}
        <a
          href="mailto:hangz2024@outlook.com"
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-100 px-3 py-1.5 rounded-lg text-sm font-medium transition"
        >
          <Plus size={14} />
          {t('Hire Me')}
        </a>
      </div>
    </nav>
  );
}