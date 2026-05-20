import type { CSSProperties } from "react";
import { fontStack, wireframe } from "../wireframeTokens";

type WireframeButtonProps = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "ghost";
};

const baseStyle: CSSProperties = {
  borderRadius: 12,
  padding: "12px 16px",
  fontSize: 15,
  fontWeight: 600,
  fontFamily: fontStack,
  cursor: "pointer",
};

export function WireframeButton({ label, onClick, variant = "primary" }: WireframeButtonProps) {
  const style: CSSProperties =
    variant === "primary"
      ? {
          ...baseStyle,
          border: `2px solid ${wireframe.accent}`,
          background: wireframe.accent,
          color: "#ffffff",
        }
      : {
          ...baseStyle,
          border: `2px dashed ${wireframe.line}`,
          background: "transparent",
          color: wireframe.muted,
        };

  return (
    <button type="button" style={style} onClick={onClick}>
      {label}
    </button>
  );
}
