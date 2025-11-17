'use client';

import ProjectCard from '@/app/home/ProjectCard';
import Link from 'next/link';

export default function ProjectList() {
  const roles = [
    {
      slug:'web-developer',
      title: 'Web Developer',
      subtitle: 'Full-stack · Interactive Media',
      desc: 'Designed and developed a dual-portal platform (public website + CMS) for the ENTYRE research project at MaREI, UCC — enabling researchers to manage, visualise, and disseminate sustainability data interactively.',
      tag: 'React · Next.js · Node.js · MongoDB · Cloudinary',
    },
    {
      slug:'graphic-designer',
      title: 'Graphic Designer',
      subtitle: 'Visual Communication · Branding',
      desc: 'Created infographics, icon systems, and publication layouts that communicate complex environmental research in accessible, human-centred visuals aligned with UCC brand standards.',
      tag: 'Figma · Photoshop · Illustrator · Layout Design',
    },
    {
      slug:'photographer',
      title: 'Photographer',
      subtitle: 'Content Creation · Social Media Strategy',
      desc: 'Produced photography and visual assets for Tesla Beijing’s social media platforms, combining product storytelling with data-driven performance insights to optimise engagement.',
      tag: 'Lightroom · Premiere Pro · Social Analytics',
    },
    {
      slug:'video-editor',
      title: 'Video Editor',
      subtitle: 'Storytelling · 3D & Motion Design',
      desc: 'Edited and composited video content for product showcases and creative campaigns; directed a short Blender animation exploring empathy and transformation through character design.',
      tag: 'Blender · After Effects · Premiere Pro',
    },
  ];
  

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-100">Roles</h2>
      </div>
      {roles.map((role) => (
        <Link
          key={role.slug}
          href={`/roles/${role.slug}`}
          className="block rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/60"
        >
          <ProjectCard {...role} />
        </Link>
      ))}
    </div>
  );
}