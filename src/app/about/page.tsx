'use client';

import AboutExperience from './AboutExperience';
import AboutIntro from './AboutIntro';


export default function AboutPage() {
  return (
    <main className="flex flex-col items-center px-6 py-16">

      <section className="w-full max-w-2xl flex justify-center items-center">
        <AboutIntro />
      </section>

      <section className="mt-12 w-full max-w-2xl flex justify-center items-center">
        <AboutExperience />
      </section>
      
    </main>
  );
}
