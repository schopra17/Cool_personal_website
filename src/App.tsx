import Nav          from './components/Nav';
import Hero         from './components/Hero';
import About        from './components/About';
import Experience   from './components/Experience';
import Projects     from './components/Projects';
import Skills       from './components/Skills';
import Gallery      from './components/Gallery';
import Blog         from './components/Blog';
import Education    from './components/Education';
import Publications from './components/Publications';
import Contact      from './components/Contact';
import { lazy, Suspense, useEffect } from 'react';
import { useHashRoute } from './lib/useHashRoute';
import './index.css';
import './blog.css';

// The markdown renderer and Supabase client are only needed once someone opens
// a post, so they load on demand instead of weighing down the landing page.
const BlogPost      = lazy(() => import('./components/BlogPost'));
const CommentsAdmin = lazy(() => import('./components/CommentsAdmin'));

function RouteFallback() {
  return (
    <div className="post-page">
      <div className="post-container">
        <p className="comments-status font-mono">Loading…</p>
      </div>
    </div>
  );
}

export default function App() {
  const route = useHashRoute();
  // A project dialog renders over the home page, so both routes mount it.
  const showHome = route.name === 'home' || route.name === 'project';

  // Someone arriving on a bare section anchor (site.com/#experience) needs the
  // scroll after React has mounted the sections, which is past the browser's
  // own attempt.
  useEffect(() => {
    const id = window.location.hash.replace(/^#/, '');
    if (!id || id.startsWith('/')) return;
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, []);

  return (
    <>
      <Nav />
      <main>
        {route.name === 'post' && (
          <Suspense fallback={<RouteFallback />}><BlogPost slug={route.slug} /></Suspense>
        )}
        {route.name === 'admin' && (
          <Suspense fallback={<RouteFallback />}><CommentsAdmin /></Suspense>
        )}
        {showHome && (
          <>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Gallery />
            <Blog />
            <Education />
            <Publications />
            <Contact />
          </>
        )}
      </main>
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '1.2rem 1.5rem',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem',
      }}>
        <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.06em' }}>
          © 2026 Shivam Chopra · Boston, MA
        </span>
        <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.06em' }}>
          React + Vite + Tailwind
        </span>
      </footer>
    </>
  );
}
