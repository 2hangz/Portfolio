'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function AboutExperience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 60%'],
  });
  // Change vertical line to extend closer to the bottom edge by increasing end percentage
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '105%']);

  const experiences = [
    {
      title: 'MaREI Centre, University College Cork — Research Assistant',
      date: '2024 – Present',
      desc: 'Designed and implemented the ENTYRE platform for sustainability research communication.',
    },
    {
      title: 'Tesla Beijing — Content Producer',
      date: '2021 – 2022',
      desc: 'Produced photography, short videos, and analytics reports for Tesla’s social media presence.',
    },
    {
      title: 'University College Cork — MSc in Interactive Media',
      date: '2024 – 2025',
      desc: 'Focused on interactive design, creative technology, and digital communication.',
    },
  ];

  return (
    <section
      ref={ref}
      className="bg-[#1a1a1a]/60 rounded-2xl p-6 border border-gray-800 shadow-lg relative overflow-hidden"
    >
      <h2 className="text-lg font-semibold mb-4">Education & Profession Experience</h2>

      <div className="relative pl-8 space-y-8 pb-1">
        {/* Animated vertical line */}
        <motion.span
          style={{ height: lineHeight }}
          className="absolute top-0 left-0 w-[2px] bg-gradient-to-b from-blue-500 to-gray-700 rounded-full origin-top"
          aria-hidden="true"
        />

        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.title}
            className="relative group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Timeline dot */}
            <span
              className={`absolute -left-[9px] top-1.5 w-3 h-3 rounded-full border-2 ${
                idx === 0
                  ? 'bg-blue-500 border-white animate-pulse'
                  : 'bg-gray-400 border-[#1a1a1a]'
              }`}
            ></span>

            <div className="ml-2">
              <h3 className="text-lg font-medium text-gray-100">{exp.title}</h3>
              <p className="text-sm text-gray-500">{exp.date}</p>
              <p className="text-sm text-gray-400 mt-1">{exp.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}