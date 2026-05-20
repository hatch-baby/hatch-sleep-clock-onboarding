import type { CSSProperties } from "react";
import { WireframeNav } from "../components/WireframeNav";
import { WireframePlaceholder } from "../components/WireframePlaceholder";
import { WireframeProgress } from "../components/WireframeProgress";
import { fontStack, wireframe } from "../wireframeTokens";

type RegisteringScreenProps = {
  onNext: () => void;
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

export function RegisteringScreen({ onNext }: RegisteringScreenProps) {
  return (
    <div style={screenStyle}>
      <WireframeProgress label="Registering your Sleep Clock" value={18} />
      <h1 style={headlineStyle}>Set up your Sleep Clock</h1>
      <p style={copyStyle}>
        Wireframe placeholder for device pairing, account checks, and the first onboarding steps.
      </p>
      <WireframePlaceholder label="Device + account setup block" height={180} />
      <WireframeNav onNext={onNext} nextLabel="Continue" />
    </div>
  );
}
