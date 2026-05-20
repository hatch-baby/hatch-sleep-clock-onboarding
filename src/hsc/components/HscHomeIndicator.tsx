import { shellAssets } from "../figmaAssets";

export function HscHomeIndicator() {
  return (
    <div className="hsc-home-indicator" aria-hidden>
      <img src={shellAssets.homeIndicator} alt="" />
    </div>
  );
}
