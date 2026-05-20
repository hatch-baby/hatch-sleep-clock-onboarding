import type { Category } from "./types";

const wakeHighEnergy = [
  { id: "morning-rave", title: "Morning Rave", meta: "High energy • Shuffle", artworkHue: "#E8D4B8", audioUrl: "/audio/wake/morning-rave.mp3" },
  { id: "gold-medal-morning", title: "Gold Medal Morning", meta: "High energy • Sports", artworkHue: "#D4C4A8", audioUrl: "/audio/wake/gold-medal-morning.mp3" },
  { id: "nyc-morning", title: "New York City Morning", meta: "High energy • Cityscapes", artworkHue: "#C9B89A", audioUrl: "/audio/wake/nyc-morning.mp3" },
];

const wakeNature = [
  { id: "forest-dawn", title: "Forest Dawn", meta: "Nature • Birds", artworkHue: "#B8C9A8", audioUrl: "/audio/wake/forest-dawn.mp3" },
  { id: "ocean-breeze", title: "Ocean Breeze", meta: "Nature • Waves", artworkHue: "#A8C4C9", audioUrl: "/audio/wake/ocean-breeze.mp3" },
  { id: "mountain-air", title: "Mountain Air", meta: "Nature • Wind", artworkHue: "#C4B8A8", audioUrl: "/audio/wake/mountain-air.mp3" },
];

const wakeGentle = [
  { id: "soft-piano", title: "Soft Piano", meta: "Soft & gentle", artworkHue: "#E4DDD4", audioUrl: "/audio/wake/soft-piano.mp3" },
  { id: "morning-mist", title: "Morning Mist", meta: "Ambient • Calm", artworkHue: "#D8D4CE", audioUrl: "/audio/wake/morning-mist.mp3" },
  { id: "quiet-sunrise", title: "Quiet Sunrise", meta: "Acoustic • Light", artworkHue: "#E0D8CC", audioUrl: "/audio/wake/quiet-sunrise.mp3" },
];

const wakeSunrise = [
  { id: "sunrise-only", title: "Sunrise light only", meta: "No sound", artworkHue: "#F0E6D0", audioUrl: "/audio/wake/sunrise-only.mp3" },
  { id: "gentle-glow", title: "Gentle Glow", meta: "Light fade", artworkHue: "#EDE4D4", audioUrl: "/audio/wake/gentle-glow.mp3" },
  { id: "dawn-rise", title: "Dawn Rise", meta: "Warm light", artworkHue: "#E8DCC8", audioUrl: "/audio/wake/dawn-rise.mp3" },
];

export const wakeCategories: Category[] = [
  { id: "takeMeOutside", title: "Take me outside", subtitle: "Nature sounds", picks: wakeNature },
  { id: "takeMyTime", title: "Take my time", subtitle: "Soft & gentle music", picks: wakeGentle },
  { id: "readyToGo", title: "Ready to go", subtitle: "High energy music", picks: wakeHighEnergy },
  { id: "justSunrise", title: "Just the sunrise", subtitle: "No sound", picks: wakeSunrise },
];

const easeStory = [
  { id: "ophelia-trilogy", title: "Ophelia: Trilogy", meta: "Audiobooks • 19min", artworkHue: "#C9B8A4", audioUrl: "/audio/ease/ophelia-trilogy.mp3" },
  { id: "love-letters", title: "Love Letters", meta: "Audiobooks • 19min", artworkHue: "#B8A898", audioUrl: "/audio/ease/love-letters.mp3" },
  { id: "midnight-library", title: "The Midnight Library", meta: "Audiobooks • 22min", artworkHue: "#A89888", audioUrl: "/audio/ease/midnight-library.mp3" },
];

const easeSoundBath = [
  { id: "deep-harmony", title: "Deep Harmony", meta: "Sound bath • 30min", artworkHue: "#9A8E82", audioUrl: "/audio/ease/deep-harmony.mp3" },
  { id: "crystal-bowl", title: "Crystal Bowl", meta: "Sound bath • 25min", artworkHue: "#8E8278", audioUrl: "/audio/ease/crystal-bowl.mp3" },
  { id: "floating-tones", title: "Floating Tones", meta: "Sound bath • 20min", artworkHue: "#827870", audioUrl: "/audio/ease/floating-tones.mp3" },
];

const easeSleep = [
  { id: "rain-on-roof", title: "Rain on Roof", meta: "Sleep sounds", artworkHue: "#6E6860", audioUrl: "/audio/ease/rain-on-roof.mp3" },
  { id: "white-noise", title: "Steady White Noise", meta: "Sleep sounds", artworkHue: "#646058", audioUrl: "/audio/ease/white-noise.mp3" },
  { id: "fan-hum", title: "Fan Hum", meta: "Sleep sounds", artworkHue: "#5A5650", audioUrl: "/audio/ease/fan-hum.mp3" },
];

const easeMeditation = [
  { id: "body-scan", title: "Body Scan", meta: "Meditation • 15min", artworkHue: "#7A7268", audioUrl: "/audio/ease/body-scan.mp3" },
  { id: "breath-work", title: "Breath Work", meta: "Meditation • 12min", artworkHue: "#706860", audioUrl: "/audio/ease/breath-work.mp3" },
  { id: "letting-go", title: "Letting Go", meta: "Meditation • 18min", artworkHue: "#665E58", audioUrl: "/audio/ease/letting-go.mp3" },
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
