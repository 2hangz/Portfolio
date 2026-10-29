'use client';
import { useT } from '@/components/SitePreferences';

import ProjectCard from '@/app/home/ProjectCard';
import Link from 'next/link';

export default function ProjectList() {
  const t = useT();
  const roles = [
    {
      slug:'web-developer',
      title: 'Web Developer',
      subtitle: 'Full-stack · Interactive Media',
      desc: "I build interactive websites and content tools that make complex information easier to use. For ENTYRE at MaREI, UCC, I developed a public research website and a CMS for content publishing, data visualisation and workflow management.",
      tag: 'React · Node.js · Data Visualisation · CMS',
    },
    {
      slug:'graphic-designer',
      title: 'Graphic Designer',
      subtitle: 'Visual Communication · Branding',
      desc: 'Created infographics, icon systems and publication layouts that present complex environmental research through accessible, human-centred visuals aligned with UCC brand standards.',
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
        <h2 className="text-lg font-semibold text-gray-100">{t("Roles")}</h2>
      </div>
      {roles.map((role) => (
        <Link
          key={role.slug}
          href={`/roles/${role.slug}`}
          className="block rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/60"
        >
          <ProjectCard {...role} title={t(role.title)} subtitle={t(role.subtitle)} desc={t(role.desc)} tag={t(role.tag)} />
        </Link>
      ))}
    </div>
  );
}
