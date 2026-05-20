import type { CSSProperties } from "react";

export const wireframe = {
  canvas: "#8f8f8f",
  phone: "#cbcbcb",
  phoneBorder: "#1a1a1a",
  ink: "#111111",
  muted: "#111111",
  line: "#9a9a9a",
  placeholder: "#ececec",
  accent: "#111111",
} as const;

export const fontStack =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export const phoneFrameStyle: CSSProperties = {
  width: "100%",
  maxWidth: 393,
  minHeight: 852,
  margin: "0 auto",
  background: wireframe.phone,
  borderRadius: 54,
  boxShadow: "0 28px 80px rgba(0, 0, 0, 0.28), inset 0 0 0 1px rgba(255, 255, 255, 0.08)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  position: "relative",
};
