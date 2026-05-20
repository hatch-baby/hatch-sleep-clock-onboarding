import type { CSSProperties } from "react";
import { fontStack, wireframe } from "../wireframeTokens";

export const NIGHT_ROUTINE_COPY = "Better sleep comes from a consistent routine, every night.";

const copyStyle: CSSProperties = {
  margin: 0,
  fontSize: 32,
  lineHeight: 1.18,
  fontWeight: 700,
  letterSpacing: "-0.03em",
  color: wireframe.ink,
  fontFamily: fontStack,
  textAlign: "center",
  maxWidth: 320,
  marginInline: "auto",
};

type NightRoutineCopyProps = {
  style?: CSSProperties;
};

export function NightRoutineCopy({ style }: NightRoutineCopyProps) {
  return (
    <p style={{ ...copyStyle, ...style }}>
      Better sleep comes
      <br />
      from a consistent
      <br />
      routine, every night.
    </p>
  );
}
