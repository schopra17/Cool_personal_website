import type { BlogPost } from '../types';
import { folderPhotos } from './photos';

/**
 * Every .md file in src/content/blog is bundled at build time. Adding a post
 * is: drop a new .md file in that folder, commit, push. No config to update.
 */
const files = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

/** Minimal frontmatter parser: `key: value` plus `[a, b]` inline arrays. */
function parseFrontmatter(raw: string): { meta: Record<string, unknown>; body: string } {
  const match = raw.match(FRONTMATTER);
  if (!match) return { meta: {}, body: raw };

  const meta: Record<string, unknown> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.*)$/);
    if (!kv) continue;

    const key = kv[1];
    let value: unknown = kv[2].trim();

    if (typeof value === 'string') {
      // Strip matching surrounding quotes.
      value = value.replace(/^["'](.*)["']$/, '$1');
    }

    const str = value as string;
    if (/^\[.*\]$/.test(str)) {
      value = str
        .slice(1, -1)
        .split(',')
        .map(s => s.trim().replace(/^["'](.*)["']$/, '$1'))
        .filter(Boolean);
    } else if (str === 'true' || str === 'false') {
      value = str === 'true';
    }

    meta[key] = value;
  }

  return { meta, body: raw.slice(match[0].length) };
}

/** ~200 wpm, rounded up, so the card can show "4 min read". */
function readingTime(body: string): number {
  const words = body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function firstParagraph(body: string): string {
  const text = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^#{1,6}\s.*$/gm, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/<[^>]+>/g, '')
    .trim();
  const para = text.split(/\n\s*\n/)[0] ?? '';
  return para.replace(/\s+/g, ' ').slice(0, 200);
}

function build(): BlogPost[] {
  const posts = Object.entries(files).map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    const { meta, body } = parseFrontmatter(raw);

    // Photos dropped in src/assets/photos/news/<slug>/ attach themselves; the
    // first doubles as the card cover unless frontmatter names one.
    const photos = folderPhotos(`news/${slug}`);

    return {
      slug,
      title: (meta.title as string) || slug,
      date: (meta.date as string) || '',
      excerpt: (meta.excerpt as string) || firstParagraph(body),
      tags: (meta.tags as string[]) || [],
      cover: (meta.cover as string | undefined) ?? photos[0]?.src,
      coverAlt: (meta.coverAlt as string | undefined) ?? photos[0]?.caption,
      photos,
      draft: meta.draft === true,
      readingTime: readingTime(body),
      body,
    } satisfies BlogPost;
  });

  // Drafts never reach the built site.
  return posts
    .filter(p => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const posts: BlogPost[] = build();

export function getPost(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug);
}

export const allTags: string[] = [...new Set(posts.flatMap(p => p.tags))].sort();

export function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso + (iso.length === 10 ? 'T12:00:00' : ''));
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
