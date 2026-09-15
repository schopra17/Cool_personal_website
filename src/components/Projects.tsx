import { useState } from 'react';
import { projects } from '../data/portfolioData';
import { Project } from '../types';
import ProjectModal from './ProjectModal';
import { Reveal } from './Reveal';

/* Cards cycle the four palette hues on their DECORATIVE parts only — the top
   bar and the bullet dots. Amber, coral and periwinkle measure 1.5-2.6:1 on
   the cream ground, so none of them can be used for text; anything readable
   uses --ink or --accent instead. */
const CARD_HUES = ['var(--amber)', 'var(--coral)', 'var(--indigo)', 'var(--periwinkle)'];

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  // Grouped by category, in first-appearance order, so each group can carry
  // its own heading and scroll anchor (e.g. "Current Platforms" is a
  // distinct target from the rest of "Selected Work").
  const categories: { name: string; items: Project[] }[] = [];
  for (const p of projects) {
    let group = categories.find(c => c.name === p.category);
    if (!group) { group = { name: p.category, items: [] }; categories.push(group); }
    group.items.push(p);
  }

  return (
    <section id="projects" className="section-pad section-alt" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="label">03. Projects</p>
          <h2 className="heading">Selected Work</h2>
        </Reveal>

        {categories.map((group, gi) => (
          <div key={group.name} id={slugify(group.name)} style={{ marginBottom: gi < categories.length - 1 ? '3rem' : 0, scrollMarginTop: '5rem' }}>
            <Reveal>
              <h3 className="font-mono" style={{
                fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--accent)', marginBottom: '1.2rem',
              }}>
                {group.name}
              </h3>
            </Reveal>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.4rem' }}>
              {group.items.map((p, i) => {
                const hue = CARD_HUES[i % CARD_HUES.length];
                const hasImages = p.images && p.images.length > 0;

                return (
                  <Reveal key={p.id} delay={i * 55}>
                    <div
                      className="card"
                      style={{ overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}
                      onClick={() => setActive(p)}
                    >
                      {/* Top accent bar — decorative, so a raw fill is fine */}
                      <div style={{ height: 6, background: hue, borderBottom: '2px solid var(--ink)' }} />

                      {/* ── Image section ── */}
                      {hasImages ? (
                        // Multiple images → horizontal strip
                        <div
                          style={{
                            display: 'flex',
                            gap: 2,
                            overflow: 'hidden',
                            maxHeight: 160,
                            background: 'var(--bg)',
                          }}
                          onClick={e => e.stopPropagation()} // allow scroll without opening modal
                        >
                          {p.images!.slice(0, 3).map((src, idx) => (
                            <div
                              key={idx}
                              style={{
                                flex: idx === 0 ? '2 1 0' : '1 1 0',
                                overflow: 'hidden',
                                minWidth: 0,
                              }}
                              onClick={() => setActive(p)} // clicking image opens modal
                            >
                              <img
                                src={src}
                                alt={`${p.title} photo ${idx + 1}`}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  display: 'block',
                                  transition: 'transform 0.35s ease',
                                }}
                              />
                            </div>
                          ))}
                          {/* Overlay count badge if more than 3 */}
                          {p.images!.length > 3 && (
                            <div style={{
                              position: 'absolute',
                              bottom: 6, right: 6,
                              background: 'rgba(36,30,40,0.75)',
                              color: '#fff',
                              fontSize: '0.6rem',
                              fontFamily: 'var(--mono)',
                              padding: '0.15rem 0.4rem',
                              borderRadius: 2,
                              letterSpacing: '0.06em',
                              pointerEvents: 'none',
                            }}>
                              +{p.images!.length - 3} more
                            </div>
                          )}
                        </div>
                      ) : p.thumbnail ? (
                        // Fallback to single thumbnail
                        <div style={{ overflow: 'hidden', maxHeight: 160 }}>
                          <img src={p.thumbnail} alt={p.title} style={{ width: '100%', objectFit: 'cover', display: 'block' }} />
                        </div>
                      ) : (
                        // No photos yet: a placeholder slot so the grid stays
                        // visually consistent until real images are added.
                        <div style={{
                          height: 160,
                          background: 'var(--paper-2)',
                          borderBottom: '1.5px solid var(--border)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.35rem',
                        }}>
                          <span style={{ fontSize: '1.5rem', opacity: 0.25 }} aria-hidden="true">📷</span>
                          <span className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', opacity: 0.6 }}>
                            Photo coming soon
                          </span>
                        </div>
                      )}

                      <div style={{ padding: '1.2rem 1.3rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        {/* Category tag */}
                        <div style={{ marginBottom: '0.5rem' }}>
                          {/* Uniform retro chip: ink on surface with a hard outline.
                              Colour-coding lives in the top bar, where contrast
                              rules don't apply. */}
                          <span className="tag">{p.category}</span>
                        </div>

                        <h3 className="font-display" style={{ fontSize: '1.15rem', lineHeight: 1.15, marginBottom: '0.55rem' }}>{p.title}</h3>
                        <p style={{ fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.65, flex: 1, marginBottom: '1rem' }}>{p.description}</p>

                        {/* Key result bullets */}
                        <ul style={{ listStyle: 'none', marginBottom: '1rem' }}>
                          {p.results.slice(0, 2).map((r, ri) => (
                            <li key={ri} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5, marginBottom: '0.25rem' }}>
                              <span style={{ width: 6, height: 6, background: hue, border: '1.5px solid var(--ink)', flexShrink: 0, marginTop: '0.36rem' }} />
                              {r}
                            </li>
                          ))}
                        </ul>

                        {/* Footer */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
                          <span className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--muted)' }}>
                            {p.github ? '↗ GitHub available' : p.status === 'complete' ? '✓ Completed' : 'In progress'}
                          </span>
                          <span className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase' }}>
                            Details →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}
