'use client';
import { useT } from '@/components/SitePreferences';
export default function ENTYREPage() {
  const t = useT();
    return (
      <main className="min-h-screen px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-100">{t("ENTYRE Platform")}</h1>
          <p className="text-sm text-gray-400 mt-2">{t("A public-facing website for interactive research communication.")}</p>
  
          <a href="https://ceees-entyre.github.io/ENTYRE/#/home" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-blue-400 underline">{t('Open project in a new tab')}</a>
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-800 bg-black">
            <iframe
              title="ENTYRE research platform"
              src="https://ceees-entyre.github.io/ENTYRE/#/home"
              className="w-full h-[80vh]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allow="fullscreen"
            />
          </div>
        </div>
      </main>
    );
  }
  
