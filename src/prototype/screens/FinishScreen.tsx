import type { CSSProperties } from "react";
import { WireframeNav } from "../components/WireframeNav";
import { WireframePlaceholder } from "../components/WireframePlaceholder";
import { WireframeProgress } from "../components/WireframeProgress";
import { fontStack, wireframe } from "../wireframeTokens";

type FinishScreenProps = {
  onBack: () => void;
};

const headlineStyle: CSSProperties = {
  margin: "0 0 18px",
  fontSize: 24,
  lineHeight: 1.25,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: wireframe.ink,
  fontFamily: fontStack,
};

const copyStyle: CSSProperties = {
  margin: "0 0 18px",
  fontSize: 15,
  lineHeight: 1.45,
  color: wireframe.muted,
  fontFamily: fontStack,
};

const screenStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
};

export function FinishScreen({ onBack }: FinishScreenProps) {
  return (
    <div style={screenStyle}>
      <WireframeProgress label="Registering your Sleep Clock" value={100} />
      <h1 style={headlineStyle}>Sleep Clock registered</h1>
      <p style={copyStyle}>
        Wireframe placeholder for confirmation, next actions, and handoff into the main app.
      </p>
      <WireframePlaceholder label="Success + next steps block" height={220} />
      <WireframeNav onBack={onBack} />
    </div>
  );
}
