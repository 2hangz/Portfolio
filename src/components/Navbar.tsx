'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Layout, Briefcase, Sun, Moon, Plus } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(true);

  const navItems = [
    { href: '/', icon: <Home size={18} />, label: 'Home' },
    { href: '/about', icon: <User size={18} />, label: 'About' },
    { href: '/projects', icon: <Layout size={18} />, label: 'Projects' },
    { href: '/contact', icon: <Briefcase size={18} />, label: 'Contact' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 flex items-center justify-between w-[90%] max-w-3xl px-5 py-3 rounded-2xl bg-[#1a1a1a]/80 border border-gray-800 backdrop-blur-md shadow-lg z-50">
      <div className="flex items-center gap-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
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

      <div className="flex items-center gap-3">
        <button
          onClick={() => setDarkMode(!darkMode)}
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
          Hire Me
        </a>
      </div>
    </nav>
  );
}