/** Profile + links. Only facts supplied by Rajdeep live here. */
export const site = {
  name: 'Rajdeep Palit',
  role: 'Freelance Video Editor',
  location: 'Chattogram, Bangladesh',
  fiverrUrl: 'https://www.fiverr.com/s/432B8Vm',
  youtubeSampleUrl: 'https://youtu.be/RkIuLl6XejI?si=-RFGnJoL_Z_TW0-Q',
  // Add real social URLs here later (e.g. instagram: 'https://...'). Leave out what you don't have.
} as const;

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Before / After', href: '#compare' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
] as const;
