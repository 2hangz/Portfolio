'use client';
import { useT } from '@/components/SitePreferences';
export default function AboutIntro() {
  const t = useT();
  return <section className="bg-[var(--surface)] rounded-2xl p-8 border border-gray-800 shadow-lg">
    <h1 className="text-lg font-semibold mb-4">{t('About Me')}</h1>
    <div className="space-y-4 text-gray-400 leading-relaxed">
      <p>{t("I’m Hang Zhou, a designer and developer working across interactive media, content strategy and AI-assisted workflows.")}</p>
      <p>{t("I earned an MSc in Interactive Media with First Class Honours at University College Cork. My work connects design, technology and communication to make complex information easier to understand and use.")}</p>
      <p>{t("I currently work in content marketing at ByteDance, translating product capabilities into practical use cases and improving content workflows with automation. Previously, I worked on digital research communication at MaREI, UCC, and on content production and visual communication at Tesla.")}</p>
    </div>
  </section>;
}
