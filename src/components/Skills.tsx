import { skills } from '../data/portfolioData';
import { Reveal } from './Reveal';

export default function Skills() {
  return (
    <section id="skills" className="section-pad section-alt" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="label">Skills</p>
          <h2 className="heading">Toolbox</h2>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          {skills.map((s, i) => (
            <Reveal key={s.category} delay={i * 50}>
              <div style={{
                background: 'var(--surface)',
                border: '1.5px solid var(--border)',
                borderRadius: 4,
                padding: '1.2rem 1.5rem',
              }}>
                <p className="font-mono" style={{
                  fontSize: '0.65rem', letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: 'var(--accent)',
                  marginBottom: '0.7rem',
                }}>
                  {s.category}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {s.items.map(item => (
                    <span key={item} className="tag">{item}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}