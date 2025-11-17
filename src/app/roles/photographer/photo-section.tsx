'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { landscapePhotos, portraitPhotos, productPhotos } from './photo-list';

export default function PhotographerSection() {
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

      {/* Section: Landscape Photos */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-5 text-blue-300 text-center">Landscapes</h2>
        <PhotoProvider
          speed={() => 400}
          easing={(type) =>
            type === 2
              ? 'cubic-bezier(0.36, 0, 0.66, -0.56)'
              : 'cubic-bezier(0.34, 1.56, 0.64, 1)'
          }
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          >
            {landscapePhotos.map((photo, index) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
                viewport={{ once: true }}
                className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
              >
                <PhotoView src={photo.src}>
                  <Image
                    src={photo.src}
                    alt={photo.title ? photo.title : `Landscape photo ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </PhotoView>
              </motion.div>
            ))}
          </motion.div>
        </PhotoProvider>
      </section>

      {/* Section: Portrait Photos */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-5 text-pink-200 text-center">Portraits</h2>
        <PhotoProvider
          speed={() => 400}
          easing={(type) =>
            type === 2
              ? 'cubic-bezier(0.36, 0, 0.66, -0.56)'
              : 'cubic-bezier(0.34, 1.56, 0.64, 1)'
          }
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          >
            {portraitPhotos.map((photo, index) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
                viewport={{ once: true }}
                className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
              >
                <PhotoView src={photo.src}>
                  <Image
                    src={photo.src}
                    alt={photo.title ? photo.title : `Portrait photo ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </PhotoView>
              </motion.div>
            ))}
          </motion.div>
        </PhotoProvider>
      </section>

      {/* Section: Product Photos */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-5 text-yellow-200 text-center">Product Photos</h2>
        <PhotoProvider
          speed={() => 400}
          easing={(type) =>
            type === 2
              ? 'cubic-bezier(0.36, 0, 0.66, -0.56)'
              : 'cubic-bezier(0.34, 1.56, 0.64, 1)'
          }
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          >
            {productPhotos.map((photo, index) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
                viewport={{ once: true }}
                className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
              >
                <PhotoView src={photo.src}>
                  <Image
                    src={photo.src}
                    alt={photo.title ? photo.title : `Product photo ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </PhotoView>
              </motion.div>
            ))}
          </motion.div>
        </PhotoProvider>
      </section>

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
