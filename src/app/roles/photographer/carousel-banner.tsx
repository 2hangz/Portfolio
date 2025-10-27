'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as photoList from './photo-list';


const photos = [
  ...photoList.landscapePhotos,
  ...photoList.portraitPhotos
].filter(photo => photo.featured);

export default function PhotographerShowcase() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % photos.length);
  const prev = () => setIndex((index - 1 + photos.length) % photos.length);

  return (
    <main className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.img
          key={photos[index].src}
          src={photos[index].src}
          className="absolute inset-0 w-full h-full object-cover blur-xl brightness-75 transition-all duration-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      </AnimatePresence>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center text-center text-white space-y-10">
        {/* Heading Section */}
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-md">
            This Is the Featured Photos
          </h1>
          <p className="text-gray-200 mb-6 leading-relaxed">
            Design and storytelling shape every photo. Scroll through portraits, places, and everyday details captured with creativity and intention.
          </p>
          <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition">
            Discover More
          </button>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center gap-6">
          {(() => {
            const windowSize = 5;
            const halfWindow = Math.floor(windowSize / 2);
            const photoCount = photos.length;

            // Compute the visible indices
            let visible = [];
            for (let offset = -halfWindow; offset <= halfWindow; ++offset) {
              let i = (index + offset + photoCount) % photoCount;
              visible.push(i);
            }

            return visible.map((i) => {
              const photo = photos[i];
              const isActive = i === index;
              return (
                <motion.img
                  key={`${photo.src}-${i}`}
                  src={photo.src}
                  onClick={() => setIndex(i)}
                  className={`cursor-pointer rounded-xl object-cover transition-all duration-500 ${
                    isActive
                      ? 'w-56 h-80 ring-4 ring-white z-10'
                      : 'w-40 h-64 opacity-60 hover:opacity-100'
                  }`}
                  whileHover={{ scale: isActive ? 1.02 : 1.05 }}
                />
              );
            });
          })()}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          className="absolute left-[-70] top-1/2 transform -translate-y-1/2 text-white text-4xl z-20 hover:scale-125 transition"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-[-70] top-1/2 transform -translate-y-1/2 text-white text-4xl z-20 hover:scale-125 transition"
        >
          ›
        </button>
      </div>
    </main>
  );
}
