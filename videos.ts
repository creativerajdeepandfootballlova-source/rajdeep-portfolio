/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  VIDEO CONFIGURATION: the single source of truth for all 10 supplied files.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Upload order → role → file the site loads (inside public/videos/):
 *
 *   File 1  reference-01     design reference only   (not shipped, never displayed)
 *   File 2  reference-02     design reference only   (not shipped, never displayed)
 *   File 3  reference-03     design reference only   (not shipped, never displayed)
 *   File 4  reference-04     design reference only   (not shipped, never displayed)
 *   File 5  edited-clip-01   → edited-clip-01.mp4    portfolio highlight 1
 *   File 6  edited-clip-02   → edited-clip-02.mp4    portfolio highlight 2
 *   File 7  edited-clip-03   → edited-clip-03.mp4    portfolio highlight 3
 *   File 8  edited-clip-04   → edited-clip-04.mp4    portfolio highlight 4
 *   File 9  full-raw         → full-raw.mp4          BEFORE (full RAW footage)
 *   File 10 full-edited      → full-edited.mp4       AFTER  (full final edit)
 *
 *  To swap a video: replace the file in public/videos/ (same name) OR change
 *  `file` below. `file` can also be a full hosted URL, e.g. "https://cdn.example.com/a.mp4".
 *  Posters live in public/posters/ and follow the same rule.
 */

/* ── Types ─────────────────────────────────────────────────────────────── */

export interface EditedClip {
  id: 'edited-clip-01' | 'edited-clip-02' | 'edited-clip-03' | 'edited-clip-04';
  /** Position in the original upload list (5-8). */
  uploadFile: 5 | 6 | 7 | 8;
  /** Name of the original file as uploaded; documentation only. */
  originalFilename: string;
  title: string;
  /** Only describes what is actually visible in the clip. */
  description: string;
  file: string;
  poster: string;
  /** Clip length, shown on the card. */
  duration: string;
  /** Where this section sits inside the full edited video (File 10). */
  fromFullEdit: { start: string; end: string };
}

export interface FullVideo {
  id: 'full-raw' | 'full-edited';
  uploadFile: 9 | 10;
  originalFilename: string;
  /** Accessible name for the player. */
  title: string;
  file: string;
  poster: string;
  duration: string;
}

export interface ReferenceVideo {
  id: 'reference-01' | 'reference-02' | 'reference-03' | 'reference-04';
  uploadFile: 1 | 2 | 3 | 4;
  originalFilename: string;
  /** What the reference visibly showed. */
  observed: string;
  /** Ideas borrowed (never copied) into the original design. */
  influence: string;
}

/* ── Group 1: design references (analysis only, never rendered) ────────── */

export const referenceVideos: ReferenceVideo[] = [
  {
    id: 'reference-01',
    uploadFile: 1,
    originalFilename: '1000031017_1_.mp4',
    observed:
      "Phone video of a laptop playing another editor's slide-style portfolio: black canvas, one soft yellow-green corner glow, a heavy sans 'PORTFOLIO' title paired with a delicate script, bordered three-column skill boxes, a collage-style 'My Work' slide and a closing contact slide.",
    influence:
      'Bordered label chips, the pairing of a heavy sans with an elegant italic serif, and boxed, quiet information blocks on a near-black canvas.',
  },
  {
    id: 'reference-02',
    uploadFile: 2,
    originalFilename: '1000031016_1_.mp4',
    observed:
      "Landscape portfolio presentation: black background with deep-blue glowing blobs, a bold white 'PORTFOLIO.' with a blue halo, an about slide, a software-skills slide, large type sliding behind footage, and a search-bar reveal transition.",
    influence:
      'The blue-glow-on-black atmosphere, the glowing headline treatment, and the idea of oversized type sharing the frame with footage.',
  },
  {
    id: 'reference-03',
    uploadFile: 3,
    originalFilename: '1000031015_1_.mp4',
    observed:
      'Portrait phone video of a laptop showing a dark portfolio with a blue gradient blob, a headline that fades in, a split about layout, and project thumbnails that float into place.',
    influence:
      'Soft single-colour gradient blobs instead of busy backgrounds, and calm, slow entrance motion.',
  },
  {
    id: 'reference-04',
    uploadFile: 4,
    originalFilename: '1000031018_1_.mp4',
    observed:
      'Screen walkthrough of a real dark website: huge headline, a floating pill-shaped navigation bar, a services list with one highlighted panel, an about block, and a large closing call to action.',
    influence:
      'The floating pill navigation, the oversized hero headline, the services list with a highlighted item, and the big closing call to action.',
  },
];

