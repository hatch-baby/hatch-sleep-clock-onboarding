import { shellAssets } from "../figmaAssets";

export function HscStatusBar() {
  return (
    <div className="hsc-status" aria-hidden>
      <img src={shellAssets.statusBar} alt="" />
    </div>
  );
}
