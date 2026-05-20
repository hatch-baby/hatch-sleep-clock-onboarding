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
  ArcStaticScreen,
  BedSizeScreen,
  BedtimeScreen,
  BluetoothIntroScreen,
  EaseCategoryScreen,
  EaseContentScreen,
  EaseInBedScreen,
  HeardScreen,
  PlanSetScreen,
  PlanThreePartsScreen,
  ShareBedScreen,
  SimpleHeadlineScreen,
  SleepIssueScreen,
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
  const [bedSize, setBedSize] = useState<string | null>(null);
  const [shareBed, setShareBed] = useState<string | null>(null);
  const step = STEPS[Math.min(index, STEPS.length - 1)];

  useEffect(() => {
    stopPreview();
  }, [step]);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    p.set("p", "hsc");
    p.set("step", step);
    window.history.replaceState(
      null,
      "",
      window.location.pathname + "?" + p.toString()
    );
  }, [step]);

  const onNext = useCallback(
    () => setIndex((i) => Math.min(i + 1, STEPS.length - 1)),
    []
  );
  const goTo = useCallback((id: StepId) => {
    const i = STEPS.indexOf(id);
    if (i >= 0) setIndex(i);
  }, []);

  const continueDisabled =
    (step === "sleepIssue" && !plan.sleepIssue) ||
    (step === "wakeCategory" && !plan.wakeCategoryId) ||
    (step === "wakeContent" && !plan.wakePick) ||
    (step === "easeCategory" && !plan.easeCategoryId) ||
    (step === "easeContent" && !plan.easePick) ||
    (step === "bedSize" && !bedSize) ||
    (step === "shareBed" && !shareBed);

  const handleContinue = () => {
    if (step === "wakeCategory") goTo("wakeContent");
    else if (step === "easeCategory") goTo("easeContent");
    else onNext();
  };

  const continueLabel = (() => {
    if (step === "wakeTime") return "Set it";
    if (step === "heardIssue") return "Let's build the plan";
    if (step === "wakeSummary") return "Let's set bedtime now";
    if (step === "easeInBed") return "Your plan is set";
    if (step === "homeHQ") return "Done";
    return "Continue";
  })();

  const buttonVariant =
    step === "wakeSummary" ? ("tertiary" as const) : ("primary" as const);

  const showFooterGradient =
    step === "wakeContent" || step === "easeContent";

  const renderScreen = () => {
    switch (step) {
      case "bluetoothIntro":
        return <BluetoothIntroScreen />;
      case "planThreeParts":
        return <PlanThreePartsScreen />;
      case "arcBedtime":
        return <ArcStaticScreen label="Bedtime — static until animation spec" />;
      case "arcSleep":
        return <ArcStaticScreen label="Sleep — static until animation spec" />;
      case "arcWake":
        return <ArcStaticScreen label="Wake — static until animation spec" />;
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
        return (
          <SimpleHeadlineScreen
            headline="Your plan runs on Hatch+"
            sub="Premium sounds and routines included with your membership."
          />
        );
      case "clockLearns":
        return (
          <SimpleHeadlineScreen
            headline="Your clock learns. Your sleep gets better."
            sub="The more you use it, the smarter your routines become."
          />
        );
      case "placementIntro":
        return (
          <SimpleHeadlineScreen
            headline="Here's where it works best"
            sub="Place your clock on your nightstand, facing your bed."
          />
        );
      case "placementDone":
        return (
          <SimpleHeadlineScreen
            headline="Placement complete"
            sub="You're ready for a great night of sleep."
          />
        );
      case "bedSize":
        return (
          <BedSizeScreen selected={bedSize} onSelect={setBedSize} />
        );
      case "shareBed":
        return (
          <ShareBedScreen selected={shareBed} onSelect={setShareBed} />
        );
      case "placementFinal":
        return (
          <SimpleHeadlineScreen
            headline="You're all set"
            sub="Your Sleep Clock is ready for tonight."
          />
        );
      case "homeHQ":
        return (
          <SimpleHeadlineScreen headline="Welcome to your sleep headquarters." />
        );
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
    >
      {renderScreen()}
    </HscFrame>
  );
}
