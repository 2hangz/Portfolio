'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AvatarCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-lg text-center"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-gray-800 shadow-md">
          <Image
            src="/avatar.png"
            alt="profile image"
            fill
            sizes="112px"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-400 mb-1">Interactive Media Designer</p>
          <h1 className="text-2xl font-semibold">I'm Hang Zhou</h1>
          <p className="text-sm text-gray-400 mt-1">
           Based in Cork, Ireland
          </p>
        </div>

        <div className="flex gap-3 mt-5">
          <a
            href="mailto:hangz2024@outlook.com"
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
          >
            Hire Me
          </a>
          <button
            onClick={() => navigator.clipboard.writeText('hangz2024@outlook.com')}
            className="px-4 py-2 border border-gray-700 text-sm rounded-lg hover:bg-gray-800 transition"
          >
            Copy Email
          </button>
        </div>
      </div>
    </motion.div>
  );
}
