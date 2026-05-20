import type { CSSProperties } from "react";

const style: CSSProperties = {
  width: 132,
  height: 5,
  borderRadius: 999,
  background: "rgba(255, 255, 255, 0.92)",
  margin: "20px auto 0",
};

export function WireframeHomeIndicator() {
  return <div style={style} aria-hidden="true" />;
}
