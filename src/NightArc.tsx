import React, { useId } from "react";
import {
  DEFAULT_NIGHT_ARC_START_DELAY_MS,
  NIGHT_ARC_CYCLE_MS,
  NIGHT_ARC_PAUSE_END_MS,
  NIGHT_ARC_PLAN_ARC_END_MS,
  NIGHT_ARC_PLAN_ARC_START_MS,
  NIGHT_ARC_TAP_AT_MS,
  NIGHT_ARC_IN_BED_CARD_MS,
  NIGHT_ARC_IN_BED_HOLD_END_MS,
  NIGHT_ARC_REM_CARD_MS,
  NIGHT_ARC_REM_HOLD_END_MS,
  NIGHT_ARC_TAP_VISIBLE_MS,
  NIGHT_ARC_TIMES_END_MS,
  NIGHT_ARC_TRACK_END_MS,
  NIGHT_ARC_TRACK_START_MS,
} from "./nightArcTiming";
import {
  buildNightStoryOverlayKeyframes,
  NightStoryOverlay,
} from "./prototype/components/NightStoryOverlay";
import { SleepTimeLabels } from "./prototype/components/SleepTimeLabels";

export { DEFAULT_NIGHT_ARC_START_DELAY_MS, NIGHT_ARC_TRACK_END_MS, getNightArcCompletionMs } from "./nightArcTiming";

const INK = "#111111";
const MUTED = "#b8b8b8";
const ARC_COLOR = "#2a2a3a";
const CYCLE_MS = NIGHT_ARC_CYCLE_MS;
const TIMES_END = NIGHT_ARC_TIMES_END_MS;
const PLAN_ARC_START = NIGHT_ARC_PLAN_ARC_START_MS;
const PLAN_ARC_END = NIGHT_ARC_PLAN_ARC_END_MS;
const TAP_AT = NIGHT_ARC_TAP_AT_MS;
const TRACK_START = NIGHT_ARC_TRACK_START_MS;
const TRACK_END = NIGHT_ARC_TRACK_END_MS;
const PLAN_DIM_AT = Math.floor((TRACK_START + TRACK_END) / 2);
const PAUSE_END = NIGHT_ARC_PAUSE_END_MS;
const PLAN_FULL_OPACITY = 0.24;
const PLAN_DIM_OPACITY = 0.12;
const WAKE_DIM_OPACITY = 0.35;
const ARC_LENGTH = 340;
const ARC_PATH = "M 52 150 A 108 108 0 0 1 268 150";
const BED_X = 52;
const WAKE_X = 268;
const ARC_Y = 150;
const WAKE_DOT_RADIUS = 9;
const TAP_DOT_RADIUS = 9;
const DREAM_ORB_RADIUS = 11;
const ARC_CENTER_X = 160;
const ARC_CENTER_Y = 150;
const ARC_RADIUS = 108;

const pct = (ms: number, cycleMs: number) => `${(ms / cycleMs) * 100}%`;

function arcPoint(progress: number) {
  const angle = Math.PI * (1 - progress);
  return {
    x: ARC_CENTER_X + ARC_RADIUS * Math.cos(angle),
    y: ARC_CENTER_Y - ARC_RADIUS * Math.sin(angle),
  };
}

function translateForPoint(point: { x: number; y: number }, radius: number) {
  return `translate3d(${(point.x - radius).toFixed(2)}px, ${(point.y - radius).toFixed(2)}px, 0)`;
}

function trackProgressAt(timeMs: number) {
  if (timeMs <= TRACK_START) {
    return 0;
  }

  if (timeMs >= TRACK_END) {
    return 1;
  }

  return (timeMs - TRACK_START) / (TRACK_END - TRACK_START);
}

