import { useState } from "react";
import { WireframePhone } from "./components/WireframePhone";
import { HeroOpeningScreen } from "./screens/HeroOpeningScreen";
import { NightExplainScreen } from "./screens/NightExplainScreen";

const steps = ["hero", "night-explain"] as const;
type Step = (typeof steps)[number];

export function OnboardingPrototype() {
  const [step, setStep] = useState<Step>("hero");

  return (
    <WireframePhone>
      {step === "hero" ? <HeroOpeningScreen onNext={() => setStep("night-explain")} /> : null}
      {step === "night-explain" ? <NightExplainScreen /> : null}
    </WireframePhone>
  );
}
