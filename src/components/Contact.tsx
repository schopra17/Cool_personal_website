import { personalInfo } from '../data/portfolioData';
import { Reveal } from './Reveal';

export default function Contact() {
  const links = [
    { label: 'Email',    href: `mailto:${personalInfo.email}`, icon: '✉' },
    { label: 'LinkedIn', href: personalInfo.linkedin, icon: 'LI' },
    { label: 'Scholar',  href: personalInfo.scholar,  icon: 'GS' },
    { label: 'Resume',   href: personalInfo.resumeUrl, icon: '↓' },
  ].filter(l => l.href);

  return (
    <section id="contact" className="section-pad" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6" style={{ textAlign: 'center' }}>
        <Reveal>
          <p className="label" style={{ display: 'inline-block' }}>Contact</p>
          <h2 className="heading">Let's Work Together</h2>
          <p style={{ fontSize: '0.97rem', color: 'var(--muted)', maxWidth: 480, margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
            Open to collaborations, consulting, and conversations about robotics,
            wearable hardware, and medical device engineering.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <a href={`mailto:${personalInfo.email}`} className="font-display" style={{
            display: 'block', fontSize: 'clamp(1.3rem, 3vw, 2.2rem)',
            color: 'var(--accent)', textDecoration: 'none',
            marginBottom: '2.2rem', letterSpacing: '0.04em',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {personalInfo.email}
          </a>
        </Reveal>

        <Reveal delay={140}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className="btn-ghost"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <span className="font-mono" style={{ fontSize: '0.62rem' }}>{l.icon}</span>
                {l.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
