import type { CSSProperties } from "react";
import { WireframeHomeIndicator } from "./WireframeHomeIndicator";
import { SleepTimeLabels } from "./SleepTimeLabels";
import { NightRoutineCopy } from "./NightRoutineCopy";

const contentStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  minHeight: 0,
};

const spacerStyle: CSSProperties = {
  flex: 1,
  minHeight: 220,
};

const timesStyle: CSSProperties = {
  paddingBottom: 10,
};

type OpeningHeroContentProps = {
  style?: CSSProperties;
};

export function OpeningHeroContent({ style }: OpeningHeroContentProps) {
  return (
    <div style={{ ...contentStyle, ...style }}>
      <div style={spacerStyle} />
      <div style={timesStyle}>
        <SleepTimeLabels />
      </div>
      <NightRoutineCopy style={{ marginTop: 32 }} />
      <WireframeHomeIndicator />
    </div>
  );
}
