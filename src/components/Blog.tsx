import { useState } from 'react';
import { posts, allTags, formatDate } from '../lib/posts';
import { navigate } from '../lib/useHashRoute';
import { Reveal } from './Reveal';

export default function Blog() {
  const [tag, setTag] = useState<string | null>(null);
  const shown = tag ? posts.filter(p => p.tags.includes(tag)) : posts;

  return (
    <section id="news" className="section-pad" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <p className="label">News</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="heading" style={{ marginBottom: 0 }}>News</h2>

          {allTags.length > 0 && (
            <div className="blog-filters">
              <button
                onClick={() => setTag(null)}
                className={`blog-filter font-mono ${tag === null ? 'blog-filter-active' : ''}`}
              >
                All
              </button>
              {allTags.map(t => (
                <button
                  key={t}
                  onClick={() => setTag(t === tag ? null : t)}
                  className={`blog-filter font-mono ${tag === t ? 'blog-filter-active' : ''}`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {shown.length === 0 ? (
          <div className="blog-empty">
            <div style={{ fontSize: '2rem', marginBottom: '0.8rem', opacity: 0.3 }}>✍️</div>
            <p className="font-mono">
              Add a <code>.md</code> file to <code>src/content/blog/</code> to publish your first post.
            </p>
          </div>
        ) : (
          <div className="blog-grid">
            {shown.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <article
                  className="blog-card card"
                  onClick={() => navigate(`/blog/${p.slug}`)}
                  role="link"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter') navigate(`/blog/${p.slug}`); }}
                >
                  {p.cover && (
                    <div className="blog-card-cover">
                      <img src={p.cover} alt={p.coverAlt ?? ''} loading="lazy" />
                    </div>
                  )}

                  <div className="blog-card-body">
                    <div className="blog-card-meta font-mono">
                      <span>{formatDate(p.date)}</span>
                      <span className="blog-dot">·</span>
                      <span>{p.readingTime} min read</span>
                    </div>

                    <h3 className="blog-card-title">{p.title}</h3>
                    <p className="blog-card-excerpt">{p.excerpt}</p>

                    <div className="blog-card-footer">
                      <div className="blog-card-tags">
                        {p.tags.slice(0, 3).map(t => (
                          <span key={t} className="tag tag-sm">{t}</span>
                        ))}
                      </div>
                      <span className="blog-card-link font-mono">Read ↗</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
