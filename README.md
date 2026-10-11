# Rajdeep Palit | Video Editing Portfolio

A dark, cinematic portfolio site built with **React + TypeScript + Tailwind CSS + Vite**.
It shows four highlights from one edited video, plus an interactive **RAW → FINAL EDIT** player that switches between two real video files.

> **Honest status:** the source was bundled and exercised in a headless browser (playback exclusivity, modal, Before/After switch, error + retry, lazy loading, links, reduced motion, overflow at phone/tablet/desktop sizes). The test browser cannot decode H.264, so playback was tested with small WebM stand-ins; your real MP4s were not played back in that run. `npm run build` and the TypeScript type check were **not** run (no internet in my environment). Run them once yourself (steps below) and check the testing checklist at the end.

---

## 1. Run it (beginner steps)

1. Install **Node.js 18 or newer** from <https://nodejs.org> (the "LTS" button).
2. Unzip this folder, open a terminal inside it (`rajdeep-portfolio`).
3. Install and start:

```bash
npm install
npm run dev
```

4. Open the address it prints (usually <http://localhost:5173>).
5. Before deploying, run `npm run build`. If it prints any error, send it to me.

> If `npm install` complains about the `lucide-react` version, run `npm install lucide-react@latest`.

---

## 2. Folder structure

```
rajdeep-portfolio/
├─ public/
│  ├─ videos/            ← ALL your video files go here (see section 3)
│  ├─ posters/           ← preview images (JPG) shown before a video plays
│  └─ favicon.svg
├─ src/
│  ├─ config/
│  │  ├─ videos.ts       ← THE video mapping (edit this to change videos/titles)
│  │  └─ site.ts         ← name, location, Fiverr + YouTube links, nav links
│  ├─ components/
│  │  ├─ Navbar.tsx  Hero.tsx  PortfolioShowcase.tsx  VideoCard.tsx  VideoModal.tsx
│  │  ├─ BeforeAfterPlayer.tsx  VideoPlayer.tsx  Reveal.tsx
│  │  └─ Services.tsx  About.tsx  Workflow.tsx  Contact.tsx  Footer.tsx
│  ├─ hooks/useInView.ts ← scroll-reveal helper
│  ├─ lib/media.ts       ← turns file names / URLs into video URLs
│  ├─ lib/playback.ts    ← "only one video plays at a time" coordinator
│  ├─ App.tsx  main.tsx  index.css
├─ index.html  tailwind.config.js  vite.config.ts  package.json  tsconfig.json
└─ .env.example          ← optional: host videos on a CDN
```

---

## 3. Where all 10 videos go

| Upload # | Role | Original filename | Used by the site as | Shown on site? |
|---|---|---|---|---|
| 1 | reference-01 | `1000031017_1_.mp4` | design inspiration only | **No** |
| 2 | reference-02 | `1000031016_1_.mp4` | design inspiration only | **No** |
| 3 | reference-03 | `1000031015_1_.mp4` | design inspiration only | **No** |
| 4 | reference-04 | `1000031018_1_.mp4` | design inspiration only | **No** |
| 5 | edited-clip-01 | `lv_0_20260923121624_2.mp4` | `public/videos/edited-clip-01.mp4` | Highlight 1 |
| 6 | edited-clip-02 | `lv_0_20260923121624_3.mp4` | `public/videos/edited-clip-02.mp4` | Highlight 2 |
| 7 | edited-clip-03 | `lv_0_20260923121624_4.mp4` | `public/videos/edited-clip-03.mp4` | Highlight 3 |
| 8 | edited-clip-04 | `lv_0_20260923121624_5.mp4` | `public/videos/edited-clip-04.mp4` | Highlight 4 |
| 9 | full-raw | `lv_0_20260928100143.mp4` | `public/videos/full-raw.mp4` | **BEFORE / RAW FOOTAGE** |
| 10 | full-edited | `lv_0_20260923121624.mp4` | `public/videos/full-edited.mp4` | **AFTER / FINAL EDIT** |

Files 5–10 are already copied into `public/videos/` under these names, byte-for-byte identical to your uploads. Posters (preview frames) were generated from the videos and are in `public/posters/`.

The four reference videos are **not** in this project. They belong to other creators and must never appear as your work. Keep them on your own computer.

**To replace a video:** put the new file in `public/videos/` with the same name, or change the `file` value in `src/config/videos.ts`. `file` can also be a full hosted URL (`https://...mp4`). To host everything on a CDN, copy `.env.example` to `.env.local` and set `VITE_MEDIA_BASE_URL`.

**Poster images:** to change the preview frame, replace the JPG with the same name in `public/posters/`, or extract a new one:
`ffmpeg -ss 5 -i public/videos/edited-clip-01.mp4 -frames:v 1 -vf scale=1280:-2 -q:v 4 public/posters/edited-clip-01.jpg`

---

## 4. How the four reference videos informed the design

Documented in `referenceVideos` inside `src/config/videos.ts` (analysis only, never rendered). In short:

| Reference | What it showed | What the design borrowed (not copied) |
|---|---|---|
| 1 | Slide-style editor portfolio on a laptop, black canvas, heavy sans title with delicate script, boxed skill lists | Bordered label chip, quiet boxed information blocks, near-black canvas |
| 2 | Black + deep-blue glow, bold glowing "PORTFOLIO.", oversized type with footage | Blue-glow atmosphere, glowing headline treatment, big type sharing the frame with video |
| 3 | Dark portfolio with a blue gradient blob, slow fade-ins | Soft gradient blobs, calm entrance motion |
| 4 | Real dark website: floating pill nav, huge headline, services list with highlighted item, big closing CTA | Floating pill navigation, oversized hero headline, services list with hover highlight, large closing CTA |

The result is an original layout in your palette (`#080B12`, `#0B1220`, `#111827`, `#F8FAFC`, `#A7B0C0`, `#5B8CFF`). It also adds a film idea of its own: video frames reveal like a widening cinema letterbox.

---

## 5. Configuring the four edited clips

Open `src/config/videos.ts` → `editedClips`. Each clip has:

- `title` and `description`: edit freely. Keep descriptions to what is visible in the clip.
- `file` / `poster`: file names (or URLs).
- `duration`: shown on the card.
- `fromFullEdit`: where the clip sits inside the full edit. These were measured by frame-matching and are approximate (about 0.1 s). That is why the card says "around".

They are presented as **four sections of one project**, never as four client projects. Cards play inline; the corner button opens a larger player (`<dialog>`; Esc closes it).

## 6. Pairing the RAW and the FINAL EDIT

`fullRaw` (File 9) and `fullEdited` (File 10) in `src/config/videos.ts` are one matched pair.
In `BeforeAfterPlayer.tsx` they are two separate `<video>` elements. **Watch the Edit** pauses the RAW file, switches layers, restarts `full-edited.mp4` from 0:00 and plays it. **Back to RAW footage** pauses the edit and shows the RAW file again at 0:00 (it waits for you to press play). Both can never play at once. The four short clips are never substituted for the full edit.

Notes on your files: `full-raw.mp4` is 960×540 (lower resolution than the edit) and its last ~2 seconds are a CapCut end card. The site preserves it as-is; consider re-exporting or trimming it.

---

## 7. Deploy (Vercel, easiest)

1. Create a free GitHub account and a new repository. Upload this folder's contents (drag and drop works; every file is under GitHub's 25 MB browser limit).
2. Go to <https://vercel.com> → **Add New → Project** → import the repository.
3. Vercel detects Vite automatically (Build command `npm run build`, Output `dist`). Click **Deploy**.
4. Done. You get a `*.vercel.app` link, and can add your own domain later in Project Settings → Domains.

