import Link from 'next/link';

export default function WebDeveloperPage() {
  return (
    <div className="flex justify-center mt-12">
      <div className="w-full max-w-xl space-y-4">
        <Link
          href="/roles/web-developer/three-lab"
          className="block rounded-2xl border border-gray-800 bg-[#14141a] px-4 py-3 hover:border-gray-700 transition"
        >
          <h3 className="text-gray-100 font-semibold">Three.js Interactive Demo</h3>
          <p className="text-sm text-gray-400 mt-1">
            WebGL scene embedded as a standalone demo.
          </p>
        </Link>

        <Link
          href="/roles/web-developer/entyre"
          className="block rounded-2xl border border-gray-800 bg-[#14141a] px-4 py-3 hover:border-gray-700 transition"
        >
          <h3 className="text-gray-100 font-semibold">ENTYRE Platform (Public Site)</h3>
          <p className="text-sm text-gray-400 mt-1">
            Interactive research communication site (iframe preview).
          </p>
        </Link>

        <Link
          href="/roles/web-developer/cms"
          className="block rounded-2xl border border-gray-800 bg-[#14141a] px-4 py-3 hover:border-gray-700 transition"
        >
          <h3 className="text-gray-100 font-semibold">Workflow CMS</h3>
          <p className="text-sm text-gray-400 mt-1">
            Content management system (iframe preview).
          </p>
        </Link>
      </div>
    </div>
  );
}