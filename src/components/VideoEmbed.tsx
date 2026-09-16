/** Accepts a full YouTube URL (watch, youtu.be, shorts, embed) or a bare id. */
export function youTubeId(input: string): string | null {
  const s = input.trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  const m = s.match(
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : null;
}

interface Props {
  url: string;
  title: string;
  caption?: string;
}

/* 16:9 responsive embed, the way a Google Sites video block behaves.
   youtube-nocookie keeps the viewer out of YouTube's ad profile until they
   actually press play. */
export default function VideoEmbed({ url, title, caption }: Props) {
  const id = youTubeId(url);
  if (!id) return null;

  return (
    <figure>
      <div className="video-embed">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      {caption && <figcaption className="video-caption">{caption}</figcaption>}
    </figure>
  );
}
