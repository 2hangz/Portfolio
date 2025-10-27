'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const projects = [
  {
    slug: 'entyre-platform',
    title: 'ENTYRE Digital Platform',
    role: 'Web Developer',
    desc: 'A dual-portal system for sustainability research communication.',
    tags: ['React', 'Next.js', 'Node.js', 'MongoDB'],
    cover: '/projects/entyre-cover.jpg',
    images: [
      '/projects/entyre-1.jpg',
      '/projects/entyre-2.jpg',
      '/projects/entyre-3.jpg',
    ],
    content: `
      The ENTYRE platform was developed as part of the MaREI research centre at UCC.
      It enables researchers to manage and visualise end-of-life tyre data through an interactive, public-facing web system.
      I designed both the front-end architecture and the CMS for internal contributors.
    `,
  },
  {
    slug: 'tesla-photo-series',
    title: 'Tesla Beijing Photo Series',
    role: 'Photographer',
    desc: 'A photography campaign capturing Tesla product design and brand culture.',
    tags: ['Photography', 'Lightroom', 'Social Media'],
    cover: '/projects/tesla-cover.jpg',
    images: [
      '/projects/tesla-1.jpg',
      '/projects/tesla-2.jpg',
      '/projects/tesla-3.jpg',
    ],
    content: `
      A curated collection of photographs for Tesla's Beijing social media channels.
      The work focused on visual storytelling, balancing lifestyle aesthetics with brand identity.
    `,
  },
  {
    slug: 'alien-animation',
    title: 'Alien Animation Short',
    role: '3D Artist',
    desc: 'A Blender short exploring empathy and transformation through character design.',
    tags: ['Blender', 'After Effects', 'Storytelling'],
    cover: '/projects/alien-cover.jpg',
    images: ['/projects/alien-1.jpg', '/projects/alien-2.jpg'],
    content: `
      A 3D short created for my MSc assignment, inspired by Pixar's character animation and Pop Mart aesthetics.
    `,
  },
];

export default function ProjectsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-24 text-gray-200">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-10 text-center"
      >
        Projects
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-[#1a1a1a]/60 border border-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition"
          >
            <Link href={`/projects/${p.slug}`}>
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-100">{p.title}</h2>
                <p className="text-sm text-gray-400">{p.desc}</p>
                <p className="text-xs text-gray-500 mt-2">{p.role}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
