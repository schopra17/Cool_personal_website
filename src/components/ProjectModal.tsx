import { useEffect, useRef, useState } from 'react';
import { Project } from '../types';
import VideoEmbed from './VideoEmbed';
import Media, { isVideo } from './Media';

interface Props {
  project: Project;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({ project, onClose }: Props) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Prefer the captioned list; fall back to plain srcs, then the thumbnail.
  const photos: { src: string; caption?: string; video?: boolean }[] =
    project.photos?.length
      ? project.photos
      : (project.images?.length
          ? project.images.map(src => ({ src }))
          : project.thumbnail ? [{ src: project.thumbnail }] : []);

  // Escape closes (the lightbox first, then the dialog) and Tab is trapped
  // inside the dialog so keyboard users can't wander into the page behind it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        if (lightboxSrc) setLightboxSrc(null);
        else onClose();
        return;
      }
      if (e.key !== 'Tab' || lightboxSrc) return;
      const nodes = boxRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, lightboxSrc]);

  // Lock the page behind the dialog, and hand focus to it / back again.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    boxRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked; the URL bar already shows the link */
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-box"
          onClick={e => e.stopPropagation()}
          ref={boxRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >

          {/* ── Header ── */}
          <div style={{ padding: '1.6rem 1.8rem 1.2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
            <div>
              <span className="tag tag-accent" style={{ marginBottom: '0.6rem', display: 'inline-block' }}>{project.category}</span>
              <h3 id="project-modal-title" className="font-display" style={{ fontSize: '1.6rem', lineHeight: 1.1 }}>{project.title}</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              <button
                onClick={copyLink}
                className="font-mono"
                style={{
                  background: 'none', border: '1.5px solid var(--border)', borderRadius: 2,
                  padding: '0.3rem 0.65rem', cursor: 'pointer', color: 'var(--muted)',
                  fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {copied ? 'Copied' : 'Copy link'}
              </button>
              <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: '0.2rem' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8"/>
                  <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ── Video ── */}
          {project.video && (
            <div style={{ padding: '1.2rem 1.8rem 0' }}>
              <p className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.7rem' }}>
                Video
              </p>
              <VideoEmbed url={project.video} title={project.title} caption={project.videoCaption} />
            </div>
          )}

          {/* ── Photos ──
              Each one full width and uncropped, stacked, with its caption.
              This is the place people actually look at the images, so nothing
              is scaled down into a thumbnail or cut to fit a grid cell. */}
          {photos.length > 0 && (
            <div style={{ padding: '1.2rem 1.8rem 0' }}>
              <p className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.7rem' }}>
                {photos.length === 1 ? 'Photo' : `Photos (${photos.length})`}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                {photos.map((photo, idx) => (
                  <figure key={idx}>
                    {isVideo(photo) ? (
                      /* A clip plays in place; there is nothing to enlarge. */
                      <div style={{
                        background: 'var(--paper-2)', border: '1.5px solid var(--border)',
                        borderRadius: 3, overflow: 'hidden', lineHeight: 0,
                      }}>
                        <Media
                          item={photo}
                          alt={photo.caption || `${project.title} clip ${idx + 1}`}
                          eager={idx === 0}
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                      </div>
                    ) : (
                      <button
                        onClick={() => setLightboxSrc(photo.src)}
                        aria-label={photo.caption ? `Enlarge: ${photo.caption}` : `Enlarge photo ${idx + 1}`}
                        style={{
                          display: 'block', width: '100%', padding: 0,
                          background: 'var(--paper-2)',
                          border: '1.5px solid var(--border)',
                          borderRadius: 3, overflow: 'hidden', cursor: 'zoom-in',
                        }}
                      >
                        <Media
                          item={photo}
                          alt={photo.caption || `${project.title} photo ${idx + 1}`}
                          eager={idx === 0}
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                      </button>
                    )}
                    {photo.caption && (
                      <figcaption style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.45rem', lineHeight: 1.5 }}>
                        {photo.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          )}

          {/* ── Body ── */}
          <div style={{ padding: '1.4rem 1.8rem 1.8rem', display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            <p style={{ color: 'var(--muted)', lineHeight: 1.75, fontSize: '0.93rem' }}>{project.fullDescription}</p>

            {[
              { label: 'Objectives',    items: project.objectives },
              { label: 'Results',       items: project.results },
              { label: 'Key Takeaways', items: project.keyTakeaways },
              { label: 'Goals', items: project.goals },
            ].filter(block => block.items && block.items.length > 0).map(block => (
              <div key={block.label}>
                <p className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                  {block.label}
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {block.items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: '0.42rem' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* ── Skill tags ── */}
            {project.skills && project.skills.length > 0 && (
              <div>
                <p className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                  Skills & Tools
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {project.skills.map(skill => (
                    <span key={skill} className="tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {/* GitHub link */}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-ghost" style={{ alignSelf: 'flex-start' }}>
                View on GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Image lightbox ── */}
      {lightboxSrc && (
        <div
          onClick={() => setLightboxSrc(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 300,
            background: 'rgba(22,18,26,0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 900, width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setLightboxSrc(null)} aria-label="Close photo" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', padding: '0.3rem' }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <line x1="2" y1="2" x2="20" y2="20" stroke="currentColor" strokeWidth="1.8"/>
                  <line x1="20" y1="2" x2="2" y2="20" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
              </button>
            </div>
            <img src={lightboxSrc} alt="" style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 4, display: 'block' }} />
          </div>
        </div>
      )}
    </>
  );
}
