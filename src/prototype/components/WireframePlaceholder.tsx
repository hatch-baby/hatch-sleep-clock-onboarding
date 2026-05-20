import type { CSSProperties } from "react";
import { wireframe } from "../wireframeTokens";

type WireframePlaceholderProps = {
  label: string;
  height?: number;
};

const style = (height: number): CSSProperties => ({
  minHeight: height,
  border: `2px dashed ${wireframe.line}`,
  borderRadius: 14,
  background: wireframe.placeholder,
  display: "grid",
  placeItems: "center",
  color: wireframe.muted,
  fontSize: 13,
  textAlign: "center",
  padding: 16,
});

export function WireframePlaceholder({ label, height = 120 }: WireframePlaceholderProps) {
  return <div style={style(height)}>{label}</div>;
}
