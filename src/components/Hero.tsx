import { personalInfo, projects } from '../data/portfolioData';
import { posts, formatDate } from '../lib/posts';
import { navigate } from '../lib/useHashRoute';

/* The reference desktop had a now-playing panel and a system monitor. Same
   furniture, repurposed: the side column carries the latest post and whatever
   is actually on the bench, both read from real data rather than hardcoded. */

export default function Hero() {
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const latest = posts[0];
  const currentPlatforms = projects.filter(p => p.category === 'Current Platforms');

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
                <div>
                  <div className="hero-eyebrow">
                    <span className="hero-dot" aria-hidden="true" />
                    PhD Robotics · UC San Diego · Boston, MA
                  </div>

                  <h1 className="hero-name">
                    Shivam<br />
                    <span className="hero-name-accent">
                      Chopra, PhD<span className="hero-cursor" aria-hidden="true">_</span>
                    </span>
                  </h1>
                </div>

                {personalInfo.photo && (
                  <figure className="photo-frame hero-photo">
                    <img src={personalInfo.photo} alt={personalInfo.name} />
                  </figure>
                )}
              </div>

              <p className="hero-tagline">Building hardware that senses, moves, and holds up in the real world.</p>

              <p className="hero-sub">
                I'm a mechanical engineer and systems-level hardware lead with a PhD in Mechanical
                Engineering (Robotics) from UC San Diego. My work spans early-stage robotic systems,
                published in IEEE and covered by outlets like New Atlas, and wearable hardware
                development at Dexcom, where I lead subsystem architecture from concept through
                build readiness and validation.
              </p>

              <div className="hero-cta">
                <button className="btn-primary" onClick={() => scroll('projects')}>View Projects</button>
                {personalInfo.github && (
                  <a href={personalInfo.github} target="_blank" rel="noreferrer" className="btn-ghost">GitHub ↗</a>
                )}
                <a href={personalInfo.resumeUrl} target="_blank" rel="noreferrer" className="btn-ghost">Resume ↗</a>
              </div>
            </div>
          </div>

          {/* ── Side column, offset downward so the pair reads asymmetrically ── */}
          <div className="hero-side">

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
                  <p className="bench-desc">{latest.title}</p>
                  <button className="bench-link font-mono" onClick={() => navigate('/blog/' + latest.slug)}>
                    Read ↗
                  </button>
                </div>
              </div>
            )}

            {/* Current platforms */}
            {currentPlatforms.length > 0 && (
              <div className="win">
                <div className="win-bar">
                  <div className="win-dots" aria-hidden="true">
                    <span className="win-dot win-dot-live" />
                    <span className="win-dot" />
                  </div>
                  <span className="win-title">current platforms</span>
                </div>
                <div className="win-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {currentPlatforms.map(p => (
                    <div key={p.id} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
                      <div className="bench-thumb" aria-hidden="true">📷</div>
                      <div>
                        <p className="bench-title">{p.title}</p>
                        <p className="bench-desc">{p.description}</p>
                      </div>
                    </div>
                  ))}
                  <button className="bench-link font-mono" onClick={() => scroll('current-platforms')}>
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
