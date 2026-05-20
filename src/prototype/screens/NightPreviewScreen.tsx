import type { CSSProperties } from "react";
import { NightArc } from "../../NightArc";
import { WireframeNav } from "../components/WireframeNav";
import { WireframeProgress } from "../components/WireframeProgress";
import { fontStack, wireframe } from "../wireframeTokens";

type NightPreviewScreenProps = {
  onBack: () => void;
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

const stageStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: 420,
};

const screenStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
};

export function NightPreviewScreen({ onBack, onNext }: NightPreviewScreenProps) {
  return (
    <div style={screenStyle}>
      <WireframeProgress label="Registering your Sleep Clock" value={42} />
      <h1 style={headlineStyle}>Here&apos;s what a night with your Sleep Clock looks like.</h1>
      <div style={stageStyle}>
        <NightArc />
      </div>
      <WireframeNav onBack={onBack} onNext={onNext} nextLabel="Continue" />
    </div>
  );
}
