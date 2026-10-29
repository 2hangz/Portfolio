'use client';
import Link from 'next/link';
import { useT } from '@/components/SitePreferences';

const projects = [
  ['/roles/web-developer/entyre', 'ENTYRE Research Platform', 'A public-facing website that makes end-of-life tyre research accessible through structured content and interactive visualisation.'],
  ['/roles/web-developer/cms', 'ENTYRE Content & Workflow CMS', 'A React CMS connected to a Node.js/Express backend, supporting research content publishing and interactive workflow management. Login is required for editing.'],
  ['/roles/web-developer/three-lab', 'Three.js Interactive Demo', 'An interactive 3D classroom with animated models, video and audio, lighting controls and ball physics.'],
];

export default function ProjectsPage() {
  const t = useT();
  return <main className="max-w-3xl mx-auto px-6 py-24">
    <h1 className="text-3xl font-semibold">{t('Projects')}</h1>
    <p className="mt-4 mb-8 text-gray-400">{t('Explore my research websites, content tools and interactive 3D work.')}</p>
    <div className="space-y-4">
      {projects.map(([href, title, description]) => <Link key={href} href={href}
        className="block rounded-2xl border border-gray-800 bg-[var(--surface)] p-5 hover:border-blue-500 transition">
        <h2 className="font-semibold">{t(title)}</h2>
        <p className="mt-2 text-sm text-gray-400 leading-relaxed">{t(description)}</p>
      </Link>)}
    </div>
  </main>;
}
