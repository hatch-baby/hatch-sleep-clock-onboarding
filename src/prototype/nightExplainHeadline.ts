import {
  NIGHT_ARC_CYCLE_MS,
  NIGHT_ARC_IN_BED_CARD_MS,
  NIGHT_ARC_PAUSE_END_MS,
  NIGHT_ARC_REM_CARD_MS,
  NIGHT_ARC_TAP_VISIBLE_MS,
  NIGHT_ARC_TRACK_END_MS,
  NIGHT_STORY_CARD_WINDOWS,
} from "../nightArcTiming";

const CARD_LAYER: Record<(typeof NIGHT_STORY_CARD_WINDOWS)[number]["id"], number> = {
  meditation: 1,
  "in-bed": 2,
  rem: 3,
  restpresso: 4,
  insight: 5,
};

export type NightExplainHeadlineKey =
  | "routine"
  | "contentMade"
  | "trackedNight"
  | "downDetail"
  | "wakeGently"
  | "seeWorking";

/** Arc-local time in ms: 0 = track / story timeline start (same origin as NIGHT_STORY_CARD_WINDOWS). */
export function headlineKeyForArcMs(arcMs: number): NightExplainHeadlineKey {
  let bestId: (typeof NIGHT_STORY_CARD_WINDOWS)[number]["id"] | null = null;
  let bestLayer = 0;

  for (const w of NIGHT_STORY_CARD_WINDOWS) {
    if (arcMs >= w.start && arcMs <= w.end) {
      const layer = CARD_LAYER[w.id];
      if (layer >= bestLayer) {
        bestLayer = layer;
        bestId = w.id;
      }
    }
  }

  if (bestId === "meditation") {
    return "contentMade";
  }
  if (bestId === "in-bed") {
    return "trackedNight";
  }
  if (bestId === "rem") {
    return "downDetail";
  }
  if (bestId === "restpresso") {
    return "wakeGently";
  }
  if (bestId === "insight") {
    return "seeWorking";
  }

  if (arcMs < NIGHT_ARC_TAP_VISIBLE_MS) {
    return "routine";
  }
  if (arcMs < NIGHT_ARC_IN_BED_CARD_MS) {
    return "contentMade";
  }
  if (arcMs < NIGHT_ARC_REM_CARD_MS) {
    return "trackedNight";
  }
  if (arcMs < NIGHT_ARC_TRACK_END_MS) {
    return "downDetail";
  }
  if (arcMs < NIGHT_ARC_PAUSE_END_MS) {
    return "wakeGently";
  }
  return "seeWorking";
}

export function arcMsFromScreenElapsed(elapsedMs: number, heroHoldMs: number): number {
  const arcLocal = elapsedMs - heroHoldMs;
  if (arcLocal < 0) {
    return 0;
  }
  return arcLocal % NIGHT_ARC_CYCLE_MS;
}