function dreamOrbMotion(timeMs: number, progress: number) {
  if (timeMs >= TRACK_END) {
    return {
      pulse: 0.92,
      scale: 1,
      fillOpacity: 0.9,
    };
  }

  const basePulse = 0.58 + Math.sin(progress * Math.PI * 4) * 0.24;
  const baseScale = 0.94 + Math.sin(progress * Math.PI * 3) * 0.08;
  const baseFillOpacity = 0.68 + Math.sin(progress * Math.PI * 4) * 0.18;

  if (timeMs >= NIGHT_ARC_IN_BED_CARD_MS && timeMs <= NIGHT_ARC_IN_BED_HOLD_END_MS) {
    const phase = (timeMs - NIGHT_ARC_IN_BED_CARD_MS) / 260;
    return {
      pulse: 0.56 + Math.sin(phase * Math.PI * 2) * 0.3,
      scale: 0.94 + Math.sin(phase * Math.PI) * 0.08,
      fillOpacity: 0.7 + Math.sin(phase * Math.PI * 2) * 0.14,
    };
  }

  if (timeMs > NIGHT_ARC_IN_BED_HOLD_END_MS && timeMs < NIGHT_ARC_REM_CARD_MS) {
    const phase = (timeMs - NIGHT_ARC_IN_BED_HOLD_END_MS) / 280;
    return {
      pulse: 0.54 + Math.sin(phase * Math.PI * 2) * 0.26,
      scale: 0.94 + Math.sin(phase * Math.PI) * 0.07,
      fillOpacity: 0.7 + Math.sin(phase * Math.PI * 2) * 0.12,
    };
  }

  if (timeMs >= NIGHT_ARC_REM_CARD_MS && timeMs <= NIGHT_ARC_REM_HOLD_END_MS) {
    const phase = (timeMs - NIGHT_ARC_REM_CARD_MS) / 260;
    return {
      pulse: 0.56 + Math.sin(phase * Math.PI * 2) * 0.3,
      scale: 0.94 + Math.sin(phase * Math.PI) * 0.08,
      fillOpacity: 0.7 + Math.sin(phase * Math.PI * 2) * 0.14,
    };
  }

  return {
    pulse: basePulse,
    scale: baseScale,
    fillOpacity: baseFillOpacity,
  };
}

