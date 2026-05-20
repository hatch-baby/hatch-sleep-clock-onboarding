import type { CSSProperties, ReactNode } from "react";
import { phoneFrameStyle } from "../wireframeTokens";

type WireframePhoneProps = {
  children: ReactNode;
};

const islandStyle: CSSProperties = {
  width: 124,
  height: 36,
  borderRadius: 18,
  background: "#000000",
  margin: "12px auto 10px",
  flexShrink: 0,
};

const bodyStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: "8px 24px 10px",
  minHeight: 0,
};

export function WireframePhone({ children }: WireframePhoneProps) {
  return (
    <div style={phoneFrameStyle}>
      <div style={islandStyle} aria-hidden="true" />
      <div style={bodyStyle}>{children}</div>
    </div>
  );
}
