export interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail?: string;
  images?: string[];      // plain srcs, used by the Gallery section
  /** Same photos with captions, filled in from src/assets/photos/projects/<id>.
   *  The first is the card image; the modal lists them all. */
  photos?: { src: string; caption?: string }[];
  /** YouTube link or bare id. Embedded at the top of the project modal. */
  video?: string;
  videoCaption?: string;
  skills?: string[];      // skill tags shown at bottom of modal
  description: string;
  fullDescription: string;
  status?: 'complete' | 'in-progress';
  objectives: string[];
  results: string[];
  keyTakeaways: string[];
  goals: string[];
  github?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: string;
  abstract: string;
  pdfUrl?: string;
  externalUrl?: string;
  /** Display rank among the highlighted papers (1, 2, 3...). Unranked papers
   *  sit behind the "show all" toggle in the Research section. */
  featured?: number;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  /** One line shown in the collapsed row. The responsibilities below it stay
   *  hidden until the reader asks for them. */
  summary?: string;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  honors?: string[];
  courses?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface BlogPost {
  slug: string;            // filename without .md — also the URL: #/blog/<slug>
  title: string;
  date: string;            // ISO, e.g. 2026-08-15
  excerpt: string;         // falls back to the first paragraph
  tags: string[];
  cover?: string;          // path under /public, e.g. /blog/rover.jpg
  coverAlt?: string;
  /** Photos from src/assets/photos/news/<slug>/, shown under the post. */
  photos?: { src: string; caption?: string }[];
  draft: boolean;          // draft: true keeps it off the live site
  readingTime: number;     // minutes
  body: string;            // markdown, frontmatter stripped
}

export interface Comment {
  id: string;
  post_slug: string;
  author_name: string;
  body: string;
  created_at: string;
  is_hidden: boolean;
}