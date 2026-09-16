import { useEffect, useState } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'post'; slug: string }
  | { name: 'project'; id: string }
  | { name: 'admin' };

/**
 * Hash routing keeps deep links working on any static host (GitHub Pages,
 * Netlify, Vercel) with no server rewrite rules and no router dependency.
 *   #/blog/my-post   →  { name: 'post', slug: 'my-post' }
 *   #/project/proj1  →  { name: 'project', id: 'proj1' }
 *   #/blog-admin     →  { name: 'admin' }
 *   anything else    →  { name: 'home' }
 *
 * Bare section anchors (#about, #projects) deliberately fall through to home:
 * they are in-page links, and App scrolls to them on load.
 */
function parse(hash: string): Route {
  const path = hash.replace(/^#/, '');
  const postMatch = path.match(/^\/blog\/([A-Za-z0-9._-]+)\/?$/);
  if (postMatch) return { name: 'post', slug: postMatch[1] };
  const projectMatch = path.match(/^\/project\/([A-Za-z0-9._-]+)\/?$/);
  if (projectMatch) return { name: 'project', id: projectMatch[1] };
  if (/^\/blog-admin\/?$/.test(path)) return { name: 'admin' };
  return { name: 'home' };
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

export function navigate(path: string) {
  window.location.hash = path;
}

/** Scroll to an in-page section and keep the URL copyable, without the jump
 *  a raw hash assignment would cause. replaceState fires no hashchange, so the
 *  route stays 'home'. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  history.replaceState(null, '', '#' + id);
  el.scrollIntoView({ behavior: 'smooth' });
}

export function goHome(sectionId?: string) {
  window.location.hash = '';
  if (sectionId) {
    // Wait for the home tree to mount before scrolling to the section.
    setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }), 60);
  } else {
    window.scrollTo({ top: 0 });
  }
}
