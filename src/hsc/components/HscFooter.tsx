import type { ReactNode } from "react";
import { HscHomeIndicator } from "./HscHomeIndicator";

type Props = {
  children: ReactNode;
  showGradient?: boolean;
};

export function HscFooter({ children, showGradient = true }: Props) {
  return (
    <>
      <div className="hsc-footer">
        {showGradient && <div className="hsc-footer-gradient" aria-hidden />}
        <div className="hsc-footer-actions">{children}</div>
      </div>
      <HscHomeIndicator />
    </>
  );
}
