'use client';

import AvatarCard from '@/app/home/AvatarCard';
import ProjectList from '@/app/home/ProjectList';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center px-6">
      <section className="mt-12 w-full max-w-2xl flex justify-center items-center">
        <AvatarCard />
      </section>
      <section className="mt-12 w-full max-w-2xl py-8">
        <ProjectList />
      </section>
    </main>
  );
}