function buildTrackKeyframes(cycleMs: number) {
  const fillFrames: string[] = [];
  const orbFrames: string[] = [];
  const trailFrames: string[] = [];
  const hazeFrames: string[] = [];
  const stepMs = 240;

  fillFrames.push(
    `0%, ${pct(TRACK_START, cycleMs)} { stroke-dashoffset: var(--night-arc-length); visibility: hidden; opacity: 0.72; }`,
  );
  fillFrames.push(`${pct(TRACK_START + 1, cycleMs)} { visibility: visible; opacity: 0.82; }`);

  orbFrames.push(
    `0%, ${pct(TRACK_START, cycleMs)} { opacity: 0; transform: ${translateForPoint(arcPoint(0), DREAM_ORB_RADIUS)} scale(0.88); }`,
  );
  orbFrames.push(
    `${pct(TRACK_START + 1, cycleMs)} { opacity: 0.72; transform: ${translateForPoint(arcPoint(0), DREAM_ORB_RADIUS)} scale(1); }`,
  );

  trailFrames.push(
    `0%, ${pct(TRACK_START, cycleMs)} { opacity: 0; transform: ${translateForPoint(arcPoint(0), DREAM_ORB_RADIUS)} scale(0.9); }`,
  );
  trailFrames.push(
    `${pct(TRACK_START + 1, cycleMs)} { opacity: 0.24; transform: ${translateForPoint(arcPoint(0), DREAM_ORB_RADIUS)} scale(1.08); }`,
  );

  hazeFrames.push(
    `0%, ${pct(TRACK_START, cycleMs)} { opacity: 0; transform: ${translateForPoint(arcPoint(0), DREAM_ORB_RADIUS)} scale(0.95); }`,
  );
  hazeFrames.push(
    `${pct(TRACK_START + 1, cycleMs)} { opacity: 0.14; transform: ${translateForPoint(arcPoint(0), DREAM_ORB_RADIUS)} scale(1.18); }`,
  );

  for (let time = TRACK_START; time <= TRACK_END; time += stepMs) {
    const progress = trackProgressAt(time);
    const dashoffset = ARC_LENGTH * (1 - progress);
    const point = arcPoint(progress);
    const trailPoint = arcPoint(Math.max(0, progress - 0.08));
    const hazePoint = arcPoint(Math.max(0, progress - 0.16));
    const { pulse, scale, fillOpacity } = dreamOrbMotion(time, progress);

    fillFrames.push(
      `${pct(time, cycleMs)} { stroke-dashoffset: ${dashoffset.toFixed(2)}; visibility: visible; opacity: ${fillOpacity.toFixed(3)}; }`,
    );
    orbFrames.push(
      `${pct(time, cycleMs)} { opacity: ${pulse.toFixed(3)}; transform: ${translateForPoint(point, DREAM_ORB_RADIUS)} scale(${scale.toFixed(3)}); }`,
    );
    trailFrames.push(
      `${pct(time, cycleMs)} { opacity: ${(0.18 + pulse * 0.12).toFixed(3)}; transform: ${translateForPoint(trailPoint, DREAM_ORB_RADIUS)} scale(${(scale + 0.1).toFixed(3)}); }`,
    );
    hazeFrames.push(
      `${pct(time, cycleMs)} { opacity: ${(0.1 + pulse * 0.07).toFixed(3)}; transform: ${translateForPoint(hazePoint, DREAM_ORB_RADIUS)} scale(${(scale + 0.2).toFixed(3)}); }`,
    );
  }

  const end = arcPoint(1);
  const settledTrail = arcPoint(0.92);
  const settledHaze = arcPoint(0.84);

  for (let time = TRACK_END; time <= PAUSE_END; time += stepMs) {
    fillFrames.push(
      `${pct(time, cycleMs)} { stroke-dashoffset: 0; visibility: visible; opacity: 0.9; }`,
    );
    orbFrames.push(
      `${pct(time, cycleMs)} { opacity: 0.92; transform: ${translateForPoint(end, DREAM_ORB_RADIUS)} scale(1); }`,
    );
    trailFrames.push(
      `${pct(time, cycleMs)} { opacity: 0.22; transform: ${translateForPoint(settledTrail, DREAM_ORB_RADIUS)} scale(1.1); }`,
    );
    hazeFrames.push(
      `${pct(time, cycleMs)} { opacity: 0.12; transform: ${translateForPoint(settledHaze, DREAM_ORB_RADIUS)} scale(1.22); }`,
    );
  }

  fillFrames.push(
    `${pct(PAUSE_END, cycleMs)}, 100% { stroke-dashoffset: 0; visibility: visible; opacity: 0.9; }`,
  );
  orbFrames.push(
    `${pct(PAUSE_END, cycleMs)}, 100% { opacity: 0.92; transform: ${translateForPoint(end, DREAM_ORB_RADIUS)} scale(1); }`,
  );
  trailFrames.push(
    `${pct(PAUSE_END, cycleMs)}, 100% { opacity: 0.22; transform: ${translateForPoint(settledTrail, DREAM_ORB_RADIUS)} scale(1.1); }`,
  );
  hazeFrames.push(
    `${pct(PAUSE_END, cycleMs)}, 100% { opacity: 0.12; transform: ${translateForPoint(settledHaze, DREAM_ORB_RADIUS)} scale(1.22); }`,
  );

  return {
    fillFrames: fillFrames.join("\n  "),
    orbFrames: orbFrames.join("\n  "),
    trailFrames: trailFrames.join("\n  "),
    hazeFrames: hazeFrames.join("\n  "),
  };
}

type NightArcProps = {
  startDelayMs?: number;
};

