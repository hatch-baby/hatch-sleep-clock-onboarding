import type { ReactNode } from "react";
import { shellAssets } from "../figmaAssets";
import { HscPrimaryButton } from "./HscPrimaryButton";

type Props = {
  children: ReactNode;
  progressFillPx: number;
  showProgress?: boolean;
  buttonLabel: string;
  buttonDisabled?: boolean;
  buttonVariant?: "primary" | "tertiary";
  onButtonClick: () => void;
  showFooterGradient?: boolean;
};

/** Single 375×812 canvas — all positions match Figma frame coordinates */
export function HscFrame({
  children,
  progressFillPx,
  showProgress = true,
  buttonLabel,
  buttonDisabled,
  buttonVariant = "primary",
  onButtonClick,
  showFooterGradient = false,
}: Props) {
  return (
    <div className="hsc-page hsc-root">
      <div className="hsc-phone">
        {/* Status bar — y:0 h:43 */}
        <div className="hsc-layer hsc-layer-status" aria-hidden>
          <img src={shellAssets.statusBar} alt="" />
        </div>

        {/* Progress — y:55–83 */}
        {showProgress && (
          <div className="hsc-layer hsc-layer-progress" aria-hidden>
            <p className="hsc-progress-label">Registering your Sleep Clock</p>
            <div className="hsc-progress-track-wrap">
              <img src={shellAssets.progressTrack} alt="" />
            </div>
            <div
              className="hsc-progress-fill-wrap"
              style={{ width: progressFillPx }}
            >
              <img src={shellAssets.progressFill} alt="" />
            </div>
          </div>
        )}

        {/* Screen content — absolute children use Figma top/left */}
        <div className="hsc-layer hsc-layer-content">{children}</div>

        {showFooterGradient && (
          <div className="hsc-layer hsc-layer-footer-fade" aria-hidden />
        )}

        {/* Button — Figma: x:24 y:725 w:327 h:48 */}
        <div className="hsc-layer hsc-layer-button">
          <HscPrimaryButton
            label={buttonLabel}
            disabled={buttonDisabled}
            variant={buttonVariant}
            onClick={onButtonClick}
          />
        </div>

        {/* Home indicator — y:769 */}
        <div className="hsc-layer hsc-layer-home" aria-hidden>
          <img src={shellAssets.homeIndicator} alt="" />
        </div>
      </div>
    </div>
  );
}