Alternatives: Netlify (drag the `dist` folder after `npm run build`) or Cloudflare Pages. If you add much larger videos, check the host's file-size limits and host the videos on a CDN with `VITE_MEDIA_BASE_URL`.

---

## 8. What is deliberately NOT on the site

No testimonials, client names, awards, years of experience or statistics (none were supplied). No email address and no contact form, because no email or backend exists; contact goes through your Fiverr profile. Add social links only by putting real URLs in `src/config/site.ts` and a link in `Footer.tsx`/`Contact.tsx`.

---

## 9. Final testing checklist (do this after `npm run dev` and again on the live site)

**Playback**
- [ ] Page load does not download the big videos (browser DevTools → Network → Media is empty until you press play).
- [ ] Each of the 4 highlights plays; pressing play on one pauses the others.
- [ ] Expand button opens the large player, it autoplays, Esc/Close/backdrop click closes it.
- [ ] Before/After starts on RAW with "BEFORE / RAW FOOTAGE" and a **Watch the Edit** button.
- [ ] Watch the Edit → label "AFTER / FINAL EDIT", the edit plays, the RAW stops. Back to RAW footage returns.
- [ ] Temporarily rename `full-raw.mp4` → pressing play shows the error message and Try again.

**Navigation and links**
- [ ] Explore My Work scrolls to the highlights; every nav link scrolls to its section.
- [ ] Every Hire Me / Contact Me on Fiverr button opens https://www.fiverr.com/s/432B8Vm in a new tab.
- [ ] The "View an existing sample" link opens your YouTube video.

**Responsive and accessibility**
- [ ] Phone (≈390 px), tablet (≈820 px), desktop (≥1280 px): no sideways scrolling, text readable, buttons easy to tap.
- [ ] Tab key reaches every button/link with a visible focus ring.
- [ ] With "reduce motion" enabled in your OS, entrance animations are off.
- [ ] On a real phone, videos play inline (not forced fullscreen) and the Before/After works.
