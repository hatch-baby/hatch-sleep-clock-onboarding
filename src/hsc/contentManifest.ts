import { easeThumbnails, wakeThumbnails } from "./figmaAssets";
import type { Category, ContentPick } from "./types";

function pick(
  id: string,
  title: string,
  meta: string,
  thumbMap: Record<string, string>,
  audioPath: string
): ContentPick {
  return {
    id,
    title,
    meta,
    imageUrl: thumbMap[id] ?? "/media/wake/morning-rave.png",
    audioUrl: audioPath,
  };
}

const wakeHighEnergy = [
  pick("morning-rave", "Morning Rave", "High energy • Shuffle", wakeThumbnails, "/audio/wake/morning-rave.mp3"),
  pick("gold-medal-morning", "Gold Medal Morning", "High energy • Sports", wakeThumbnails, "/audio/wake/gold-medal-morning.mp3"),
  pick("nyc-morning", "New York City Morning", "High energy • Cityscapes", wakeThumbnails, "/audio/wake/nyc-morning.mp3"),
];

const wakeNature = [
  pick("forest-dawn", "Forest Dawn", "Nature • Birds", wakeThumbnails, "/audio/wake/forest-dawn.mp3"),
  pick("ocean-breeze", "Ocean Breeze", "Nature • Waves", wakeThumbnails, "/audio/wake/ocean-breeze.mp3"),
  pick("mountain-air", "Mountain Air", "Nature • Wind", wakeThumbnails, "/audio/wake/mountain-air.mp3"),
];

const wakeGentle = [
  pick("soft-piano", "Soft Piano", "Soft & gentle", wakeThumbnails, "/audio/wake/soft-piano.mp3"),
  pick("morning-mist", "Morning Mist", "Ambient • Calm", wakeThumbnails, "/audio/wake/morning-mist.mp3"),
  pick("quiet-sunrise", "Quiet Sunrise", "Acoustic • Light", wakeThumbnails, "/audio/wake/quiet-sunrise.mp3"),
];

const wakeSunrise = [
  pick("sunrise-only", "Sunrise light only", "No sound", wakeThumbnails, "/audio/wake/sunrise-only.mp3"),
  pick("gentle-glow", "Gentle Glow", "Light fade", wakeThumbnails, "/audio/wake/gentle-glow.mp3"),
  pick("dawn-rise", "Dawn Rise", "Warm light", wakeThumbnails, "/audio/wake/dawn-rise.mp3"),
];

export const wakeCategories: Category[] = [
  { id: "takeMeOutside", title: "Take me outside", subtitle: "Nature sounds", picks: wakeNature },
  { id: "takeMyTime", title: "Take my time", subtitle: "Soft & gentle music", picks: wakeGentle },
  { id: "readyToGo", title: "Ready to go", subtitle: "High energy music", picks: wakeHighEnergy },
  { id: "justSunrise", title: "Just the sunrise", subtitle: "No sound", picks: wakeSunrise },
];

const easeStory = [
  pick("ophelia-trilogy", "Ophelia: Trilogy", "Audiobooks • 19min", easeThumbnails, "/audio/ease/ophelia-trilogy.mp3"),
  pick("love-letters", "Love Letters", "Audiobooks • 19min", easeThumbnails, "/audio/ease/love-letters.mp3"),
  pick("midnight-library", "The Midnight Library", "Audiobooks • 22min", easeThumbnails, "/audio/ease/midnight-library.mp3"),
];

const easeSoundBath = [
  pick("deep-harmony", "Deep Harmony", "Sound bath • 30min", easeThumbnails, "/audio/ease/deep-harmony.mp3"),
  pick("crystal-bowl", "Crystal Bowl", "Sound bath • 25min", easeThumbnails, "/audio/ease/crystal-bowl.mp3"),
  pick("floating-tones", "Floating Tones", "Sound bath • 20min", easeThumbnails, "/audio/ease/floating-tones.mp3"),
];

const easeSleep = [
  pick("rain-on-roof", "Rain on Roof", "Sleep sounds", easeThumbnails, "/audio/ease/rain-on-roof.mp3"),
  pick("white-noise", "Steady White Noise", "Sleep sounds", easeThumbnails, "/audio/ease/white-noise.mp3"),
  pick("fan-hum", "Fan Hum", "Sleep sounds", easeThumbnails, "/audio/ease/fan-hum.mp3"),
];

const easeMeditation = [
  pick("body-scan", "Body Scan", "Meditation • 15min", easeThumbnails, "/audio/ease/body-scan.mp3"),
  pick("breath-work", "Breath Work", "Meditation • 12min", easeThumbnails, "/audio/ease/breath-work.mp3"),
  pick("letting-go", "Letting Go", "Meditation • 18min", easeThumbnails, "/audio/ease/letting-go.mp3"),
];

export const easeCategories: Category[] = [
  { id: "withAStory", title: "With a story", subtitle: "Audiobooks", picks: easeStory },
  { id: "immersedInSound", title: "Immersed in sound", subtitle: "Sound baths", picks: easeSoundBath },
  { id: "outLikeALight", title: "Out like a light", subtitle: "Sleep Sounds", picks: easeSleep },
  { id: "withGuidance", title: "With guidance", subtitle: "Meditations", picks: easeMeditation },
];

export function getWakeCategory(id: string) {
  return wakeCategories.find((c) => c.id === id);
}

export function getEaseCategory(id: string) {
  return easeCategories.find((c) => c.id === id);
}

/** Figma 727 tile order: TL take my time, TR take me outside, BL ready to go, BR just sunrise */
export const wakeCategoryPositions = [
  { id: "takeMyTime", pos: "tl" as const },
  { id: "takeMeOutside", pos: "tr" as const },
  { id: "readyToGo", pos: "bl" as const },
  { id: "justSunrise", pos: "br" as const },
];

export const easeCategoryPositions = [
  { id: "withAStory", pos: "tl" as const },
  { id: "immersedInSound", pos: "tr" as const },
  { id: "outLikeALight", pos: "bl" as const },
  { id: "withGuidance", pos: "br" as const },
];
