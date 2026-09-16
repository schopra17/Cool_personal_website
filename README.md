# shivamchopra.net

Personal site for Shivam Chopra. React + Vite + TypeScript + Tailwind.

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run build
```

## Adding content

Most changes are data, not code.

| To change | Edit |
|---|---|
| Bio, links, jobs, degrees, skills, projects, papers | `src/data/portfolioData.ts` |
| News posts | add a markdown file to `src/content/blog/` |
| Photos | paste image files into `src/assets/photos/` |

Photos need no code edit at all. Drop a file into `src/assets/photos/about/`,
`gallery/`, `hero/`, or `projects/<project id>/` and it appears on the site.
Filenames set the order and the caption: `01-beach-test.jpg` sorts first and
captions "beach test". See [src/assets/photos/README.txt](src/assets/photos/README.txt).

## For Claude Code

[CLAUDE.md](CLAUDE.md) is the working reference: architecture, the design
system's contrast rules, routing, content conventions, and the reasoning behind
past decisions. Read it before exploring the repo.
