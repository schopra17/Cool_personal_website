# Shivam Chopra, personal site

Reference for future sessions. Read this before exploring the repo; it should
answer most questions without a file sweep.

Personal portfolio for **Shivam Chopra** (Senior Medical Device Engineer at
Dexcom, Robotics PhD from UC San Diego). Forked from Siddhi More's portfolio
template and rebuilt around Shivam's content, originally migrated from
https://www.shivamchopra.net (a Google Site).

---

## Commands

```bash
npm run dev        # Vite dev server, port 5173
npm run typecheck  # tsc --noEmit. Must be clean.
npm run build      # production build
npm run lint       # eslint
```

Preview in the Browser pane with the `portfolio-dev` config in
`.claude/launch.json`. Large emulated viewports give unreliable screenshots;
prefer `javascript_tool` with `getBoundingClientRect` for measuring layout.

## Stack

React 18, Vite 5, TypeScript, Tailwind 3. No router, no CSS framework beyond
Tailwind utilities; nearly all styling lives in `src/index.css` as plain CSS
with custom properties.

---

## Writing style (IMPORTANT)

**Never use dashes as punctuation in site copy.** No em dashes, no en dashes,
no hyphens standing in for a comma or colon. Rewrite the sentence or use a
comma, colon, or full stop instead. Hyphens *inside* compound words
("cross-functional", "risk-based", "end-to-end") are fine. This is a standing
preference from Shivam and it applies to all user-visible text: page copy,
blog posts, button labels, captions. Code comments are exempt.

---

## Where content lives

Almost everything is data, not markup. Prefer editing data over components.

| What | Where |
|---|---|
| Bio, links, resume path, location | `personalInfo` in `src/data/portfolioData.ts` |
| Jobs | `experience[]` (same file) |
| Degrees | `education[]` |
| Skill groups | `skills[]` |
| Projects | `projectList[]`, exported as `projects` |
| Papers | `publications[]` |
| Press outlets | `press[]` (currently all commented out, strip hides itself) |
| News posts | markdown in `src/content/blog/*.md`, parsed by `src/lib/posts.ts` |
| Photos | drop files in folders, see below |

`src/types/index.ts` has every interface.

### Photos: folder based, no code edits

`src/lib/photos.ts` globs `src/assets/photos/**` at build time. Paste a file
into a folder and it appears on the site.

```
src/assets/photos/about/field/      About, LEFT frame: work photos
src/assets/photos/about/life/       About, RIGHT frame: Shimla, outdoors
src/assets/photos/gallery/          Gallery section (not currently rendered)
src/assets/photos/hero/             Panel beside the name, hidden while empty
src/assets/photos/news/<slug>/      Under that post; first one is its card cover
src/assets/photos/projects/<id>/    id matches a project id, e.g. proj1
```

**Videos**: a `.mp4` in any of these folders is treated as another slide and
plays inline, muted and looping, via `Media.tsx`. Never commit a GIF or a phone
`.MOV`: they were 30x to 100x larger for the same clip (91MB of GIFs became
3.7MB of MP4; two 14MB .MOVs became 0.8 and 1.4MB). Convert first:

```bash
ffmpeg -nostdin -i in.gif -movflags +faststart -pix_fmt yuv420p \
  -vf "scale='trunc(min(1280,iw)/2)*2':-2:flags=lanczos" \
  -c:v libx264 -preset slow -crf 26 -an out.mp4
```

`trunc(.../2)*2` matters: x264 refuses odd widths with yuv420p. `-nostdin`
matters in a shell loop, or ffmpeg eats the loop's input and mangles filenames.

**Oversized stills**: downscale to 1800px long edge. Use ffmpeg for ordinary
files, but **use `sips` for iPhone photos**: they carry an embedded HEVC gain
map as a second stream, and ffmpeg's `-map 0:v:0` picks the 512x512 gain map
instead of the photo, silently producing a 2KB thumbnail.

```bash
sips -Z 1800 -s format jpeg -s formatOptions 80 \
  -s profile '/System/Library/ColorSync/Profiles/sRGB Profile.icc' in.jpg --out in.jpg
```

`sips -Z` will UPSCALE a small image, so check the long edge first.

Filenames drive order and captions: `01-beach-test.jpg` sorts first and
captions "beach test"; `IMG_4821.jpg` gets no caption (camera-style names are
ignored). `src/assets/photos/README.txt` is the user-facing version of this,
and each project folder has a README.txt naming its project.

`public/gallery/` is empty and carries a README pointing here; the fork's 25
photos were deleted (18MB). `public/doppler.jpg` is also an unreferenced fork
leftover, still present.

---

## Page structure

`src/App.tsx` renders, in order: Hero, About, Experience, Projects, Skills,
Blog (News), Education, Publications, Contact.

`src/components/Gallery.tsx` exists but is **not rendered**: its "projects"
tab only repeated photos already shown in Projects and its "general" tab was
empty, so the section was removed. Re-add `<Gallery />` in App.tsx and its nav
link once `src/assets/photos/gallery/` has photos worth a section.

The nav is deliberately **five items**: About, Experience, Projects,
Publications, Contact. Skills, News, and Education are sections on the page but
not in the menu, matching the old Google Site's shape. **News must not be added
to the nav**, that was an explicit instruction.

### Routing

Hash based, `src/lib/useHashRoute.ts`, no dependency:

- `#/blog/<slug>` a news post
- `#/project/<id>` opens that project's dialog over the home page
- `#/blog-admin` comments admin (orphaned, see below)
- `#about`, `#projects`, ... bare section anchors, resolve to the home route;
  `App.tsx` scrolls to them on load since React mounts after the browser tries

