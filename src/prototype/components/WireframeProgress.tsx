import type { CSSProperties } from "react";
import { wireframe } from "../wireframeTokens";

type WireframeProgressProps = {
  label: string;
  value: number;
};

const labelStyle: CSSProperties = {
  margin: "0 0 10px",
  fontSize: 13,
  lineHeight: 1.3,
  color: wireframe.ink,
  textAlign: "center",
  fontWeight: 400,
};

const trackStyle: CSSProperties = {
  width: "100%",
  height: 3,
  borderRadius: 999,
  background: wireframe.line,
  overflow: "hidden",
};

const fillStyle: CSSProperties = {
  height: "100%",
  borderRadius: 999,
  background: wireframe.accent,
  transition: "width 240ms ease",
};

export function WireframeProgress({ label, value }: WireframeProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div>
      <p style={labelStyle}>{label}</p>
      <div style={trackStyle} aria-hidden="true">
        <div style={{ ...fillStyle, width: `${clamped}%` }} />
      </div>
    </div>
  );
}
