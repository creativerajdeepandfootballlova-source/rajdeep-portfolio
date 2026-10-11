/**
 * Resolves a file name from src/config/videos.ts into a URL.
 *
 *  - Full URLs ("https://...") are used exactly as written (hosted video).
 *  - Plain file names become "<base>/videos/<file>" or "<base>/posters/<file>".
 *  - <base> is empty by default (local files in /public) and can be set with
 *    VITE_MEDIA_BASE_URL to point at a CDN or storage bucket.
 */
const base = ((import.meta.env.VITE_MEDIA_BASE_URL as string | undefined) ?? '').replace(/\/+$/, '');

const isAbsolute = (value: string) => /^(https?:)?\/\//i.test(value);

export const videoUrl = (file: string) => (isAbsolute(file) ? file : `${base}/videos/${file}`);
export const posterUrl = (file: string) => (isAbsolute(file) ? file : `${base}/posters/${file}`);
