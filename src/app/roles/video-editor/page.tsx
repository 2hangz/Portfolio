import VideoContainer from './video-container';
import { videos } from './video-list';
import VideoPlayer from './videoPlayer';

export default function Page() {
  return (
    <VideoContainer>
      {videos.map((video, idx) => (
        <article
          key={idx}
          className="bg-[#14141a] rounded-2xl overflow-hidden border border-gray-800 shadow-lg"
        >
          <div className="relative aspect-video bg-black">
            <VideoPlayer video={video} />
          </div>

          <div className="p-4 space-y-2">
            <h3 className="text-base font-semibold text-gray-100">
              {video.title}
            </h3>
            <p className="text-sm text-gray-400">
              {video.desc}
            </p>
            <span className="text-xs text-gray-500">
              {video.platform}
            </span>
          </div>
        </article>
      ))}
    </VideoContainer>
  );
}
