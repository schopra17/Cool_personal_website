import { useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { getPost, posts, formatDate } from '../lib/posts';
import { goHome, navigate } from '../lib/useHashRoute';

export default function BlogPost({ slug }: { slug: string }) {
  const post = getPost(slug);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const previous = document.title;
    if (post) document.title = `${post.title} · ${personalInfo.name}`;
    return () => { document.title = previous; };
  }, [slug, post]);

  if (!post) {
    return (
      <article className="post-page">
        <div className="post-container">
          <h1 className="post-title">Post not found</h1>
          <p className="post-lede">There’s no post at <code>{slug}</code>.</p>
          <button className="btn-ghost" onClick={() => goHome('blog')}>← All posts</button>
        </div>
      </article>
    );
  }

  const index = posts.findIndex(p => p.slug === slug);
  const newer = index > 0 ? posts[index - 1] : null;
  const older = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;

  return (
    <article className="post-page">
      <div className="post-container">
        <button className="post-back font-mono" onClick={() => goHome('blog')}>
          ← All posts
        </button>

        <header className="post-header">
          <div className="post-meta font-mono">
            <span>{formatDate(post.date)}</span>
            <span className="blog-dot">·</span>
            <span>{post.readingTime} min read</span>
          </div>

          <h1 className="post-title">{post.title}</h1>

          {post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map(t => <span key={t} className="tag tag-sm">{t}</span>)}
            </div>
          )}
        </header>

        {post.cover && (
          <img className="post-cover" src={post.cover} alt={post.coverAlt ?? ''} />
        )}

        <div className="post-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            /* Posts are authored by hand and live in this repo, so raw HTML in
               them is trusted — this is what makes <iframe> video embeds work. */
            rehypePlugins={[rehypeRaw]}
            components={{
              a: ({ href, children, ...rest }) => (
                <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer" {...rest}>
                  {children}
                </a>
              ),
              img: ({ src, alt }) => (
                <figure className="post-figure">
                  <img src={src as string} alt={alt ?? ''} loading="lazy" />
                  {alt && <figcaption>{alt}</figcaption>}
                </figure>
              ),
            }}
          >
            {post.body}
          </ReactMarkdown>
        </div>

        {(newer || older) && (
          <nav className="post-nav">
            {older ? (
              <button className="post-nav-link" onClick={() => navigate(`/blog/${older.slug}`)}>
                <span className="font-mono">← Older</span>
                <strong>{older.title}</strong>
              </button>
            ) : <span />}
            {newer ? (
              <button className="post-nav-link post-nav-right" onClick={() => navigate(`/blog/${newer.slug}`)}>
                <span className="font-mono">Newer →</span>
                <strong>{newer.title}</strong>
              </button>
            ) : <span />}
          </nav>
        )}
      </div>
    </article>
  );
}
