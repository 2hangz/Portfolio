'use client';
import { useT } from '@/components/SitePreferences';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ReactNode, useMemo, useRef, useState } from 'react';

type ItemKind = 'Work' | 'Internship' | 'Project' | 'Education';

type TimelineItem = {
  kind: ItemKind;
  title: string;
  org?: string;
  location?: string;
  date: string;
  bullets: string[];
  highlight?: boolean; // current/most important
};

function KindBadge({ kind }: { kind: ItemKind }) {
  const t = useT();
  const map: Record<ItemKind, string> = {
    Work: 'bg-blue-500/15 text-blue-200 border-blue-500/30',
    Internship: 'bg-purple-500/15 text-purple-200 border-purple-500/30',
    Project: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/30',
    Education: 'bg-amber-500/15 text-amber-200 border-amber-500/30',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs border ${map[kind]}`}>
      {t(kind)}
    </span>
  );
}

function BulletList({ items }: { items: string[] }) {
  const t = useT();
  return (
    <ul className="space-y-1.5">
      {items.map((b, i) => (
        <li key={i} className="text-sm text-gray-400 leading-relaxed flex gap-2">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-600 flex-shrink-0" />
          <span>{t(b)}</span>
        </li>
      ))}
    </ul>
  );
}

function ExperienceItem({
  item,
  idx,
  defaultOpen = false,
}: {
  item: TimelineItem;
  idx: number;
  defaultOpen?: boolean;
}) {
  const t = useT();
  const [open, setOpen] = useState(defaultOpen);

  // First layer: show only the most important bits
  const previewCount = item.kind === 'Education' ? 1 : 2;
  const previewBullets = item.bullets.slice(0, previewCount);
  const extraBullets = item.bullets.slice(previewCount);
  const hasMore = extraBullets.length > 0;

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: idx * 0.06 }}
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Timeline dot */}
      <span
        className={[
          'absolute -left-[9px] top-2 w-3 h-3 rounded-full border-2',
          item.highlight ? 'bg-blue-500 border-white animate-pulse' : 'bg-gray-400 border-[#1a1a1a]',
        ].join(' ')}
        aria-hidden="true"
      />

      <div className="ml-2">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-2">
          <KindBadge kind={item.kind} />
          <h3 className="text-base font-semibold text-gray-100">{t(item.title)}</h3>
        </div>

        {(item.org || item.location) && (
          <p className="text-sm text-gray-400 mt-1">
            {item.org ? <span className="text-gray-300">{t(item.org)}</span> : null}
            {item.location ? <span className="text-gray-500"> · {t(item.location)}</span> : null}
          </p>
        )}

        <p className="text-xs text-gray-500 mt-1">{t(item.date)}</p>

        {/* Preview bullets */}
        <div className="mt-3">
          <BulletList items={previewBullets} />
        </div>

        {/* Expand */}
        {hasMore && (
          <div className="mt-3">
            <button
              onClick={() => setOpen((v) => !v)}
              className="text-xs text-blue-300 hover:text-blue-200 transition inline-flex items-center gap-2"
              aria-expanded={open}
              type="button"
            >
              {open ? t('Show less') : `${t('Show details')} (+${extraBullets.length})`}
              <span className={`transition ${open ? 'rotate-180' : ''}`}>▾</span>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22 }}
                  className="mt-3 overflow-hidden"
                >
                  <BulletList items={extraBullets} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function AboutExperience() {
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 60%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const t = useT();
  const items: TimelineItem[] = [
  {
    "kind": "Work",
    "title": "Content Marketing · Model Evaluation Strategy (MoA)",
    "org": "ByteDance",
    "location": "Beijing, China",
    "date": "Apr 2026 – Present",
    "bullets": [
      "Translate AI product capabilities into practical use cases and content strategies across productivity, Office and agent workflows.",
      "Coordinate with creators and agency partners to align content planning and delivery with product priorities.",
      "Build automated reporting and production tracking workflows to reduce repetitive operational work."
    ],
    "highlight": true
  },
  {
    "kind": "Work",
    "title": "Web Developer",
    "org": "MaREI Centre, University College Cork",
    "location": "Cork, Ireland",
    "date": "May 2025 – Sept 2025",
    "bullets": [
      "Developed the ENTYRE public research website and a CMS for publishing content and managing interactive workflows.",
      "Combined interactive data visualisation, information design and web development to communicate sustainability research.",
      "Collaborated with researchers to make technical information clearer and more accessible."
    ],
    "highlight": false
  },
  {
    "kind": "Work",
    "title": "Project Manager & Content Producer",
    "org": "Tesla",
    "location": "Beijing, China",
    "date": "Jun 2021 – Oct 2023",
    "bullets": [
      "Planned and produced visual content, product photography and videos for Tesla’s E-shop and Service channels.",
      "Coordinated scripts, schedules, filming and launch delivery for Model S & X accessories videos.",
      "Developed reusable video templates and asset libraries, and contributed to internal media library improvements."
    ],
    "highlight": false
  },
  {
    "kind": "Work",
    "title": "Social Media Specialist",
    "org": "CloudOptiek",
    "location": "Beijing, China",
    "date": "Apr 2019 – Jun 2021",
    "bullets": [
      "Managed social publishing, audience enquiries and SEO while producing promotional videos and marketing visuals.",
      "Designed and refined user interfaces for cloud-based products and supported industry exhibition planning."
    ],
    "highlight": false
  },
  {
    "kind": "Project",
    "title": "Doubao PC Agent Content",
    "org": "ByteDance",
    "location": "Beijing, China",
    "date": "Q2 2026",
    "bullets": [
      "Developed practical content ideas around PC agent capabilities and coordinated content production across partners."
    ],
    "highlight": false
  },
  {
    "kind": "Project",
    "title": "Model S & X Accessories Video",
    "org": "Tesla",
    "location": "Beijing, China",
    "date": "Q1 – Q2 2023",
    "bullets": [
      "Planned and produced DIY accessories videos for Tesla’s website and social channels, coordinating scripts, vehicles and filming resources."
    ],
    "highlight": false
  },
  {
    "kind": "Education",
    "title": "MSc in Interactive Media · First Class Honours",
    "org": "University College Cork",
    "location": "Ireland",
    "date": "Graduated",
    "bullets": [
      "Studied web development, interactive graphics, 3D modelling, multimedia and human–computer interaction."
    ],
    "highlight": false
  },
  {
    "kind": "Education",
    "title": "Bachelor of Management · Hospitality Management",
    "org": "Beijing Union University",
    "location": "China",
    "date": "2014 – 2019",
    "bullets": [
      "GPA: 3.5 / 4.0"
    ],
    "highlight": false
  }
];

  return (
    <section
      ref={ref}
      className="bg-[var(--surface)]/60 rounded-2xl p-6 border border-gray-800 shadow-lg relative overflow-hidden"
    >
      <div className="flex items-end justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold text-gray-100">{t('Education & Professional Experience')}</h2>
        <p className="text-xs text-gray-500">{t('Tap “Show details” to expand')}</p>
      </div>

      <div className="relative pl-8 space-y-8">
        {/* Animated vertical line */}
        <motion.span
          style={{ height: lineHeight }}
          className="absolute top-0 left-0 w-[2px] bg-gradient-to-b from-blue-500 to-gray-700 rounded-full origin-top"
          aria-hidden="true"
        />

        {items.map((item, idx) => (
          <ExperienceItem
            key={`${item.kind}-${t(item.title)}-${t(item.date)}-${idx}`}
            item={item}
            idx={idx}
            defaultOpen={Boolean(item.highlight)} // only open the most important one by default
          />
        ))}
      </div>
    </section>
  );
}
