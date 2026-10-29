'use client';
import { useT } from '@/components/SitePreferences';
export default function CMSPage() {
  const t = useT();
    return (
      <main className="min-h-screen px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-100">{t("CMS")}</h1>
          <p className="text-sm text-gray-400 mt-2">{t("Internal content management system (React + Node/Express backend).")}</p>
  
          <a
            href="https://2hangz.github.io/CMS/#/login"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-blue-400 underline"
          >{t("Open CMS in a new tab")}</a>

          <p className="text-xs text-gray-500 mt-3">{t('Editing requires an authorised account. The embedded projects keep their original language.')}</p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-800 bg-black">
            <iframe
              title="ENTYRE CMS login"
              src="https://2hangz.github.io/CMS/"
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
  