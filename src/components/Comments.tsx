import { useEffect, useRef, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Comment } from '../types';

/** Only the columns anonymous visitors are granted — never `*` (that includes IPs). */
const PUBLIC_COLUMNS = 'id, post_slug, author_name, body, created_at, is_hidden';

const NAME_KEY = 'blog-comment-name';
const MAX_BODY = 2000;

function timeAgo(iso: string): string {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (secs < 60) return 'just now';
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function initials(name: string): string {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';
}

export default function Comments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading]   = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [name, setName]     = useState(() => localStorage.getItem(NAME_KEY) ?? '');
  const [body, setBody]     = useState('');
  const [honeypot, setHoneypot] = useState('');   // bots fill this; humans never see it
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError]   = useState<string | null>(null);
  const [justPosted, setJustPosted] = useState(false);

  const mountedAt = useRef(Date.now());

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    let cancelled = false;

    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('comments')
        .select(PUBLIC_COLUMNS)
        .eq('post_slug', slug)
        .order('created_at', { ascending: true });

      if (cancelled) return;
      if (error) setLoadError('Comments could not be loaded right now.');
      else setComments((data ?? []) as Comment[]);
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, [slug]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const cleanName = name.trim();
    const cleanBody = body.trim();

    if (!cleanName)  return setFormError('Please add a name.');
    if (!cleanBody)  return setFormError('Please write something first.');
    if (cleanBody.length > MAX_BODY) return setFormError(`Keep it under ${MAX_BODY} characters.`);

    // Honeypot filled, or the form was submitted implausibly fast → drop it
    // silently so the bot gets no signal about why it failed.
    if (honeypot || Date.now() - mountedAt.current < 3000) {
      setBody('');
      setJustPosted(true);
      return;
    }

    if (!supabase) return setFormError('Comments are not configured yet.');

    setSubmitting(true);
    const { data, error } = await supabase
      .from('comments')
      .insert({ post_slug: slug, author_name: cleanName, body: cleanBody })
      .select(PUBLIC_COLUMNS)
      .single();
    setSubmitting(false);

    if (error) {
      // P0001 is our own trigger (rate limit / duplicate) — its message is
      // written for humans, so show it as-is.
      setFormError(error.code === 'P0001' || error.message.includes('Too many') || error.message.includes('already posted')
        ? error.message
        : 'Something went wrong posting that. Please try again.');
      return;
    }

    localStorage.setItem(NAME_KEY, cleanName);
    setComments(c => [...c, data as Comment]);
    setBody('');
    setJustPosted(true);
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="comments-wrap">
        <h3 className="comments-title">Comments</h3>
        <div className="comments-empty">
          <p className="font-mono">
            Comments aren’t connected yet. Add your Supabase keys to <code>.env</code>
            {' '}and run <code>supabase/schema.sql</code>. See <code>BLOG-SETUP.md</code>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="comments-wrap">
      <h3 className="comments-title">
        Comments {comments.length > 0 && <span className="comments-count">{comments.length}</span>}
      </h3>

      {/* ── Form ── */}
      <form onSubmit={submit} className="comment-form">
        <input
          className="comment-input"
          placeholder="Your name"
          value={name}
          maxLength={50}
          onChange={e => setName(e.target.value)}
        />

        {/* Honeypot — hidden from people, irresistible to bots. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={honeypot}
          onChange={e => setHoneypot(e.target.value)}
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
        />

        <textarea
          className="comment-textarea"
          placeholder="Share a thought…"
          rows={4}
          value={body}
          maxLength={MAX_BODY}
          onChange={e => { setBody(e.target.value); setJustPosted(false); }}
        />

        <div className="comment-form-footer">
          <span className="comment-counter font-mono">
            {body.length > MAX_BODY - 300 ? `${MAX_BODY - body.length} characters left` : 'No account needed'}
          </span>
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Posting…' : 'Post Comment'}
          </button>
        </div>

        {formError && <p className="comment-error font-mono">{formError}</p>}
        {justPosted && !formError && <p className="comment-success font-mono">Thanks! Your comment is live.</p>}
      </form>

      {/* ── List ── */}
      {loading ? (
        <p className="comments-status font-mono">Loading comments…</p>
      ) : loadError ? (
        <p className="comments-status font-mono">{loadError}</p>
      ) : comments.length === 0 ? (
        <p className="comments-status font-mono">No comments yet. Be the first.</p>
      ) : (
        <ul className="comment-list">
          {comments.map(c => (
            <li key={c.id} className="comment-item">
              <div className="comment-avatar font-mono">{initials(c.author_name)}</div>
              <div className="comment-body-col">
                <div className="comment-meta">
                  <span className="comment-author">{c.author_name}</span>
                  <span className="comment-time font-mono">{timeAgo(c.created_at)}</span>
                </div>
                <p className="comment-text">{c.body}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
