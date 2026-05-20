import type { CSSProperties } from "react";
import { WireframeButton } from "./WireframeButton";

type WireframeNavProps = {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextStyle?: CSSProperties;
};

const navStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
  marginTop: "auto",
  paddingTop: 20,
};

export function WireframeNav({ onBack, onNext, nextLabel = "Next", nextStyle }: WireframeNavProps) {
  return (
    <div style={navStyle}>
      {onBack ? (
        <WireframeButton label="Back" variant="ghost" onClick={onBack} />
      ) : (
        <div />
      )}
      {onNext ? (
        <div style={nextStyle}>
          <WireframeButton label={nextLabel} onClick={onNext} />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
