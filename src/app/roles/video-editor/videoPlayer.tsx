'use client';

type Props = {
  video: any;
};

export default function VideoPlayer({ video }: Props) {
  if (video.type === 'direct') {
    return (
      <video
        src={video.src}
        controls
        className="w-full h-full object-cover"
        preload="metadata"
      />
    );
  }

  if (video.type === 'youtube') {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${video.id}`}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return null;
}
