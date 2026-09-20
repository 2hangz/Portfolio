'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { userGuideGraphics, productPromotionGraphics, storytellingGraphics } from './graphic-design-list';


export default function GraphicDesignerPage() {

  return (
    <main className="max-w-6xl mx-auto px-6 py-24 text-gray-200">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-3">Graphic Designer</h1>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Designing for clarity, impact, and emotion—across print, digital, and branding projects.
          Here are samples from user guide illustration sets and product promotion campaigns.
        </p>
      </motion.section>

      {/* User Guide Graphics */}
      <PhotoProvider>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold mb-5 text-center text-blue-400">
            User Guide Graphics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {Object.entries(userGuideGraphics).map(([subset, images]) => {
              const title =
                subset === 'sunshade'
                  ? 'Sunshade'
                  : subset === 'troubleshooting'
                  ? 'Troubleshooting'
                  : 'Advanced Tips';

              return (
                <div
                  key={subset}
                  className="border border-gray-800 rounded-xl bg-[#18181e] flex flex-col min-h-[340px] hover:border-blue-500/50 transition"
                >
                  {/* Header */}
                  <div className="w-full flex items-center gap-2 px-4 py-2 border-b border-gray-800">
                    <span className="font-semibold text-blue-200 text-base capitalize">
                      {title}
                    </span>
                    <span className="ml-auto text-xs text-blue-100">
                      {images.length} images
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row flex-1">
                    {/* Main image */}
                    <div className="relative group cursor-pointer flex-1 flex items-start mt-5 rounded overflow-hidden">
                      <PhotoView src={images[0]}>
                        <div className="relative w-full h-64 overflow-hidden rounded-b-xl">
                          <Image
                            src={images[0]}
                            alt={`${title} Cover`}
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                            <span className="text-sm text-gray-200 text-center">
                              Click to view the full {images.length}-image set
                            </span>
                          </div>
                        </div>
                      </PhotoView>
                      {images.slice(1).map((img, idx) => (
                        <PhotoView key={img} src={img}>
                          <Image
                            src={img}
                            alt={`${title} ${idx + 2}`}
                            width={0}
                            height={0}
                            className="hidden"
                          />
                        </PhotoView>
                      ))}
                    </div>
                    {/* small images */}
                    <div className="hidden sm:flex flex-col gap-3 pt-5 px-2">
                      {images.map((img, tIdx) => (
                        <div key={img} className="relative w-20 h-14 rounded overflow-hidden border border-gray-700">
                          <Image
                            src={img}
                            alt={`${title} Thumbnail ${tIdx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Product Promotion Graphics */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold mb-5 text-center text-blue-400">
            Products Promotion Graphics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {Object.entries(productPromotionGraphics).map(([subset, images]) => {
              let title = '';
              if (subset === 'accessories') {
                title = 'Accessories';
              } else if (subset === 'campaign') {
                title = 'Campaign';
              } else {
                title = subset;
              }

              return (
                <div
                  key={subset}
                  className="border border-gray-800 rounded-xl bg-[#18181e] flex flex-col min-h-[340px] hover:border-blue-500/50 transition"
                >
                  {/* Header */}
                  <div className="w-full flex items-center gap-2 px-4 py-2 border-b border-gray-800">
                    <span className="font-semibold text-blue-200 text-base capitalize">
                      {title}
                    </span>
                    <span className="ml-auto text-xs text-blue-100">
                      {images.length} images
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row flex-1">
                    {/* Main image */}
                    <div className="relative group cursor-pointer flex-1 flex items-start mt-5 rounded overflow-hidden">
                      <PhotoView src={images[0]}>
                        <div className="relative w-full h-64 overflow-hidden rounded-b-xl">
                          <Image
                            src={images[0]}
                            alt={`${title} Cover`}
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                            <span className="text-sm text-gray-200 text-center">
                              Click to view the full {images.length}-image set
                            </span>
                          </div>
                        </div>
                      </PhotoView>
                      {images.slice(1).map((img, idx) => (
                        <PhotoView key={img} src={img}>
                          <Image
                            src={img}
                            alt={`${title} ${idx + 2}`}
                            width={0}
                            height={0}
                            className="hidden"
                          />
                        </PhotoView>
                      ))}
                    </div>
                    {/* small images */}
                    <div className="hidden sm:flex flex-col gap-3 pt-5 px-2">
                      {images.map((img, tIdx) => (
                        <div key={img} className="relative w-20 h-14 rounded overflow-hidden border border-gray-700">
                          <Image
                            src={img}
                            alt={`${title} Thumbnail ${tIdx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Storytelling Graphics */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold mb-5 text-center text-blue-400">
            Storytelling Graphics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {Object.entries(storytellingGraphics).map(([subset, images]) => {
              let title = 'Storytelling';
              return (
                <div
                  key={subset}
                  className="border border-gray-800 rounded-xl bg-[#18181e] flex flex-col min-h-[340px] hover:border-blue-500/50 transition">

                  <div className="flex flex-col sm:flex-row flex-1">
                    {/* Main image */}
                    <div className="relative group cursor-pointer flex-1 flex items-start mt-5 rounded overflow-hidden">
                      <PhotoView src={images[0]}>
                        <div className="relative w-full h-64 overflow-hidden rounded-b-xl">
                          <Image
                            src={images[0]}
                            alt={`${title} Cover`}
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                            <span className="text-sm text-gray-200 text-center">
                              Click to view the full {images.length}-image set
                            </span>
                          </div>
                        </div>
                      </PhotoView>
                      {images.slice(1).map((img, idx) => (
                        <PhotoView key={img} src={img}>
                          <Image
                            src={img}
                            alt={`${title} ${idx + 2}`}
                            width={0}
                            height={0}
                            className="hidden"
                          />
                        </PhotoView>
                      ))}
                    </div>
                    {/* small images */}
                    <div className="hidden sm:flex flex-col gap-3 pt-5 px-2">
                      {images.map((img, tIdx) => (
                        <div key={img} className="relative w-20 h-14 rounded overflow-hidden border border-gray-700">
                          <Image
                            src={img}
                            alt={`${title} Thumbnail ${tIdx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

      </PhotoProvider>
    </main>
  );
}
