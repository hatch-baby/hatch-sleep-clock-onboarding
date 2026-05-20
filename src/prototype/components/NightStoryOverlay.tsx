import type { CSSProperties } from "react";
import {
  NIGHT_ARC_CYCLE_MS,
  NIGHT_STORY_CARD_FADE_MS,
  NIGHT_STORY_CARD_WINDOWS,
} from "../../nightArcTiming";
import { fontStack, wireframe } from "../wireframeTokens";

const pct = (ms: number) => `${(ms / NIGHT_ARC_CYCLE_MS) * 100}%`;

function buildCardCueKeyframes(name: string, startMs: number, endMs: number, holdAtEnd = false) {
  const fadeMs = NIGHT_STORY_CARD_FADE_MS;
  const fadeInEnd = startMs + fadeMs;
  const fadeOutStart = Math.max(fadeInEnd + 1, endMs - fadeMs);
  const settleIn = startMs + Math.floor(fadeMs * 0.42);
  const settleOut = endMs - Math.floor(fadeMs * 0.42);

  if (holdAtEnd) {
    return `
@keyframes ${name} {
  0%, ${pct(startMs)} { opacity: 0; transform: translateY(12px) scale(0.985); }
  ${pct(settleIn)} { opacity: 0.42; transform: translateY(6px) scale(0.992); }
  ${pct(fadeInEnd)} { opacity: 1; transform: translateY(0) scale(1); }
  ${pct(endMs)} { opacity: 1; transform: translateY(0) scale(1); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
`;
  }

  return `
@keyframes ${name} {
  0%, ${pct(startMs)} { opacity: 0; transform: translateY(12px) scale(0.985); }
  ${pct(settleIn)} { opacity: 0.42; transform: translateY(6px) scale(0.992); }
  ${pct(fadeInEnd)} { opacity: 1; transform: translateY(0) scale(1); }
  ${pct(fadeOutStart)} { opacity: 1; transform: translateY(0) scale(1); }
  ${pct(settleOut)} { opacity: 0.42; transform: translateY(-4px) scale(0.992); }
  ${pct(endMs)} { opacity: 0; transform: translateY(-8px) scale(0.985); }
  100% { opacity: 0; transform: translateY(-8px) scale(0.985); }
}
`;
}

export function buildNightStoryOverlayKeyframes() {
  return NIGHT_STORY_CARD_WINDOWS.map((card) =>
    buildCardCueKeyframes(`nightStory-${card.id}`, card.start, card.end, card.id === "insight"),
  ).join("\n");
}

type NightStoryOverlayProps = {
  motionDuration: string;
  motionDelay: string;
};

const stackStyle: CSSProperties = {
  position: "relative",
  zIndex: 2,
  minHeight: 92,
  marginBottom: 12,
  pointerEvents: "none",
};

const cardLayers: Record<(typeof NIGHT_STORY_CARD_WINDOWS)[number]["id"], number> = {
  meditation: 1,
  "in-bed": 2,
  rem: 3,
  restpresso: 4,
  insight: 5,
};

const cardMotion = (
  name: string,
  motionDuration: string,
  motionDelay: string,
  layer: number,
): CSSProperties => ({
  position: "absolute",
  inset: 0,
  opacity: 0,
  zIndex: layer,
  animation: `${name} ${motionDuration} linear ${motionDelay} infinite`,
});

const mediaCardStyle: CSSProperties = {
  margin: "0 auto",
  maxWidth: 300,
  display: "grid",
  gridTemplateColumns: "52px 1fr 28px",
  alignItems: "center",
  gap: 12,
  padding: "10px 12px",
  borderRadius: 18,
  background: "#2f2f2f",
  color: "#f5f5f5",
  fontFamily: fontStack,
  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
};

const thumbStyle: CSSProperties = {
  width: 52,
  height: 52,
  borderRadius: 12,
  background: "linear-gradient(145deg, #4a4a4a, #1f1f1f)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
};

const mediaTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: 15,
  lineHeight: 1.25,
  fontWeight: 600,
};

const waveformStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  gap: 3,
  height: 18,
};

const metricCardStyle: CSSProperties = {
  margin: "0 auto",
  width: "fit-content",
  minWidth: 168,
  padding: "10px 14px",
  borderRadius: 16,
  background: "#1f1f1f",
  color: "#f7f7f7",
  fontFamily: fontStack,
  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.14)",
};

const metricLabelStyle: CSSProperties = {
  margin: 0,
  fontSize: 12,
  lineHeight: 1.2,
  color: "rgba(255, 255, 255, 0.72)",
};

const metricValueStyle: CSSProperties = {
  margin: "2px 0 0",
  fontSize: 28,
  lineHeight: 1,
  fontWeight: 700,
  letterSpacing: "-0.03em",
};

const metricRangeStyle: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 12,
  lineHeight: 1.2,
  color: "rgba(255, 255, 255, 0.58)",
};

const insightCardStyle: CSSProperties = {
  margin: "0 auto",
  maxWidth: 300,
  padding: "14px 16px",
  borderRadius: 18,
  background: "#ffffff",
  color: wireframe.ink,
  fontFamily: fontStack,
  fontSize: 14,
  lineHeight: 1.45,
  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.1)",
};

function WaveformIcon() {
  return (
    <div style={waveformStyle} aria-hidden="true">
      <span style={{ width: 3, height: 8, borderRadius: 999, background: "rgba(255,255,255,0.9)" }} />
      <span style={{ width: 3, height: 14, borderRadius: 999, background: "rgba(255,255,255,0.9)" }} />
      <span style={{ width: 3, height: 10, borderRadius: 999, background: "rgba(255,255,255,0.9)" }} />
    </div>
  );
}

function MediaCard({ title }: { title: string }) {
  return (
    <div style={mediaCardStyle}>
      <div style={thumbStyle} />
      <p style={mediaTitleStyle}>{title}</p>
      <WaveformIcon />
    </div>
  );
}

function MetricCard({ label, value, range }: { label: string; value: string; range: string }) {
  return (
    <div style={metricCardStyle}>
      <p style={metricLabelStyle}>{label}</p>
      <p style={metricValueStyle}>{value}</p>
      <p style={metricRangeStyle}>{range}</p>
    </div>
  );
}

const storyCards = [
  { id: "meditation" as const, render: () => <MediaCard title="Irreverent Meditations" /> },
  { id: "in-bed" as const, render: () => <MetricCard label="In-bed" value="42m" range="10:32pm" /> },
  { id: "rem" as const, render: () => <MetricCard label="REM Sleep" value="34m" range="11:14pm" /> },
  { id: "restpresso" as const, render: () => <MediaCard title="Restpresso" /> },
  {
    id: "insight" as const,
    render: () => (
      <p style={insightCardStyle}>
        When you wind down with a meditation you get more REM sleep. Want to try the newest one tonight?
      </p>
    ),
  },
];

export function NightStoryOverlay({ motionDuration, motionDelay }: NightStoryOverlayProps) {
  return (
    <div style={stackStyle} aria-hidden="true">
      {storyCards.map((card) => (
        <div
          key={card.id}
          style={cardMotion(`nightStory-${card.id}`, motionDuration, motionDelay, cardLayers[card.id])}
        >
          {card.render()}
        </div>
      ))}
    </div>
  );
}
