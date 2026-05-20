import type { CSSProperties } from "react";
import { WireframePhone } from "./components/WireframePhone";
import { ShapeOnboardingSequence } from "./shapeOnboarding/ShapeOnboardingSequence";

const screenStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
  marginInline: -24,
  width: "calc(100% + 48px)",
  alignSelf: "center",
};

export function BlankPrototype() {
  return (
    <WireframePhone>
      <div style={screenStyle}>
        <ShapeOnboardingSequence />
      </div>
    </WireframePhone>
  );
}
