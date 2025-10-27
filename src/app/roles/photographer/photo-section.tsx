'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

export default function PhotographerSection() {
  const photos = [
    '/photos/01.jpg',
    '/photos/02.jpg',
  ];

  return (
    <main className="max-w-6xl mx-auto px-6 py-24 text-gray-200">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-3">Photographer</h1>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          A visual storyteller capturing people, products, and places.
          My photography blends design sensibility and narrative — turning
          everyday moments into meaningful visual experiences.
        </p>
      </motion.section>

      {/* Lightbox Gallery */}
      <PhotoProvider
        speed={() => 400}
        easing={(type) =>
          type === 2
            ? 'cubic-bezier(0.36, 0, 0.66, -0.56)'
            : 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        }
      >
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {photos.map((src, index) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
              >
                <PhotoView src={src}>
                  <Image
                    src={src}
                    alt={`Portfolio photo ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </PhotoView>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </PhotoProvider>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center"
      >
        <p className="text-gray-400 mb-4">Want to collaborate or see more?</p>
        <Link
          href="mailto:hangz2024@outlook.com"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition"
        >
          Get in Touch
        </Link>
      </motion.section>
    </main>
  );
}
