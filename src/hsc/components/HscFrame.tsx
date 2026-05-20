import type { ReactNode } from "react";
import { shellAssets } from "../figmaAssets";
import { HscPrimaryButton } from "./HscPrimaryButton";

type Props = {
  children: ReactNode;
  buttonLabel: string;
  buttonDisabled?: boolean;
  buttonVariant?: "primary" | "tertiary";
  onButtonClick: () => void;
  showFooterGradient?: boolean;
  hideButton?: boolean;
};

export function HscFrame({
  children,
  buttonLabel,
  buttonDisabled,
  buttonVariant = "primary",
  onButtonClick,
  showFooterGradient = false,
  hideButton = false,
}: Props) {
  return (
    <div className="hsc-page hsc-root">
      <div className="hsc-phone">
        <div className="hsc-layer hsc-layer-status" aria-hidden>
          <img src={shellAssets.statusBar} alt="" />
        </div>

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
