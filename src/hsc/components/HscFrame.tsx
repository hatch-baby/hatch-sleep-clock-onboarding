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
  hideButton?: boolean;
  onBack?: () => void;
};

export function HscFrame({
  children,
  progressFillPx,
  showProgress = true,
  buttonLabel,
  buttonDisabled,
  buttonVariant = "primary",
  onButtonClick,
  showFooterGradient = false,
  hideButton = false,
  onBack,
}: Props) {
  return (
    <div className="hsc-page hsc-root">
      <div className="hsc-phone">
        <div className="hsc-layer hsc-layer-status" aria-hidden>
          <img src={shellAssets.statusBar} alt="" />
        </div>

        {showProgress && (
          <div className="hsc-layer hsc-layer-progress" aria-hidden>
            {onBack && (
              <button
                type="button"
                className="hsc-back-btn"
                onClick={onBack}
                aria-label="Go back"
              >
                ‹
              </button>
            )}
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

        <div className="hsc-layer hsc-layer-content">{children}</div>

        {showFooterGradient && (
          <div className="hsc-layer hsc-layer-footer-fade" aria-hidden />
        )}

        {!hideButton && (
          <div className="hsc-layer hsc-layer-button">
            <HscPrimaryButton
              label={buttonLabel}
              disabled={buttonDisabled}
              variant={buttonVariant}
              onClick={onButtonClick}
            />
          </div>
        )}

        <div className="hsc-layer hsc-layer-home" aria-hidden>
          <img src={shellAssets.homeIndicator} alt="" />
        </div>
      </div>
    </div>
  );
}
