'use client';

import { useState } from 'react';
import { Mail, Send } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production, connect to API or service
    setSent(true);
  }

  return (
    <main className="flex flex-col items-center px-6 py-20 min-h-[60vh]">
      <section className="w-full max-w-xl bg-[#1a1a1a]/70 rounded-2xl p-8 border border-gray-800 shadow-lg">
        <div className="flex items-center gap-3 mb-5">
          <Mail size={24} className="text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-100">Contact</h1>
        </div>
        <p className="text-gray-400 mb-8">
          Feel free to reach out for collaboration, questions, or just to say hi!
        </p>
        {!sent ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="text-sm text-gray-300 mb-1 block">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-[#181818] border border-gray-700 text-gray-200 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm text-gray-300 mb-1 block">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-[#181818] border border-gray-700 text-gray-200 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm text-gray-300 mb-1 block">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-[#181818] border border-gray-700 text-gray-200 focus:outline-none focus:border-blue-500"
                rows={5}
                required
              />
            </div>
            <button
              type="submit"
              className="mt-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
            >
              <Send size={16} />
              Send Message
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center mt-8">
            <Send size={36} className="text-green-400 mb-3" />
            <p className="text-green-400 mb-2 font-semibold">Thank you for reaching out!</p>
            <p className="text-gray-400 text-center">I'll get back to you soon.</p>
          </div>
        )}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            Or email me directly:{' '}
            <a
              href="mailto:hangz2024@outlook.com"
              className="text-blue-400 hover:underline"
            >
              hangz2024@outlook.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}