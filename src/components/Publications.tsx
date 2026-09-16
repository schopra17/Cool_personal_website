import { useState } from 'react';
import { publications, personalInfo } from '../data/portfolioData';
import { Publication } from '../types';
import { Reveal } from './Reveal';

/* Eight papers with full abstracts made this the longest section on the page.
   Two levels of disclosure now: only the flagged papers show at all, and each
   abstract opens on request. */
export default function Publications() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const featured = publications
    .filter(p => p.featured)
    .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));
  const rest = publications.filter(p => !p.featured);

  // No paper flagged yet: fall back to showing everything rather than nothing.
  const primary = featured.length > 0 ? featured : publications;
  const secondary = featured.length > 0 ? rest : [];
  const shown = showAll ? [...primary, ...secondary] : primary;

  return (
    <section id="publications" className="section-pad" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="label">Publications</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <h2 className="heading" style={{ marginBottom: 0 }}>Research</h2>
            {personalInfo.scholar && (
              <a href={personalInfo.scholar} target="_blank" rel="noreferrer" className="btn-ghost">
                Google Scholar ↗
              </a>
            )}
          </div>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          {shown.map((pub, i) => (
            <Reveal key={pub.id} delay={Math.min(i, 3) * 80}>
              <PubCard
                pub={pub}
                open={openId === pub.id}
                onToggle={() => setOpenId(openId === pub.id ? null : pub.id)}
              />
            </Reveal>
          ))}
        </div>

        {secondary.length > 0 && (
          <div style={{ marginTop: '1.6rem' }}>
            <button onClick={() => setShowAll(s => !s)} className="btn-ghost" aria-expanded={showAll}>
              {showAll ? 'Show fewer' : 'Read more: Further publications'}
              <span aria-hidden="true">{showAll ? ' ↑' : ' ↓'}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function PubCard({ pub, open, onToggle }: { pub: Publication; open: boolean; onToggle: () => void }) {
  return (
    /* Anchor target so a single paper can be linked directly */
    <div id={pub.id} className="card" style={{ padding: '1.8rem 2rem', scrollMarginTop: '5rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
        <div>
          <span className="font-mono" style={{
            fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase',
            background: 'var(--accent-fill)', color: 'var(--accent-on)',
            padding: '0.2rem 0.65rem', borderRadius: 2, display: 'inline-block', marginBottom: '0.7rem',
          }}>
            {pub.year || 'In Progress'}
          </span>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.35, maxWidth: 600 }}>{pub.title}</h3>
        </div>
        {pub.externalUrl && (
          <a href={pub.externalUrl} target="_blank" rel="noreferrer" className="btn-ghost" style={{ flexShrink: 0, padding: '0.4rem 0.9rem', fontSize: '0.65rem' }}>
            DOI ↗
          </a>
        )}
      </div>

      {/* Authors */}
      <p className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--accent)', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
        {pub.authors.map((a, ai) => (
          <span key={ai}>
            {a === 'Shivam Chopra'
              ? <strong style={{ color: 'var(--accent)', textDecoration: 'underline', textDecorationColor: 'var(--accent-fill)' }}>{a}</strong>
              : a
            }
            {ai < pub.authors.length - 1 ? ', ' : ''}
          </span>
        ))}
      </p>

      {/* Venue */}
      <p style={{ fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic', marginBottom: '0.8rem' }}>
        {pub.venue}
      </p>

      {/* Abstract, collapsed by default */}
      {pub.abstract && (
        <>
          <button
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={`abstract-${pub.id}`}
            className="font-mono pub-toggle"
          >
            {open ? 'Hide abstract' : 'Read abstract'}
            <span aria-hidden="true">{open ? ' ↑' : ' ↓'}</span>
          </button>
          {open && (
            <p id={`abstract-${pub.id}`} style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.75, marginTop: '0.8rem' }}>
              {pub.abstract}
            </p>
          )}
        </>
      )}
    </div>
  );
}
