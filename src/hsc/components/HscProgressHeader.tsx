import { shellAssets } from "../figmaAssets";

type Props = {
  fillWidthPx: number;
  hidden?: boolean;
};

export function HscProgressHeader({ fillWidthPx, hidden }: Props) {
  if (hidden) return null;
  return (
    <div className="hsc-progress-wrap">
      <p className="hsc-progress-label">Registering your Sleep Clock</p>
      <div className="hsc-progress-track-wrap" aria-hidden>
        <img src={shellAssets.progressTrack} alt="" />
      </div>
      <div
        className="hsc-progress-fill-wrap"
        style={{ width: fillWidthPx }}
        aria-hidden
      >
        <img src={shellAssets.progressFill} alt="" />
      </div>
    </div>
  );
}
