let audio: HTMLAudioElement | null = null;
let playingUrl: string | null = null;

export function playPreview(url: string) {
  if (playingUrl === url && audio && !audio.paused) return;
  stopPreview();
  audio = new Audio(url);
  playingUrl = url;
  void audio.play().catch(() => {});
}

export function stopPreview() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  audio = null;
  playingUrl = null;
}

export function isPlaying(url: string) {
  return playingUrl === url && audio !== null && !audio.paused;
}
