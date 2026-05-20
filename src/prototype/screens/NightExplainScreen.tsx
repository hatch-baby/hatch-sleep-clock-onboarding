import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { NightArc } from "../../NightArc";
import { NIGHT_ARC_CYCLE_MS, OPENING_HERO_HOLD_MS } from "../../nightArcTiming";
import {
  arcMsFromScreenElapsed,
  headlineKeyForArcMs,
  type NightExplainHeadlineKey,
} from "../nightExplainHeadline";
import { NightExplainBottomHeadline } from "../components/NightExplainBottomHeadline";
import { NightRoutineCopy } from "../components/NightRoutineCopy";
import { OpeningHeroContent } from "../components/OpeningHeroContent";
import { WireframeHomeIndicator } from "../components/WireframeHomeIndicator";
import { WireframeProgress } from "../components/WireframeProgress";

const screenStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
};

const introKeyframes = `
@keyframes nightExplain-opening-hold {
  0%, 88% { opacity: 1; }
  100% { opacity: 0; }
}
`;

const stageStyle: CSSProperties = {
  position: "relative",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
  paddingTop: 4,
};

const openingHoldStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  zIndex: 3,
  pointerEvents: "none",
  animation: `nightExplain-opening-hold ${OPENING_HERO_HOLD_MS}ms ease-out both`,
};

const arcSectionStyle: CSSProperties = {
  flexShrink: 0,
};

const copySpacerStyle: CSSProperties = {
  flex: 1,
  minHeight: 56,
};

const lowerContentStyle: CSSProperties = {
  flexShrink: 0,
  paddingBottom: 8,
};

const footerReserveStyle: CSSProperties = {
  flexShrink: 0,
  minHeight: 56,
};

export function NightExplainScreen() {
  const [progressValue, setProgressValue] = useState(25);
  const [headline, setHeadline] = useState<NightExplainHeadlineKey>("routine");
  const flowStartedAt = useRef(performance.now());

  useEffect(() => {
    let frame = 0;

    const tick = () => {
      const elapsed = performance.now() - flowStartedAt.current;
      const arcMs = arcMsFromScreenElapsed(elapsed, OPENING_HERO_HOLD_MS);
      const next = headlineKeyForArcMs(arcMs);
      setHeadline((prev) => (prev === next ? prev : next));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const durationMs = OPENING_HERO_HOLD_MS + NIGHT_ARC_CYCLE_MS;
    const startValue = 25;
    const endValue = 78;
    const startedAt = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / durationMs);
      setProgressValue(startValue + (endValue - startValue) * progress);

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div style={screenStyle}>
      <style>{introKeyframes}</style>
      <WireframeProgress label="Registering your Sleep Clock" value={progressValue} />
      <div style={stageStyle}>
        <div style={openingHoldStyle} aria-hidden="true">
          <OpeningHeroContent style={{ height: "100%" }} />
        </div>
        <div style={arcSectionStyle}>
          <NightArc startDelayMs={OPENING_HERO_HOLD_MS} />
        </div>
        <div style={copySpacerStyle} aria-hidden="true" />
        <div style={lowerContentStyle}>
          {headline === "routine" ? <NightRoutineCopy /> : <NightExplainBottomHeadline headline={headline} />}
        </div>
      </div>
      <div style={footerReserveStyle} aria-hidden="true" />
      <WireframeHomeIndicator />
    </div>
  );
}
