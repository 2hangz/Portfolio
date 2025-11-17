export default function Footer() {
  return (
    <footer className="mt-6 flex justify-center">
      <div className="bg-[#1a1a1a]/80 border border-gray-800 rounded-2xl px-8 py-6 shadow-lg flex flex-col items-center w-full max-w-xl mb-8">
        <div className="flex gap-10 md:gap-14 text-gray-400">
          <a
            href="https://linkedin.com/in/hang-zhou-640852330"
            target="_blank"
            className="flex flex-col items-center hover:text-blue-500 transition"
            rel="noopener noreferrer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mb-1" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M16 8a6 6 0 0 1 6 6v5.5A1.5 1.5 0 0 1 20.5 21h-17A1.5 1.5 0 0 1 2 19.5V14a6 6 0 0 1 6-6h8ZM12 12v1m-6.5 8A2.5 2.5 0 0 1 3 18.5V14A7 7 0 0 1 10 7h4a7 7 0 0 1 7 7v4.5A2.5 2.5 0 0 1 19.5 21h-13ZM8 11v2M18 14.5V8a6 6 0 0 0-6-6 6 6 0 0 0-6 6v6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="text-xs">LinkedIn</span>
          </a>
          <a
            href="https://github.com/2hangz"
            target="_blank"
            className="flex flex-col items-center hover:text-gray-100 transition"
            rel="noopener noreferrer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mb-1" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77a5.07 5.07 0 0 0-.09-3.87S18.73.35 15.5 2.13a13.38 13.38 0 0 0-6.5 0C5.27.35 4.09.9 4.09.9A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.79c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 21.13V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="text-xs">GitHub</span>
          </a>
          <a
            href="https://www.instagram.com/hangz_ph0t0"
            target="_blank"
            className="flex flex-col items-center hover:text-pink-400 transition"
            rel="noopener noreferrer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mb-1" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/><circle cx="17" cy="7" r="1.1" fill="currentColor"/></svg>
            <span className="text-xs">Instagram</span>
          </a>
          <a
            href="mailto:hangz2024@outlook.com"
            className="flex flex-col items-center hover:text-blue-400 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mb-1" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/><path d="m22 7-8.957 7.247a2 2 0 0 1-2.486 0L2 7" stroke="currentColor" strokeWidth="2"/></svg>
            <span className="text-xs">Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
