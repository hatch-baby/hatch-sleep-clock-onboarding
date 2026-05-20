import type { CSSProperties } from "react";
import { fontStack, wireframe } from "../wireframeTokens";

type SleepTimeLabelsProps = {
  style?: CSSProperties;
  wakeStyle?: CSSProperties;
};

const labelsStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
  fontFamily: fontStack,
};

const labelStyle: CSSProperties = {
  fontSize: 13,
  lineHeight: 1.2,
  color: wireframe.muted,
  fontWeight: 400,
};

const timeStyle: CSSProperties = {
  fontSize: 22,
  lineHeight: 1.1,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: wireframe.ink,
};

const blockStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

export function SleepTimeLabels({ style, wakeStyle }: SleepTimeLabelsProps) {
  return (
    <div style={{ ...labelsStyle, ...style }}>
      <div style={blockStyle}>
        <span style={labelStyle}>Bedtime</span>
        <span style={timeStyle}>10:30pm</span>
      </div>
      <div style={{ ...blockStyle, textAlign: "right", ...wakeStyle }}>
        <span style={labelStyle}>Wake up</span>
        <span style={timeStyle}>7:30am</span>
      </div>
    </div>
  );
}
