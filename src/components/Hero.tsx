import { personalInfo, projects, press } from '../data/portfolioData';
import { posts, formatDate } from '../lib/posts';
import { navigate, scrollToSection } from '../lib/useHashRoute';
import PhotoSlideshow from './PhotoSlideshow';
import Media from './Media';
import { heroSlideshow } from '../data/portfolioData';

/* The reference desktop had a now-playing panel and a system monitor. Same
   furniture, repurposed: the side column carries the latest post and whatever
   is actually on the bench, both read from real data rather than hardcoded. */

export default function Hero() {
  const scroll = (id: string) => scrollToSection(id);

  const latest = posts[0];
  const currentProjects = projects.filter(p => p.category === 'Current Projects');

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-bg-glow" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div className="hero-desk">

          {/* ── Main window ── */}
          <div className="win hero-win-main">
            <div className="win-bar">
              <div className="win-dots" aria-hidden="true">
                <span className="win-dot" />
                <span className="win-dot" />
              </div>
              <span className="win-title">~/shivam $ home</span>
            </div>

            <div className="win-body hero-win-main-body">
              <div className="hero-name-row">
                <div style={{ flex: '1 1 320px', minWidth: 0 }}>
                  <div className="hero-eyebrow">
                    <span className="hero-dot" aria-hidden="true" />
                    <span className="hero-eyebrow-lines">
                      <span>Hardware Engineer at Dexcom</span>
                      <span>PhD Robotics, UC San Diego</span>
                    </span>
                  </div>

                  <h1 className="hero-name">
                    Shivam<br />
                    <span className="hero-name-accent">
                      Chopra, PhD<span className="hero-cursor" aria-hidden="true">_</span>
                    </span>
                  </h1>

                  <p className="hero-tagline">Building hardware that senses, moves, and holds up for the people who depend on it.</p>
                </div>

                {personalInfo.photo && (
                  <figure className="photo-frame hero-photo">
                    <img src={personalInfo.photo} alt={personalInfo.name} width={1600} height={2133} fetchPriority="high" />
                  </figure>
                )}
              </div>

              <p className="hero-sub">
                I'm a mechanical engineer and systems-level hardware lead with a PhD in Mechanical
                Engineering (Robotics) from UC San Diego. My work spans early-stage robotic systems,
                published in IEEE and covered by outlets like New Atlas, and wearable hardware
                development at Dexcom, where I lead subsystem architecture from concept through
                build readiness and validation.
              </p>

              {/* Two buttons, not three: the work itself and the resume. The
                  profile links sit below as plain links, so GitHub stays one
                  click away without being presented as headline evidence. */}
              <div className="hero-cta">
                <button className="btn-primary" onClick={() => scroll('projects')}>View Projects</button>
                <a href={personalInfo.resumeUrl} target="_blank" rel="noreferrer" className="btn-ghost">Resume ↗</a>
              </div>

              <div className="hero-links font-mono">
                {[
                  { label: 'Google Scholar', href: personalInfo.scholar },
                  { label: 'LinkedIn',       href: personalInfo.linkedin },
                  { label: 'GitHub',         href: personalInfo.github },
                ].filter(l => l.href).map((l, i) => (
                  <span key={l.label}>
                    {i > 0 && <span className="hero-links-sep" aria-hidden="true">·</span>}
                    <a href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>
                  </span>
                ))}
              </div>

              {press.length > 0 && (
                <div className="hero-press" aria-label="Press coverage">
                  <span className="hero-press-label font-mono">Work featured in</span>
                  <ul className="hero-press-list">
                    {press.map(p => (
                      <li key={p.name}>
                        {p.url
                          ? <a href={p.url} target="_blank" rel="noreferrer">{p.name}</a>
                          : p.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* ── Side column ── */}
          <div className="hero-side">

            {/* Rotating slideshow — hidden until real photos exist */}
            <PhotoSlideshow slides={heroSlideshow} title="gallery" />

            {/* Latest writing */}
            {latest && (
              <div className="win">
                <div className="win-bar">
                  <div className="win-dots" aria-hidden="true">
                    <span className="win-dot" />
                    <span className="win-dot" />
                  </div>
                  <span className="win-title">news</span>
                </div>
                <div className="win-body">
                  <p className="bench-title">
                    {formatDate(latest.date)} · {latest.readingTime} min read
                  </p>
                  {/* The headline is the point of this panel, so it gets the
                      display face rather than the small muted body style. */}
                  <p className="bench-headline">{latest.title}</p>
                  <button className="bench-link font-mono" onClick={() => navigate('/blog/' + latest.slug)}>
                    Read ↗
                  </button>
                </div>
              </div>
            )}

            {/* Current platforms */}
            {currentProjects.length > 0 && (
              <div className="win">
                <div className="win-bar">
                  <div className="win-dots" aria-hidden="true">
                    <span className="win-dot win-dot-live" />
                    <span className="win-dot" />
                  </div>
                  <span className="win-title">current projects</span>
                </div>
                <div className="win-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {currentProjects.map(p => (
                    <div key={p.id} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
                      {p.photos?.[0] && (
                        <div className="bench-thumb" aria-hidden="true">
                          <Media item={p.photos[0]} alt="" />
                        </div>
                      )}
                      <div>
                        <p className="bench-headline bench-headline-sm">{p.title}</p>
                        <p className="bench-desc">{p.description}</p>
                      </div>
                    </div>
                  ))}
                  <button className="bench-link font-mono" onClick={() => scroll('current-projects')}>
                    Open ↗
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
