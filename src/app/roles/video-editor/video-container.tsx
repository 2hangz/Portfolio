'use client';

import { ReactNode } from 'react';

export default function VideoContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section
      className="
        w-full
        max-w-xl
        mx-auto
        px-4
        py-10
        space-y-8
      "
    >
      {children}
    </section>
  );
}
