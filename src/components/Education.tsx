import { education } from '../data/portfolioData';
import { Reveal } from './Reveal';

export default function Education() {
  return (
    <section id="education" className="section-pad section-alt" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="label">07. Education</p>
          <h2 className="heading">Academic Background</h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.4rem' }}>
          {education.map((e, i) => (
            <Reveal key={e.id} delay={i * 80}>
              <div className="card" style={{ padding: '1.8rem' }}>
                <h3 className="font-display" style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>{e.degree}</h3>
                {e.honors && e.honors.map(h => (
                  <span key={h} className="tag tag-accent" style={{ display: 'inline-block', marginBottom: '0.6rem' }}>{h}</span>
                ))}
                <p style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--text)', marginBottom: '0.25rem' }}>
                  {e.institution}
                </p>
                <p className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>
                  {e.location} · {e.graduationDate}
                  {e.gpa && <> · GPA {e.gpa}</>}
                </p>

                {e.courses && (
                  <div style={{ marginTop: '1rem' }}>
                    <p className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.45rem' }}>
                      Relevant Coursework
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {e.courses.map(c => <span key={c} className="tag" style={{ fontSize: '0.65rem' }}>{c}</span>)}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
