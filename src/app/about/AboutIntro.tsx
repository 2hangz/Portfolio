'use client';

export default function AboutIntro() {
  return (
    <section className="bg-[#1a1a1a]/60 rounded-2xl p-8 border border-gray-800 shadow-lg">
      <h1 className="text-lg font-semibold mb-4">About Me</h1>
      
      <p className="text-gray-400 leading-relaxed">
        Hi, I’m <span className="text-gray-100 font-semibold">Hang Zhou</span> — a designer and developer interested in the intersection of design, technology, and communication.
        <br /><br />
        I’m currently completing my MSc in <span className="text-gray-100 font-medium">Interactive Media at University College Cork</span>,
        and collaborating on digital projects that explore how interactive design can simplify information and enhance user experience.
        <br /><br />
        I believe that good design communicates — it connects people, ideas, and technology in meaningful ways.
      </p>

    </section>
  );
}