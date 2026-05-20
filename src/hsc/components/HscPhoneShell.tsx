import type { ReactNode } from "react";
import { HscProgressHeader } from "./HscProgressHeader";
import { HscStatusBar } from "./HscStatusBar";

type Props = {
  children: ReactNode;
  footer: ReactNode;
  progressFillPx: number;
  showProgress?: boolean;
};

export function HscPhoneShell({
  children,
  footer,
  progressFillPx,
  showProgress = true,
}: Props) {
  return (
    <div className="hsc-page hsc-root">
      <div className="hsc-phone">
        <div className="hsc-phone-inner">
          <HscStatusBar />
          <HscProgressHeader
            fillWidthPx={progressFillPx}
            hidden={!showProgress}
          />
          <div className="hsc-screen">{children}</div>
          {footer}
        </div>
      </div>
    </div>
  );
}
