export default function CMSPage() {
    return (
      <main className="min-h-screen px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-100">CMS</h1>
          <p className="text-sm text-gray-400 mt-2">
            Internal content management system (React + Node/Express backend).
          </p>
  
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-800 bg-black">
            <iframe
              src="https://2hangz.github.io/CMS/"
              className="w-full h-[80vh]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allow="fullscreen"
            />
          </div>
        </div>
      </main>
    );
  }
  