'use client';

import { motion } from 'framer-motion';

export default function ProjectCard({
  title,
  subtitle,
  desc,
  tag,
}: {
  title: string;
  subtitle: string;
  desc: string;
  tag: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition"
    >
      <h3 className="text-gray-100 font-medium">{title}</h3>
      <p className="text-xs text-gray-500 mb-2">{subtitle}</p>
      <p className="text-sm text-gray-400 mb-3 leading-relaxed">{desc}</p>
      <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md">
        {tag}
      </span>
    </motion.div>
  );
}