export function NightArc({ startDelayMs = DEFAULT_NIGHT_ARC_START_DELAY_MS }: NightArcProps) {
  const arcGradientId = useId().replace(/:/g, "");
  const outerGlowId = useId().replace(/:/g, "");
  const coreGlowId = useId().replace(/:/g, "");
  const blurFilterId = useId().replace(/:/g, "");
  const motionDuration = `${CYCLE_MS}ms`;
  const motionDelay = `${startDelayMs}ms`;
  const { fillFrames, orbFrames, trailFrames, hazeFrames } = buildTrackKeyframes(CYCLE_MS);

  const keyframes = `
@keyframes nightArc-times {
  0%, ${pct(0, CYCLE_MS)} { opacity: 0; transform: translateY(18px); }
  ${pct(TIMES_END, CYCLE_MS)} { opacity: 1; transform: translateY(0); }
  ${pct(PAUSE_END, CYCLE_MS)}, 100% { opacity: 1; transform: translateY(0); }
}

@keyframes nightArc-plan-arc {
  0%, ${pct(PLAN_ARC_START, CYCLE_MS)} { opacity: 0; }
  ${pct(PLAN_ARC_END, CYCLE_MS)} { opacity: ${PLAN_FULL_OPACITY}; }
  ${pct(PLAN_DIM_AT, CYCLE_MS)} { opacity: ${PLAN_DIM_OPACITY}; }
  ${pct(PAUSE_END, CYCLE_MS)}, 100% { opacity: ${PLAN_DIM_OPACITY}; }
}

@keyframes nightArc-tap-dot {
  0%, ${pct(TAP_AT, CYCLE_MS)} { opacity: 0; }
  ${pct(NIGHT_ARC_TAP_VISIBLE_MS, CYCLE_MS)} { opacity: 1; }
  ${pct(TRACK_START - 1, CYCLE_MS)} { opacity: 1; }
  ${pct(TRACK_START, CYCLE_MS)}, 100% { opacity: 0; }
}

@keyframes nightArc-fill {
  ${fillFrames}
}

@keyframes nightArc-dream-orb {
  ${orbFrames}
}

@keyframes nightArc-dream-trail {
  ${trailFrames}
}

@keyframes nightArc-dream-haze {
  ${hazeFrames}
}

@keyframes nightArc-wake-block {
  0%, ${pct(TIMES_END, CYCLE_MS)} { opacity: 1; }
  ${pct(TAP_AT, CYCLE_MS)} { opacity: ${WAKE_DIM_OPACITY}; }
  ${pct(TRACK_END, CYCLE_MS)} { opacity: 1; }
  ${pct(PAUSE_END, CYCLE_MS)}, 100% { opacity: 1; }
}

@keyframes nightArc-wake-dot {
  0%, ${pct(TRACK_END - 1, CYCLE_MS)} { opacity: 0; fill: ${MUTED}; }
  ${pct(TRACK_END, CYCLE_MS)} { opacity: 1; fill: #ffffff; }
  ${pct(PAUSE_END, CYCLE_MS)}, 100% { opacity: 1; fill: #ffffff; }
}

${buildNightStoryOverlayKeyframes()}

@media (prefers-reduced-motion: reduce) {
  .nightArc-root [data-night-arc-motion] {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
`;

  const motionStyle = (name: string): React.CSSProperties => ({
    transformOrigin: "0 0",
    animation: `${name} ${motionDuration} linear ${motionDelay} infinite`,
  });

  const styles: Record<string, React.CSSProperties> = {
    root: {
      position: "relative",
      width: "100%",
      color: INK,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    stage: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      minHeight: 0,
      paddingTop: 18,
    },
    overlaySlot: {
      position: "relative",
      minHeight: 92,
      marginBottom: 12,
    },
    svg: {
      display: "block",
      width: "100%",
      height: "auto",
      overflow: "visible",
    },
    planArc: {
      ...motionStyle("nightArc-plan-arc"),
    },
    trackedArc: {
      ...motionStyle("nightArc-fill"),
    },
    tapDot: {
      ...motionStyle("nightArc-tap-dot"),
    },
    wakeDot: {
      ...motionStyle("nightArc-wake-dot"),
    },
    dreamHaze: {
      ...motionStyle("nightArc-dream-haze"),
    },
    dreamTrail: {
      ...motionStyle("nightArc-dream-trail"),
    },
    dreamOrb: {
      ...motionStyle("nightArc-dream-orb"),
    },
    times: {
      marginTop: 16,
      ...motionStyle("nightArc-times"),
    },
    wakeBlock: {
      ...motionStyle("nightArc-wake-block"),
    },
  };

  const dreamLayer = (layerStyle: React.CSSProperties, radius: number, fill: string, filter?: string) => (
    <g data-night-arc-motion style={layerStyle}>
      <circle cx={DREAM_ORB_RADIUS} cy={DREAM_ORB_RADIUS} r={radius} fill={fill} filter={filter} />
    </g>
  );

  return (
    <div
      className="nightArc-root"
      role="img"
      aria-label="Sleep Clock preview showing bedtime and wake-up plan, a top-button tap, and a soft pulse filling the night arc to 7:30am"
      style={styles.root}
    >
      <style>{keyframes}</style>

      <div style={styles.stage}>
        <div style={styles.overlaySlot}>
          <NightStoryOverlay motionDuration={motionDuration} motionDelay={motionDelay} />
        </div>
        <svg viewBox="0 0 320 190" style={styles.svg} aria-hidden="true">
          <defs>
            <linearGradient id={arcGradientId} gradientUnits="userSpaceOnUse" x1="52" y1="150" x2="268" y2="150">
              <stop offset="0%" stopColor={ARC_COLOR} stopOpacity="0.92" />
              <stop offset="42%" stopColor="#ffd8b8" stopOpacity="0.72" />
              <stop offset="68%" stopColor="#d8c8ff" stopOpacity="0.58" />
              <stop offset="100%" stopColor="#8ea8ff" stopOpacity="0.88" />
            </linearGradient>
            <radialGradient id={outerGlowId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff8ef" stopOpacity="0.95" />
              <stop offset="38%" stopColor="#ffd9b8" stopOpacity="0.55" />
              <stop offset="72%" stopColor="#b8c4ff" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#8aa8ff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={coreGlowId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="55%" stopColor="#ffe8c8" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#f0b8ff" stopOpacity="0" />
            </radialGradient>
            <filter id={blurFilterId} x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="5.5" />
            </filter>
          </defs>

          <path
            d={ARC_PATH}
            fill="none"
            stroke={MUTED}
            strokeWidth={18}
            strokeLinecap="round"
            data-night-arc-motion
            style={styles.planArc}
          />

          <path
            d={ARC_PATH}
            fill="none"
            stroke={`url(#${arcGradientId})`}
            strokeWidth={18}
            strokeLinecap="round"
            pathLength={ARC_LENGTH}
            strokeDasharray={ARC_LENGTH}
            strokeDashoffset={ARC_LENGTH}
            data-night-arc-motion
            style={{
              ...styles.trackedArc,
              ["--night-arc-length" as string]: String(ARC_LENGTH),
            }}
          />

          <circle
            cx={BED_X}
            cy={ARC_Y}
            r={TAP_DOT_RADIUS}
            fill={INK}
            data-night-arc-motion
            style={styles.tapDot}
          />

          <circle
            cx={WAKE_X}
            cy={ARC_Y}
            r={WAKE_DOT_RADIUS}
            fill={MUTED}
            data-night-arc-motion
            style={styles.wakeDot}
          />

          {dreamLayer(styles.dreamHaze, 24, `url(#${outerGlowId})`, `url(#${blurFilterId})`)}
          {dreamLayer(styles.dreamTrail, 18, `url(#${outerGlowId})`, `url(#${blurFilterId})`)}
          <g data-night-arc-motion style={styles.dreamOrb}>
            <circle cx={DREAM_ORB_RADIUS} cy={DREAM_ORB_RADIUS} r={16} fill={`url(#${outerGlowId})`} />
            <circle cx={DREAM_ORB_RADIUS} cy={DREAM_ORB_RADIUS} r={9} fill={`url(#${coreGlowId})`} />
            <circle cx={DREAM_ORB_RADIUS} cy={DREAM_ORB_RADIUS} r={4.5} fill="#fffdf8" />
          </g>
        </svg>

        <SleepTimeLabels style={styles.times} wakeStyle={styles.wakeBlock} />
      </div>
    </div>
  );
}

export default NightArc;