/* ── Group 2: four highlights cut from ONE full edited video ───────────── */

export const editedClips: EditedClip[] = [
  {
    id: 'edited-clip-01',
    uploadFile: 5,
    originalFilename: 'lv_0_20260923121624_2.mp4',
    title: 'Opening Numbers and Process',
    description:
      'An animated “12 MONTHS” title, counting numbers, a caption on the presenter, and an eBay-to-Amazon process diagram drawn with an animated line.',
    file: 'edited-clip-01.mp4',
    poster: 'edited-clip-01.jpg',
    duration: '0:07',
    fromFullEdit: { start: '0:00', end: '0:08' },
  },
  {
    id: 'edited-clip-02',
    uploadFile: 6,
    originalFilename: 'lv_0_20260923121624_3.mp4',
    title: 'Animated Text Beats',
    description:
      'Short text cards such as “The choice was mine” and “Not all sunshine & rainbows” placed between talking-head shots from two camera angles.',
    file: 'edited-clip-02.mp4',
    poster: 'edited-clip-02.jpg',
    duration: '0:17',
    fromFullEdit: { start: '0:11', end: '0:28' },
  },
  {
    id: 'edited-clip-03',
    uploadFile: 7,
    originalFilename: 'lv_0_20260923121624_4.mp4',
    title: 'Obstacles, Visualized',
    description:
      'A line-chart animation under an “Obstacles” heading, stacked eBay and Amazon cards, and a text card, cut with the presenter on camera.',
    file: 'edited-clip-03.mp4',
    poster: 'edited-clip-03.jpg',
    duration: '0:06',
    fromFullEdit: { start: '0:33', end: '0:40' },
  },
  {
    id: 'edited-clip-04',
    uploadFile: 8,
    originalFilename: 'lv_0_20260923121624_5.mp4',
    title: 'Problems and the Flipping Model',
    description:
      'Animated panels (“More issues”, “100% my fault”, “No system”), a Buy, Flip, Sell diagram, and an order-management screen, with captions on the presenter.',
    file: 'edited-clip-04.mp4',
    poster: 'edited-clip-04.jpg',
    duration: '0:18',
    fromFullEdit: { start: '0:43', end: '1:01' },
  },
];

/* ── Groups 3 + 4: the matched BEFORE / AFTER pair ─────────────────────── */

/** File 9: complete, unedited RAW footage (BEFORE). */
export const fullRaw: FullVideo = {
  id: 'full-raw',
  uploadFile: 9,
  originalFilename: 'lv_0_20260928100143.mp4',
  title: 'Raw footage, full video',
  file: 'full-raw.mp4',
  poster: 'full-raw.jpg',
  duration: '1:03',
};

/** File 10: complete final edit of the SAME project (AFTER). */
export const fullEdited: FullVideo = {
  id: 'full-edited',
  uploadFile: 10,
  originalFilename: 'lv_0_20260923121624.mp4',
  title: 'Final edit, full video',
  file: 'full-edited.mp4',
  poster: 'full-edited.jpg',
  duration: '1:01',
};

/** Poster frame (taken from the final edit) used in the hero. */
export const heroPoster = 'hero-frame.jpg';
