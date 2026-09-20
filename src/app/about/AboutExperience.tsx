'use client';

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
  const map: Record<ItemKind, string> = {
    Work: 'bg-blue-500/15 text-blue-200 border-blue-500/30',
    Internship: 'bg-purple-500/15 text-purple-200 border-purple-500/30',
    Project: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/30',
    Education: 'bg-amber-500/15 text-amber-200 border-amber-500/30',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs border ${map[kind]}`}>
      {kind}
    </span>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((b, i) => (
        <li key={i} className="text-sm text-gray-400 leading-relaxed flex gap-2">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-600 flex-shrink-0" />
          <span>{b}</span>
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
          <h3 className="text-base font-semibold text-gray-100">{item.title}</h3>
        </div>

        {(item.org || item.location) && (
          <p className="text-sm text-gray-400 mt-1">
            {item.org ? <span className="text-gray-300">{item.org}</span> : null}
            {item.location ? <span className="text-gray-500"> · {item.location}</span> : null}
          </p>
        )}

        <p className="text-xs text-gray-500 mt-1">{item.date}</p>

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
              {open ? 'Show less' : `Show details (+${extraBullets.length})`}
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

  const items: TimelineItem[] = useMemo(
    () => [
      {
        kind: 'Internship',
        title: 'Social Media Operation',
        org: 'Tesla',
        location: 'Beijing, China (Remote)',
        date: 'Sept 2025 – Present',
        bullets: [
          'Produced short-form videos for matrix accounts, achieving ~500K weekly reach from a cold start; top posts exceeded 200K views.',
          'Supported PR operations (media test-drive vehicle coordination) and streamlined SOPs for higher efficiency and consistency.',
          'Contributed to content library system optimisation and collaborated cross-functionally with IT to enhance workflows.',
        ],
        highlight: true,
      },
      {
        kind: 'Work',
        title: 'Web Developer',
        org: 'MaREI Centre, University College Cork',
        location: 'Cork, Ireland',
        date: 'May 2025 – Sept 2025',
        bullets: [
          'Designed static and interactive infographics to communicate sustainability data on end-of-life tyre reuse.',
          'Translated technical findings into clear visuals for academic and public audiences.',
          'Collaborated with researchers to ensure scientific accuracy, accessibility, and visual clarity.',
        ],
      },
      {
        kind: 'Work',
        title: 'Project Manager & Content Producer',
        org: 'Tesla',
        location: 'Beijing, China',
        date: 'Jun 2021 – Oct 2023',
        bullets: [
          'Produced bilingual graphic and video content across Tesla’s social platforms.',
          'Photographed e-commerce product images for use across Tesla’s official website, online platforms, and offline marketing materials.',
          'Increased engagement: Weibo followers from 20K → 135K; TikTok from 10K → 144K.',
          'Managed both short and long-form videos; led multi-department coordination.',
        ],
      },
      {
        kind: 'Work',
        title: 'Social Media Specialist',
        org: 'CloudOptiek',
        location: 'Beijing, China',
        date: 'Apr 2019 – Jun 2021',
        bullets: [
          'Managed social publishing, audience interaction, and SEO optimisation; generated 100+ qualified leads for the sales team.',
          'Produced promotional videos and campaign assets (shooting, editing, packaging).',
          'Optimised end-to-end social workflow (request → production → publishing), improving overall efficiency by ~50%.',
          'Supported industry exhibition planning and contributed to UI design for cloud-based products.',
        ],
      },
      {
        kind: 'Project',
        title: 'Model S & X Accessories Video',
        org: 'Tesla',
        date: 'Q1 – Q2 2023',
        bullets: [
          'Planned and produced a DIY video for Model S & X accessories launch.',
          'Coordinated script, scheduling, and resource management; reached 600K+ views.',
        ],
      },
      {
        kind: 'Project',
        title: 'Internal Content Library',
        org: 'Tesla',
        date: 'Q2 – Q4 2022',
        bullets: [
          'Built an internal content library for the support team, improving search efficiency.',
          'Saved 100+ man-hours annually through better structure and tagging.',
        ],
      },
      {
        kind: 'Education',
        title: 'MSc in Interactive Media (First Class Honours / 1.1)',
        org: 'University College Cork',
        location: 'Ireland',
        date: '2024 – Present',
        bullets: [
          'Core modules: Web Development, Graphics for Interactive Media, Internet-based Applications, 3D Graphics & Modelling, Mobile Multimedia, HCI.',
        ],
      },
      {
        kind: 'Education',
        title: 'Bachelor of Management (Hospitality Management)',
        org: 'Beijing Union University',
        location: 'China',
        date: '2014 – 2019',
        bullets: ['GPA: 3.5 / 4.0'],
      },
    ],
    []
  );

  return (
    <section
      ref={ref}
      className="bg-[#1a1a1a]/60 rounded-2xl p-6 border border-gray-800 shadow-lg relative overflow-hidden"
    >
      <div className="flex items-end justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold text-gray-100">Education & Professional Experience</h2>
        <p className="text-xs text-gray-500">Tap “Show details” to expand</p>
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
            key={`${item.kind}-${item.title}-${item.date}-${idx}`}
            item={item}
            idx={idx}
            defaultOpen={Boolean(item.highlight)} // only open the most important one by default
          />
        ))}
      </div>
    </section>
  );
}
