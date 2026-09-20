import { useEffect, useState } from 'react';
import Media from './Media';

export interface Slide { src: string; caption?: string; video?: boolean }

interface Props {
  slides: Slide[];
  title: string;
  /** Show framed placeholder slots for entries with no src yet. When false,
   *  empty entries are dropped and the panel hides itself if none remain. */
  placeholders?: boolean;
  intervalMs?: number;
}

/* One rotator serving both the hero side column and the About section. Pauses
   on hover and focus, honours prefers-reduced-motion, and can be driven by
   hand: click the picture itself to go to the next one, or jump with the dots.
   The picture is a real button, so Enter and Space work too. */
export default function PhotoSlideshow({ slides, title, placeholders = false, intervalMs = 3200 }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const shown = placeholders ? slides : slides.filter(s => s.src);

  useEffect(() => {
    if (shown.length < 2 || paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setIndex(i => (i + 1) % shown.length), intervalMs);
    return () => clearInterval(id);
  }, [shown.length, paused, intervalMs]);

  if (shown.length === 0) return null;
  const active = shown[Math.min(index, shown.length - 1)];
  const many = shown.length > 1;
  const next = () => setIndex(i => (i + 1) % shown.length);

  return (
    <div
      className="win"
      aria-roledescription="carousel"
      aria-label={title}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="win-bar">
        <div className="win-dots" aria-hidden="true">
          <span className="win-dot" />
          <span className="win-dot" />
        </div>
        <span className="win-title">{title}</span>
      </div>

      <div className="win-body" style={{ padding: 0 }}>
        <div
          className={`hero-slideshow ${many ? 'hero-slideshow-clickable' : ''}`}
          onClick={many ? next : undefined}
          onKeyDown={many ? e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); next(); }
          } : undefined}
          role={many ? 'button' : undefined}
          tabIndex={many ? 0 : undefined}
          aria-label={many ? 'Show the next photo' : undefined}
        >
          {shown.map((s, i) => (
            <div key={i} className="hero-slide" style={{ opacity: i === index ? 1 : 0 }} aria-hidden={i !== index}>
              {s.src ? (
                <Media item={s} alt={s.caption ?? ''} eager={i === 0} />
              ) : (
                <div className="slide-placeholder">
                  <span className="slide-placeholder-frame" aria-hidden="true" />
                  <span className="font-mono slide-placeholder-label">Photo {i + 1}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {active?.caption && <p className="slide-caption">{active.caption}</p>}

        {shown.length > 1 && (
          <div className="hero-slide-dots">
            {shown.map((_, i) => (
              <button
                key={i}
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                className={`hero-slide-dot ${i === index ? 'hero-slide-dot-active' : ''}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
