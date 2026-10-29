'use client';
import { useT } from '@/components/SitePreferences';
import VideoContainer from './video-container';
import { videos } from './video-list';
import VideoPlayer from './videoPlayer';

export default function Page() {
  const t = useT();
  return (
    <main>
      <h1 className="text-3xl font-semibold text-center mt-12">{t("Video Editor")}</h1>
      <VideoContainer>
      {videos.map((video, idx) => (
        <article
          key={idx}
          className="bg-[var(--muted)] rounded-2xl overflow-hidden border border-gray-800 shadow-lg"
        >
          <div className="relative aspect-video bg-black">
            <VideoPlayer video={video} />
          </div>

          <div className="p-4 space-y-2">
            <h3 className="text-base font-semibold text-gray-100">
              {t(video.title)}
            </h3>
            <p className="text-sm text-gray-400">
              {t(video.desc)}
            </p>
            <span className="text-xs text-gray-500">
              {t(video.platform)}
            </span>
          </div>
        </article>
      ))}
    </VideoContainer>
    </main>
  );
}