`scrollToSection()` uses `replaceState` so the URL stays copyable without the
jump a raw hash assignment causes.

---

## Design system

All in `src/index.css`. Retro-terminal on warm paper: thick ink outlines, hard
offset shadows with no blur, square corners, stepped transitions.

Read the comment block at the top of the file before touching colors. The short
version: amber, coral and periwinkle measure 1.5 to 2.6:1 on the cream ground
and **cannot carry text**. They are fills only. Text uses `--ink`, `--muted`,
or `--accent` (a rust derived from the coral, 5.05:1).

Key classes: `.win` / `.win-bar` / `.win-body` (window chrome), `.card`,
`.btn-primary` / `.btn-ghost`, `.tag`, `.label`, `.heading`, `.photo-frame`,
`.xp-*` (experience timeline), `.bench-*` (hero side panels), `.hero-*`.

`.max-w-6xl` is overridden to 1400px so wide screens do not read as margin.

### Progressive disclosure

The page was too long to scroll, so three sections collapse by default. Keep
this pattern when adding content.

- **Experience**: each role shows title, meta line, and a one-line `summary`;
  bullets hide behind a "Detail" toggle. All start closed.
- **Publications**: only papers with a `featured: 1|2|3` rank show; the rest
  sit behind "Read more: Further publications". Abstracts open individually.
- **Projects**: cards open a dialog rather than expanding inline.

---

### Images: whole, not cropped

Project cards show ONE lead image in a 16:10 box with `object-fit: contain`,
and the modal stacks every photo full width at natural height. About frames are
square with `contain` too. This is deliberate: about half of Shivam's images
are annotated technical figures, and a figure with its labels cropped off is
worthless. The hero panel and gallery tiles still use `cover`.

Card colour is per CATEGORY (`GROUP_HUES` indexed by group), not per card, so
every card in a group shares a hue and matches its banded header swatch.

A project may set `video` (any YouTube URL or bare id) plus `videoCaption`;
`VideoEmbed.tsx` renders a 16:9 youtube-nocookie iframe at the top of the modal.

## Decisions worth knowing

- **GitHub is deliberately demoted.** Shivam's repos are sparse and most of his
  code is unpublished PhD/MS work. It is a small text link under the hero CTAs
  next to Scholar and LinkedIn, not a button. Do not promote it back to a
  primary CTA. Per-project GitHub links are the intended path to code. He wants
  help auditing his PhD/MS code for publishing later; note that lab code may be
  governed by UCSD or grant terms, so he should check with Nick Gravish first.
- **Placeholders**: empty photo slots render as designed framed slots, not
  emoji on grey, and never as developer instructions. The hero panel hides
  itself entirely when empty; the two About frames show placeholders on purpose.
- **Data discrepancies** between the CV and earlier hand edits, CV won in each
  case and it is flagged in a comment in `portfolioData.ts`: PhD March 2022 (not
  January), BE August 2016 (not May). The CV says Cambridge MA but the site says
  **Boston, MA**, which is Shivam's explicit instruction. Leave it.
- **Comments are removed** from news posts. `Comments.tsx`, `CommentsAdmin.tsx`
  and `src/lib/supabase.ts` still exist but nothing renders `Comments`. The
  `#/blog-admin` route is orphaned. Safe to delete if asked.
- Never invent content. Coursework, dates, and bullet points come from the CV
  (`public/ShivamChopraResume.pdf`) or from Shivam. When the CV is silent, ask
  rather than write something plausible.

## Still blank, pending Shivam

Photos in every folder, `personalInfo.photo2`, and the `press[]` list is
commented out awaiting a decision to re-enable.

## Extracting the CV

`pdftotext` is not installed. This works:

```bash
python3 -c "
import zlib,re
d=open('public/ShivamChopraResume.pdf','rb').read()
out=[]
for m in re.finditer(rb'stream\r?\n(.*?)endstream', d, re.S):
    try: out.append(zlib.decompress(m.group(1)))
    except Exception: pass
t=b'\n'.join(out).decode('latin-1')
print(' '.join(x[1:-1] for x in re.findall(r'\((?:[^()\\\\]|\\\\.)*\)', t)))
"
```

## Deployment

GitHub Pages, built by `.github/workflows/deploy.yml` on every push to `main`.
Nothing built is committed: the Action runs typecheck + build and publishes
`dist/`.

- Custom domain lives in `public/CNAME` (`shivamchopra.net`), not just in the
  GitHub UI, so a redeploy cannot wipe it.
- Vite `base` is left at `/` because the site is served from a domain root. If
  it ever moves to `username.github.io/<repo>/`, `base` must be set or every
  asset 404s.
- Hash routing (`#/project/...`) is why this works on Pages with no rewrite
  rules. Do not switch to history routing without adding a 404.html fallback.
- DNS is Cloudflare. Records must be **DNS only (grey cloud)** and SSL/TLS
  mode **Full**; Flexible causes a redirect loop with Pages.
- `www` is a CNAME to `schopra17.github.io` (DNS only); GitHub redirects it to
  the apex. Google Sites no longer serves the domain. Keep the
  `google-site-verification` TXT record: it is only for Search Console.
- If a certificate never issues, removing and re-adding the custom domain via
  `gh api -X PUT repos/schopra17/Cool_personal_website/pages -f cname=...`
  restarts the request. **Do not** temporarily set `www` as the primary
  domain: GitHub keeps redirecting apex to www for several minutes after
  switching back, which takes the site down.

## Known issues

- `public/doppler.jpg` is an unreferenced leftover from the fork.
