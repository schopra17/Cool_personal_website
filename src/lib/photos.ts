/**
 * Drop-in photo folders.
 *
 * Any image saved under src/assets/photos/<folder>/ is picked up automatically
 * at build time. No code edit, no path to type: paste the file, save, done.
 *
 *   src/assets/photos/about/        → the rotating panel in the About section
 *   src/assets/photos/gallery/      → the Gallery section, "general" tab
 *   src/assets/photos/projects/<id>/→ that project's card, modal, and the
 *                                     Gallery "projects" tab (id is the
 *                                     project's id in portfolioData.ts,
 *                                     e.g. proj1)
 *
 * ORDER  Files are sorted by filename, so prefix them to control the sequence:
 *          01-beach-test.jpg, 02-lab-bench.jpg, 03-field-trip.jpg
 *
 * CAPTIONS  The filename becomes the caption. Leading numbers are dropped and
 * dashes or underscores become spaces:
 *          02-sand_swimming-robot.jpg  →  "sand swimming robot"
 *          02 Testing on the beach.jpg →  "Testing on the beach"
 * Camera-style names (IMG_4821, DSC01234, PXL_2024...) get no caption, so a
 * straight phone dump stays clean.
 *
 * FORMATS  jpg, jpeg, png, webp, avif, gif.
 */

export interface Photo { src: string; caption?: string }

const files = import.meta.glob(
  '../assets/photos/**/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,avif,AVIF,gif,GIF}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const CAMERA_NAME = /^(img|dsc|dscn|pxl|photo|image|screenshot|p\d|gopr)[-_ ]?\d+$/i;

function captionFrom(filename: string): string | undefined {
  const base = filename.replace(/\.[^.]+$/, '');
  const stripped = base.replace(/^\d+[-_. ]+/, '');      // drop ordering prefix
  if (!stripped || CAMERA_NAME.test(stripped)) return undefined;
  const words = stripped.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
  return words || undefined;
}

/** Photos in src/assets/photos/<folder>, sorted by filename. */
export function folderPhotos(folder: string): Photo[] {
  const prefix = `../assets/photos/${folder}/`;
  return Object.keys(files)
    .filter(path => path.startsWith(prefix) && !path.slice(prefix.length).includes('/'))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map(path => ({
      src: files[path],
      caption: captionFrom(path.slice(prefix.length)),
    }));
}
