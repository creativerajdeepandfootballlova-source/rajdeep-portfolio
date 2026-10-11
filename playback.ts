/**
 * Global "one video at a time" coordinator.
 *
 * Every <VideoPlayer> registers a pause function. When any player starts
 * (via our buttons OR the browser's native controls) it calls claimPlayback(),
 * which pauses every other registered player. This is what guarantees that
 * the four clips, the modal, and the RAW / FINAL EDIT players never overlap.
 */
const players = new Map<string, () => void>();

export function registerPlayer(id: string, pause: () => void): () => void {
  players.set(id, pause);
  return () => {
    if (players.get(id) === pause) players.delete(id);
  };
}

export function claimPlayback(activeId: string): void {
  players.forEach((pause, id) => {
    if (id !== activeId) pause();
  });
}
