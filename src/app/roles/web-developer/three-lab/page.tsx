export default function ThreeLabPage() {
    return (
      <main className="min-h-screen px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-100">Three.js Interactive Demo</h1>
          <p className="text-sm text-gray-400 mt-2">
            Embedded WebGL demo (Three.js + assets + controls).
          </p>
  
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-800 bg-black">
            <iframe
              src="/demos/three-lab/index.html"
              className="w-full h-[80vh]"
              allow="fullscreen; xr-spatial-tracking"
            />
          </div>
        </div>
      </main>
    );
  }
  