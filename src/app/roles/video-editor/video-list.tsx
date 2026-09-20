export type VideoSourceType = 'youtube' | 'direct';

export const videos = [
  {
    type: 'direct' as const,
    src: 'https://digitalassets-shop.tesla.cn/video/upload/f_auto,q_auto/v1/content/dam/tesla/CAR_ACCESSORIES/MODEL_S/INTERIOR/xfhosrwgpieynecfjkch.mp4',
    title: 'Tesla Accessories Overview',
    desc: 'Official Tesla accessories promo video.',
    platform: 'Direct Video',
  },
  {
    type: 'direct' as const,
    src: 'https://digitalassets-shop.tesla.cn/video/upload/f_auto,q_auto/v1/content/dam/tesla/products/ModelX_SunShade/1078360-00-A_CN.mp4',
    title: 'Model X Sunshade Demo',
    desc: 'Official Tesla Model X sunshade installation video.',
    platform: 'Direct Video',
  },
  {
    type: 'youtube' as const,
    id: 'zx06PBm6bns',
    title: 'Short User Guide',
    desc: 'Quick-cut demo optimised for social platforms.',
    platform: 'YouTube',
  },
  {
    type: 'youtube' as const,
    id: 'GS46KiUIxv4',
    title: 'Feature Highlight',
    desc: 'Vertical edit with strong rhythm and pacing.',
    platform: 'YouTube Shorts',
  },
  {
    type: 'youtube' as const,
    id: '2H65S6GDztA',
    title: 'Tesla Shorts Showcase',
    desc: 'Tesla YouTube Short demonstration video.',
    platform: 'YouTube Shorts',
  },
  {
    type: 'youtube' as const,
    id: 'lMhYBdN5Syg',
    title: 'YouTube Shorts Example',
    desc: 'Added YouTube Short: lMhYBdN5Syg.',
    platform: 'YouTube Shorts',
  },
  {
    type: 'youtube' as const,
    id: 'Keyj37KoS4A',
    title: 'YouTube Shorts Example: Keyj37KoS4A',
    desc: 'Added YouTube Short: Keyj37KoS4A.',
    platform: 'YouTube Shorts',
  },
  {
    type: 'youtube' as const,
    id: '0jkTo9ADr5s',
    title: 'YouTube Shorts Example: 0jkTo9ADr5s',
    desc: 'Added YouTube Short: 0jkTo9ADr5s.',
    platform: 'YouTube Shorts',
  },
];
