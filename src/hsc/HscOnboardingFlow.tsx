import { useCallback, useEffect, useState } from "react";
import { HscFrame } from "./components/HscFrame";
import { stopPreview } from "./audioPreview";
import {
  progressFillPx,
  showProgressHeader,
  STEPS,
  type StepId,
} from "./steps";
import { defaultBedtimeTime, defaultWakeTime, type PlanSelections } from "./types";
import {
  ArcCarouselScreen,
  BedAndShareScreen,
  BedtimeScreen,
  BluetoothIntroScreen,
  ClockLearnsScreen,
  EaseCategoryScreen,
  EaseContentScreen,
  EaseInBedScreen,
  HatchPlusScreen,
  HeardScreen,
  HomeHQScreen,
  PlanSetScreen,
  PlanThreePartsScreen,
  PlacementScreen,
  SleepIssueScreen,
  ThreeControlsScreen,
  WakeCategoryScreen,
  WakeContentScreen,
  WakeSummaryScreen,
  WakeTimeScreen,
} from "./screens";
import "./hds.css";

const initialPlan = (): PlanSelections => ({
  sleepIssue: null,
  wakeTime: { ...defaultWakeTime },
  wakeDays: [1, 2, 3, 4, 5],
  bedtimeTime: { ...defaultBedtimeTime },
  wakeCategoryId: null,
  wakePick: null,
  easeCategoryId: null,
  easePick: null,
});

function stepFromUrl(): StepId | null {
  const s = new URLSearchParams(window.location.search).get("step");
  return s && (STEPS as string[]).includes(s) ? (s as StepId) : null;
}

export function HscOnboardingFlow() {
  const [index, setIndex] = useState(() => {
    const s = stepFromUrl();
    return s ? STEPS.indexOf(s) : 0;
  });
  const [plan, setPlan] = useState(initialPlan);
  const [arcSlide, setArcSlide] = useState<0 | 1 | 2>(0);
  const [placementChecked, setPlacementChecked] = useState([false, false, false]);
  const [shareBed, setShareBed] = useState<string | null>(null);
  const [bedSize, setBedSize] = useState<string | null>(null);

  const step = STEPS[Math.min(index, STEPS.length - 1)];

  useEffect(() => {
    stopPreview();
    if (step !== "arcCarousel") setArcSlide(0);
  }, [step]);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    p.set("p", "hsc");
    p.set("step", step);
    window.history.replaceState(null, "", window.location.pathname + "?" + p.toString());
  }, [step]);

  const onNext = useCallback(
    () => setIndex((i) => Math.min(i + 1, STEPS.length - 1)),
    []
  );
  const goTo = useCallback((id: StepId) => {
    const i = STEPS.indexOf(id);
    if (i >= 0) setIndex(i);
  }, []);

  const handleArcAdvance = () => {
    if (arcSlide < 2) {
      setArcSlide((s) => (s + 1) as 0 | 1 | 2);
    } else {
      onNext();
    }
  };

  const handlePlacementToggle = (i: number) => {
    setPlacementChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const continueDisabled =
    (step === "sleepIssue" && !plan.sleepIssue) ||
    (step === "wakeCategory" && !plan.wakeCategoryId) ||
    (step === "wakeContent" && !plan.wakePick) ||
    (step === "easeCategory" && !plan.easeCategoryId) ||
    (step === "easeContent" && !plan.easePick) ||
    (step === "placement" && !placementChecked.every(Boolean)) ||
    (step === "bedAndShare" && (!shareBed || !bedSize));

  const handleContinue = () => {
    if (step === "wakeCategory") goTo("wakeContent");
    else if (step === "easeCategory") goTo("easeContent");
    else onNext();
  };

  const continueLabel = (() => {
    if (step === "planThreeParts") return "Show me";
    if (step === "wakeTime") return "Set it";
    if (step === "heardIssue") return "Let's build the plan";
    if (step === "wakeSummary") return "Let's set bedtime now";
    if (step === "easeInBed") return "Got it";
    if (step === "planSet") return "I'm ready";
    if (step === "hatchPlus") return "Try for free";
    if (step === "clockLearns") return "Let's place it right";
    if (step === "threeControls") return "Let's go";
    if (step === "homeHQ") return "Done";
    return "Continue";
  })();

  const buttonVariant = (() => {
    if (step === "wakeSummary" || step === "easeInBed") return "tertiary" as const;
    return "primary" as const;
  })();

  const showFooterGradient = step === "wakeContent" || step === "easeContent";

  const isArcCarousel = step === "arcCarousel";
  const isHomeHQ = step === "homeHQ";

  const renderScreen = () => {
    switch (step) {
      case "bluetoothIntro":
        return <BluetoothIntroScreen />;
      case "planThreeParts":
        return <PlanThreePartsScreen />;
      case "arcCarousel":
        return (
          <ArcCarouselScreen slide={arcSlide} onAdvance={handleArcAdvance} />
        );
      case "sleepIssue":
        return <SleepIssueScreen plan={plan} setPlan={setPlan} />;
      case "heardIssue":
        return <HeardScreen issue={plan.sleepIssue} />;
      case "wakeTime":
        return <WakeTimeScreen plan={plan} setPlan={setPlan} />;
      case "wakeCategory":
        return <WakeCategoryScreen plan={plan} setPlan={setPlan} />;
      case "wakeContent":
        return <WakeContentScreen plan={plan} setPlan={setPlan} />;
      case "wakeSummary":
        return <WakeSummaryScreen plan={plan} />;
      case "bedtime":
        return <BedtimeScreen plan={plan} setPlan={setPlan} />;
      case "easeCategory":
        return <EaseCategoryScreen plan={plan} setPlan={setPlan} />;
      case "easeContent":
        return <EaseContentScreen plan={plan} setPlan={setPlan} />;
      case "easeInBed":
        return <EaseInBedScreen plan={plan} />;
      case "planSet":
        return <PlanSetScreen plan={plan} />;
      case "hatchPlus":
        return <HatchPlusScreen />;
      case "clockLearns":
        return <ClockLearnsScreen />;
      case "placement":
        return (
          <PlacementScreen
            checked={placementChecked}
            onToggle={handlePlacementToggle}
          />
        );
      case "bedAndShare":
        return (
          <BedAndShareScreen
            shareBed={shareBed}
            bedSize={bedSize}
            onShareBed={setShareBed}
            onBedSize={setBedSize}
          />
        );
      case "threeControls":
        return <ThreeControlsScreen />;
      case "homeHQ":
        return <HomeHQScreen plan={plan} />;
      default:
        return null;
    }
  };

  return (
    <HscFrame
      progressFillPx={progressFillPx(step)}
      showProgress={showProgressHeader(step)}
      buttonLabel={continueLabel}
      buttonDisabled={continueDisabled}
      buttonVariant={buttonVariant}
      onButtonClick={handleContinue}
      showFooterGradient={showFooterGradient}
      hideButton={isArcCarousel || isHomeHQ}
    >
      {renderScreen()}
    </HscFrame>
  );
}
