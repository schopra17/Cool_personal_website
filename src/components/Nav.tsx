import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { useHashRoute, goHome, scrollToSection } from '../lib/useHashRoute';

// Five destinations, mirroring the old Google Site. Skills, Education and News
// still have their own sections on the page; they sit inside this journey
// rather than competing with it in a nine-item menu.
const LINKS = [
  { id: 'about',        label: 'About' },
  { id: 'experience',   label: 'Experience' },
  { id: 'projects',     label: 'Projects' },
  { id: 'gallery',      label: 'Gallery' },
  { id: 'publications', label: 'Publications' },
  { id: 'contact',      label: 'Contact' },
];

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2"  x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2"  y1="12" x2="5"  y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22"  y1="4.22"  x2="6.34"  y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="4.22"  y1="19.78" x2="6.34"  y2="17.66" />
      <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={dark}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: '1.5px solid var(--border)',
        background: 'var(--surface)',
        cursor: 'pointer',
        color: dark ? 'var(--lemon)' : 'var(--accent)',
        transition: 'border-color 0.2s, color 0.2s, background 0.2s',
        flexShrink: 0,
      }}
    >
      {dark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('');
  const [open, setOpen]         = useState(false);
  const [dark, setDark]         = useState(() => localStorage.getItem('theme') === 'dark');
  const route = useHashRoute();
  const onHome = route.name === 'home' || route.name === 'project';

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  // An open mobile menu shouldn't leave the page scrolling underneath it, and
  // a tap anywhere else should dismiss it.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onDown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.nav-base')) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Re-observe whenever the route changes — the home sections unmount while a
  // blog post is open, so the observer from the previous render is stale.
  useEffect(() => {
    if (!onHome) { setActive(''); return; }
    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(
      // Sections without a nav slot (skills, news, education) leave the last
      // menu item lit rather than clearing the highlight entirely.
      entries => entries.forEach(e => {
        if (e.isIntersecting && LINKS.some(l => l.id === e.target.id)) setActive(e.target.id);
      }),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, [onHome]);

  // Real anchors, so these can be middle-clicked and copied; the handler only
  // takes over to smooth-scroll (or to leave a post first).
  const scrollTo = (e: React.MouseEvent, id: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    setOpen(false);
    if (onHome) scrollToSection(id);
    else goHome(id);   // leave the post first, then scroll to the section
  };

  return (
    <nav className={`nav-base ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => (onHome ? window.scrollTo({ top: 0, behavior: 'smooth' }) : goHome())}
          className="font-display text-lg"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          Shivam Chopra
        </button>

        {/* Desktop: links + toggle + resume */}
        <div className="hidden md:flex items-center gap-7">
          {LINKS.map(l => (
            <a
              key={l.id}
              href={'#' + l.id}
              onClick={e => scrollTo(e, l.id)}
              className="font-mono"
              aria-current={active === l.id ? 'true' : undefined}
              style={{
                textDecoration: 'none', cursor: 'pointer',
                fontSize: '0.74rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                color: active === l.id ? 'var(--accent)' : 'var(--muted)',
                transition: 'color 0.2s',
              }}
            >
              {l.label}
            </a>
          ))}

          <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />

          <a href={personalInfo.resumeUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.68rem' }}>
            Resume ↗
          </a>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div className="md:hidden">
            <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />
          </div>
          <button
            className="md:hidden"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {open
                ? <><line x1="2" y1="2" x2="20" y2="20" stroke="currentColor" strokeWidth="2"/><line x1="20" y1="2" x2="2" y2="20" stroke="currentColor" strokeWidth="2"/></>
                : <><line x1="2" y1="5"  x2="20" y2="5"  stroke="currentColor" strokeWidth="2"/><line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="2"/><line x1="2" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="2"/></>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
          {LINKS.map(l => (
            <a
              key={l.id}
              href={'#' + l.id}
              onClick={e => scrollTo(e, l.id)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '0.85rem 1.5rem', textDecoration: 'none',
                borderBottom: '1px solid var(--border)', cursor: 'pointer',
                fontFamily: 'var(--mono)', fontSize: '0.78rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: active === l.id ? 'var(--accent)' : 'var(--muted)',
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}