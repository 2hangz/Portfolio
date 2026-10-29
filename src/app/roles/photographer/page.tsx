'use client';

import PhotographerSection from '@/app/roles/photographer/photo-section';
import PhotographerShowcase from '@/app/roles/photographer/carousel-banner';

export default function Photographer() {
  return (
    <main className="min-h-screen flex flex-col items-center px-6">
      <section className="mt-[-60px] w-screen justify-center items-center">
        <PhotographerShowcase />
      </section>
      <section id="photo-gallery" className="mt-12 w-full py-8 scroll-mt-24">
        <PhotographerSection />
      </section>
    </main>
  );
}
