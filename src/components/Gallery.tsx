import { useState } from 'react';
import { projects, galleryImages } from '../data/portfolioData';

type Tab = 'general' | 'projects';

interface LightboxState {
  src: string;
  caption?: string;
  tag?: string;
  projectId?: string;
}

export default function Gallery() {
  const [tab, setTab] = useState<Tab>('general');
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const projectImages = projects.flatMap(p =>
    (p.images ?? []).map(img => ({
      src: img,
      projectId: p.id,
      projectTitle: p.title,
      category: p.category,
      github: p.github,
    }))
  );

  const scrollToProject = () => {
    setLightbox(null);
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  return (
    <section id="gallery" className="section-pad" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <p className="label">Gallery</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="heading" style={{ marginBottom: 0 }}>Visual Archive</h2>

          {/* ── Tab switcher — bigger & more visible ── */}
          <div style={{ display: 'flex', gap: 0, border: '1.5px solid var(--border)', borderRadius: 3, overflow: 'hidden' }}>
            {(['general', 'projects'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="font-mono"
                style={{
                  padding: '0.7rem 2rem',           // ← taller + wider
                  fontSize: '0.78rem',              // ← bigger text
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  background: tab === t ? 'var(--accent-fill)' : 'var(--surface)',
                  color: tab === t ? 'var(--accent-on)' : 'var(--muted)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontWeight: tab === t ? 600 : 400,
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* ── GENERAL TAB ── */}
        {tab === 'general' && (
          <div>
            {galleryImages.length === 0 ? (
              <PlaceholderGrid count={6} />
            ) : (
              <MasonryGrid>
                {galleryImages.map((img, i) => (
                  <GalleryTile
                    key={i}
                    src={img.src}
                    caption={img.caption}
                    onClick={() => setLightbox({ src: img.src, caption: img.caption })}
                  />
                ))}
              </MasonryGrid>
            )}
          </div>
        )}

        {/* ── PROJECTS TAB ── */}
        {tab === 'projects' && (
          <div>
            {projectImages.length === 0 ? (
              <PlaceholderGrid count={6} />
            ) : (
              <MasonryGrid>
                {projectImages.map((img, i) => (
                  <div
                    key={i}
                    style={{ position: 'relative', cursor: 'pointer', breakInside: 'avoid', marginBottom: '0.8rem' }}
                    onClick={() => setLightbox({ src: img.src, tag: img.projectTitle, projectId: img.projectId })}
                  >
                    <GalleryTile
                      src={img.src}
                      onClick={() => setLightbox({ src: img.src, tag: img.projectTitle, projectId: img.projectId })}
                    />
                    {/* Project tag badge */}
                    <div style={{
                      position: 'absolute', bottom: 8, left: 8,
                      background: 'rgba(36,30,40,0.82)',
                      backdropFilter: 'blur(6px)',
                      borderRadius: 2,
                      padding: '0.2rem 0.55rem',
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                      pointerEvents: 'none',
                    }}>
                      {/* sits on a dark badge, so the bright pastel reads better than the ink */}
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-fill)', display: 'inline-block', flexShrink: 0 }} />
                      <span className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: '#fff', textTransform: 'uppercase', whiteSpace: 'nowrap', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {img.projectTitle}
                      </span>
                    </div>
                  </div>
                ))}
              </MasonryGrid>
            )}
          </div>
        )}
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(22,18,26,0.88)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 860, width: '100%', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setLightbox(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', padding: '0.3rem' }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <line x1="2" y1="2" x2="20" y2="20" stroke="currentColor" strokeWidth="1.8"/>
                  <line x1="20" y1="2" x2="2" y2="20" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
              </button>
            </div>
            <img src={lightbox.src} alt={lightbox.caption ?? lightbox.tag ?? ''} style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: 4, display: 'block' }} />
            {(lightbox.caption || lightbox.tag) && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{lightbox.caption ?? lightbox.tag}</span>
                {lightbox.projectId && (
                  <button
                    onClick={scrollToProject}
                    className="font-mono"
                    style={{
                      background: 'none', border: '1.5px solid rgba(255,255,255,0.25)',
                      borderRadius: 2, padding: '0.35rem 0.9rem',
                      color: 'rgba(255,255,255,0.8)', cursor: 'pointer',
                      fontSize: '0.66rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                      transition: 'border-color 0.2s, color 0.2s',
                    }}
                  >
                    View Project ↗
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function MasonryGrid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ columns: '3 260px', gap: '0.8rem' }}>
      {children}
    </div>
  );
}

function GalleryTile({ src, caption, onClick }: { src: string; caption?: string; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        breakInside: 'avoid',
        marginBottom: '0.8rem',
        borderRadius: 3,
        overflow: 'hidden',
        border: '1.5px solid var(--border)',
        cursor: 'zoom-in',
        position: 'relative',
        display: 'block',
      }}
      className="gallery-tile"
    >
      <img src={src} alt={caption ?? ''} loading="lazy" style={{ width: '100%', display: 'block', transition: 'transform 0.35s ease' }} />
      {caption && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '0.5rem 0.7rem',
          background: 'linear-gradient(transparent, rgba(22,18,26,0.7))',
          color: 'rgba(255,255,255,0.85)',
          fontSize: '0.75rem',
          opacity: 0,
          transition: 'opacity 0.25s',
        }} className="gallery-caption">
          {caption}
        </div>
      )}
    </div>
  );
}

/* Reserved slots, sized like the real tiles, so the section reads as a gallery
   waiting on film rather than as a bug. Varying heights keep the masonry
   rhythm the real photos will have. */
function PlaceholderGrid({ count }: { count: number }) {
  const heights = [260, 200, 300, 220, 280, 190];
  return (
    <div style={{ columns: '3 260px', gap: '0.8rem' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="gallery-placeholder"
          style={{ height: heights[i % heights.length] }}
        >
          <span className="slide-placeholder-frame" aria-hidden="true" />
          <span className="font-mono slide-placeholder-label">Photo {i + 1}</span>
        </div>
      ))}
    </div>
  );
}