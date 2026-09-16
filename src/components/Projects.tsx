import { useEffect, useRef } from 'react';
import { projects } from '../data/portfolioData';
import { Project } from '../types';
import ProjectModal from './ProjectModal';
import { Reveal } from './Reveal';
import Media from './Media';
import { useHashRoute, navigate } from '../lib/useHashRoute';

/* One hue per CATEGORY rather than per card, so every card in a group shares
   a colour and group membership is readable at a glance. Decorative parts
   only: amber, coral and periwinkle measure 1.5-2.6:1 on the cream ground, so
   none can carry text. Anything readable uses --ink or --accent. */
const GROUP_HUES = ['var(--amber)', 'var(--coral)', 'var(--indigo)', 'var(--periwinkle)'];

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function Projects() {
  // The open project lives in the URL (#/project/<id>) so any project can be
  // linked, bookmarked, and shared directly.
  const route = useHashRoute();
  const active: Project | null =
    route.name === 'project' ? projects.find(p => p.id === route.id) ?? null : null;

  // Closing should undo the click, not push another entry — but only when we
  // were the ones who opened it. A visitor arriving on a project link goes to
  // the projects grid instead.
  const openedHere = useRef(false);
  const open = (p: Project) => { openedHere.current = true; navigate('/project/' + p.id); };
  const close = () => {
    if (openedHere.current) { openedHere.current = false; history.back(); }
    else navigate('');
  };

  // Deep link landed straight on a project: put the grid behind the dialog so
  // closing it leaves the visitor somewhere sensible.
  useEffect(() => {
    if (active && !openedHere.current) {
      document.getElementById('projects')?.scrollIntoView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active?.id]);

  // Grouped by category, in first-appearance order, so each group can carry
  // its own heading and scroll anchor (e.g. "Current Projects" is a
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
          <p className="label">Projects</p>
          <h2 className="heading">Selected Work</h2>
        </Reveal>

        {categories.map((group, gi) => {
          const hue = GROUP_HUES[gi % GROUP_HUES.length];
          return (
          <div key={group.name} id={slugify(group.name)} className="proj-group">
            <Reveal>
              {/* A banded header, not a small label: a rule the full width of
                  the grid, the group's colour, and a count. The eye should
                  register a new section without reading anything. */}
              <div className="proj-group-head" style={{ borderTopColor: 'var(--ink)' }}>
                <span className="proj-group-swatch" style={{ background: hue }} aria-hidden="true" />
                <h3 className="proj-group-name font-display">{group.name}</h3>
                <span className="proj-group-count font-mono">
                  {group.items.length} {group.items.length === 1 ? 'project' : 'projects'}
                </span>
              </div>
            </Reveal>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.4rem' }}>
              {group.items.map((p, i) => {
                const lead = p.photos?.[0]
                  ?? (p.images?.[0] ? { src: p.images[0] } : undefined)
                  ?? (p.thumbnail ? { src: p.thumbnail } : undefined);
                const imageCount = p.images?.length ?? (p.thumbnail ? 1 : 0);

                return (
                  <Reveal key={p.id} delay={i * 55}>
                    <div
                      className="card"
                      style={{ overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}
                      onClick={() => open(p)}
                    >
                      {/* Top accent bar — decorative, so a raw fill is fine */}
                      <div style={{ height: 6, background: hue, borderBottom: '2px solid var(--ink)' }} />

                      {/* ── Lead image ──
                          One image, shown whole rather than cropped to fill.
                          Half these images are annotated figures, and a figure
                          with its labels cut off is worth nothing; the tidy
                          edge-to-edge grid is not worth that. The card is a
                          doorway, the modal is where the photos live. */}
                      {lead ? (
                        <div style={{
                          position: 'relative',
                          aspectRatio: '16 / 10',
                          overflow: 'hidden',
                          background: 'var(--paper-2)',
                          borderBottom: '1.5px solid var(--border)',
                        }}>
                          <Media
                            item={lead}
                            alt={lead.caption || p.title}
                            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                          />
                          {imageCount > 1 && (
                            <span className="font-mono" style={{
                              position: 'absolute', bottom: 6, right: 6,
                              background: 'rgba(24,25,45,0.8)', color: '#fff',
                              fontSize: '0.6rem', padding: '0.15rem 0.45rem',
                              borderRadius: 2, letterSpacing: '0.06em',
                              pointerEvents: 'none',
                            }}>
                              +{imageCount - 1} more
                            </span>
                          )}
                        </div>
                      ) : null /* no image slot until a photo exists */}

                      <div style={{ padding: '1.2rem 1.3rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
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
                          {p.github ? (
                            <a
                              href={p.github} target="_blank" rel="noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="font-mono"
                              style={{ fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--accent)', textDecoration: 'none' }}
                            >
                              GitHub ↗
                            </a>
                          ) : (
                            <span className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--muted)' }}>
                              {p.status === 'complete' ? '✓ Completed' : 'In progress'}
                            </span>
                          )}
                          {/* The real link: keyboard reachable, middle-clickable,
                              and copyable as a direct link to this project. */}
                          <a
                            href={'#/project/' + p.id}
                            onClick={e => { e.preventDefault(); e.stopPropagation(); open(p); }}
                            className="font-mono"
                            style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase', textDecoration: 'none' }}
                          >
                            Details →
                          </a>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
          );
        })}
      </div>

      {active && <ProjectModal project={active} onClose={close} />}
    </section>
  );
}
