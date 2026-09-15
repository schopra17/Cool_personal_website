import { experience } from '../data/portfolioData';
import { Reveal } from './Reveal';

export default function Experience() {
  return (
    <section id="experience" className="section-pad" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="label">02. Experience</p>
          <h2 className="heading">Professional History</h2>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {experience.map((e, i) => (
            <Reveal key={e.id} delay={i * 80}>
              <div style={{
                display: 'grid', gridTemplateColumns: '180px 1fr', gap: '2.5rem',
                padding: '2rem 0', borderBottom: '1px solid var(--border)',
              }}>
                {/* Left */}
                <div>
                  <p className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.06em', color: 'var(--muted)', lineHeight: 1.6 }}>
                    {e.startDate} to {e.endDate}
                  </p>
                  <p className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--muted)', marginTop: 2, letterSpacing: '0.04em' }}>
                    {e.location}
                  </p>
                </div>

                {/* Right */}
                <div>
                  <h3 className="font-display" style={{ fontSize: '1.3rem', letterSpacing: '0.03em', marginBottom: '0.2rem' }}>{e.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--accent)', fontWeight: 500, marginBottom: '0.8rem' }}>{e.company}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {e.responsibilities.map((r, ri) => (
                      <li key={ri} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.65 }}>
                        <span style={{ flexShrink: 0, color: 'var(--muted)', fontFamily: 'monospace', fontSize: '0.8rem', marginTop: '0.12rem' }}>•</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          #experience .max-w-6xl div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 0.6rem !important;
          }
        }
      `}</style>
    </section>
  );
}
