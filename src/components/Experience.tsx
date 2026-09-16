import { useState } from 'react';
import { experience, personalInfo } from '../data/portfolioData';
import { Reveal } from './Reveal';

/* Five roles at six bullets each was a wall of text nobody scrolls through.
   Each row now collapses to title, employer, dates and a one-line summary —
   about four lines — and the detail opens on request. The current role starts
   open so the affordance is obvious. */
export default function Experience() {
  const [open, setOpen] = useState<string[]>(experience.length ? [experience[0].id] : []);
  const toggle = (id: string) =>
    setOpen(o => (o.includes(id) ? o.filter(x => x !== id) : [...o, id]));

  return (
    <section id="experience" className="section-pad" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="label">Experience</p>
          <div className="xp-head">
            <h2 className="heading" style={{ marginBottom: 0 }}>Professional History</h2>
            <a href={personalInfo.resumeUrl} target="_blank" rel="noreferrer" className="btn-ghost">
              Full Resume ↗
            </a>
          </div>
        </Reveal>

        <div className="xp-list">
          {experience.map((e, i) => {
            const current = e.endDate.toLowerCase() === 'present';
            const isOpen = open.includes(e.id);
            return (
              <Reveal key={e.id} delay={i * 60}>
                <div className={`xp-item ${i === experience.length - 1 ? 'xp-item-last' : ''}`}>
                  <span className={`xp-dot ${current ? 'xp-dot-current' : ''}`} aria-hidden="true" />

                  <h3 className="xp-title font-display">{e.title}</h3>

                  <p className="xp-meta font-mono">
                    <span className="xp-company">{e.company}</span>
                    <span className="xp-sep"> · </span>
                    {[e.startDate, e.endDate].filter(Boolean).join(' to ')}
                    {e.location && <><span className="xp-sep"> · </span>{e.location}</>}
                    {current && <span className="xp-now">Now</span>}
                  </p>

                  {e.summary && <p className="xp-summary">{e.summary}</p>}

                  {e.responsibilities.length > 0 && (
                    <>
                      <button
                        onClick={() => toggle(e.id)}
                        aria-expanded={isOpen}
                        aria-controls={`xp-detail-${e.id}`}
                        className="font-mono xp-toggle"
                      >
                        {isOpen ? 'Hide detail' : 'Detail'}
                        <span aria-hidden="true">{isOpen ? ' ↑' : ' ↓'}</span>
                      </button>

                      {isOpen && (
                        <ul className="xp-bullets" id={`xp-detail-${e.id}`}>
                          {e.responsibilities.map((r, ri) => (
                            <li key={ri}>
                              <span className="xp-bullet-dot" aria-hidden="true" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
