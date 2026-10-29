'use client';
import { useT } from '@/components/SitePreferences';
export default function ThreeLabPage() {
  const t = useT();
    return (
      <main className="min-h-screen px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-100">{t("Three.js Interactive Demo")}</h1>
          <p className="text-sm text-gray-400 mt-2">{t("Explore a 3D classroom with animated characters, textured walls, video playback and interactive lighting. Drag to orbit and scroll or pinch to zoom.")}</p>
  
          <a href="/demos/three-lab/" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-blue-400 underline">{t('Open project in a new tab')}</a>
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-800 bg-black">
            <iframe
              title="Three.js interactive classroom"
              src="/demos/three-lab/"
              className="w-full h-[80vh]"
              allow="autoplay; fullscreen; xr-spatial-tracking"
            />
          </div>
        </div>
      </main>
    );
  }
  
