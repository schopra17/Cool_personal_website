import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

export interface MediaItem {
  src: string;
  caption?: string;
  video?: boolean;
}

interface Props {
  item: MediaItem;
  alt: string;
  style?: CSSProperties;
  className?: string;
  eager?: boolean;
}

/* One element for stills and clips alike, so every surface (cards, modal,
   rotators, posts) treats a converted GIF exactly like a photo.

   Clips are muted, looping and inline, which is what makes a browser autoplay
   them at all; playsInline keeps iOS from taking over the screen. The result
   behaves like an animated GIF at a fraction of the bytes. */
export function isVideo(item: MediaItem): boolean {
  return item.video === true || /\.mp4($|\?)/i.test(item.src);
}

export default function Media({ item, alt, style, className, eager = false }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = isVideo(item);

  // React's `muted` prop does not reliably become a real HTML attribute, and
  // a browser that does not see the element as muted refuses to autoplay it.
  // Setting it on the node and asking to play covers both.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    el.play().catch(() => {
      /* a data-saver or reduced-motion setting can still refuse: the first
         frame stays on screen, which is an acceptable fallback */
    });
  }, [item.src, video]);

  if (video) {
    return (
      <video
        ref={videoRef}
        src={item.src}
        className={className}
        style={style}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        preload={eager ? 'auto' : 'metadata'}
        aria-label={alt}
      />
    );
  }

  return (
    <img
      src={item.src}
      alt={alt}
      className={className}
      style={style}
      loading={eager ? 'eager' : 'lazy'}
    />
  );
}
