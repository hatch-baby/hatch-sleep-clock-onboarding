import { useEffect } from "react";
import type { CSSProperties } from "react";
import { OPENING_HERO_HOLD_MS } from "../../nightArcTiming";
import { OpeningHeroContent } from "../components/OpeningHeroContent";
import { WireframeProgress } from "../components/WireframeProgress";

type HeroOpeningScreenProps = {
  onNext: () => void;
};

const screenStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
};

export function HeroOpeningScreen({ onNext }: HeroOpeningScreenProps) {
  useEffect(() => {
    const timer = window.setTimeout(onNext, OPENING_HERO_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [onNext]);

  return (
    <div style={screenStyle}>
      <WireframeProgress label="Registering your Sleep Clock" value={25} />
      <OpeningHeroContent style={{ flex: 1 }} />
    </div>
  );
}
