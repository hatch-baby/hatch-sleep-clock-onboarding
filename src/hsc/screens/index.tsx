import type { Dispatch, SetStateAction } from "react";
import {
  easeCategories,
  easeCategoryPositions,
  getEaseCategory,
  getWakeCategory,
  wakeCategories,
  wakeCategoryPositions,
} from "../contentManifest";
import { mediaAssets, wakeSummaryAssets } from "../figmaAssets";
import { formatTime, sunriseStartLabel } from "../formatTime";
import type { PlanSelections } from "../types";
import { HscCategoryGrid } from "../components/HscCategoryGrid";
import { HscContentPicker } from "../components/HscContentPicker";
import { HscTimePicker } from "../components/HscTimePicker";

type ScreenProps = {
  plan: PlanSelections;
  setPlan: Dispatch<SetStateAction<PlanSelections>>;
};

export function BluetoothIntroScreen() {
  return (
    <>
      <div className="hsc-abs hsc-welcome-hero">
        <img src={mediaAssets.heroClock} alt="" />
      </div>
      <h1 className="hsc-abs hsc-welcome-title hds-display">
        Welcome to Hatch sleep clock
      </h1>
      <p className="hsc-abs hsc-welcome-body">
        Your clock starts tracking the moment you get into bed. First, let&apos;s
        set you up.
      </p>
    </>
  );
}

export function PlanThreePartsScreen() {
  return (
    <div className="hsc-abs hsc-abs-headline-block">
      <h1 className="hds-h5 hsc-abs-headline-title">
        Your night has three parts you can control
      </h1>
      <p className="hds-h6 hsc-abs-headline-sub">
        Bedtime, ease-in, and wake-up — each one tuned to you.
      </p>
    </div>
  );
}

export function ArcStaticScreen({ label }: { label: string }) {
  return <div className="hsc-abs hsc-arc-placeholder">{label}</div>;
}

export function HeardScreen({ text }: { text: string }) {
  return (
    <p className="hsc-abs hsc-abs-center-copy hsc-body-dark">{text}</p>
  );
}

export function WakeTimeScreen({ plan, setPlan }: ScreenProps) {
  return (
    <>
      <div className="hsc-abs hsc-abs-headline-block hsc-abs-headline-block--category">
        <h1 className="hds-h5 hsc-abs-headline-title">
          When do you want to get up?
        </h1>
      </div>
      <div className="hsc-abs hsc-abs-time-picker">
        <HscTimePicker
          value={plan.wakeTime}
          onChange={(wakeTime) => setPlan((p) => ({ ...p, wakeTime }))}
        />
      </div>
    </>
  );
}

export function WakeCategoryScreen({ plan, setPlan }: ScreenProps) {
  return (
    <>
      <div className="hsc-abs hsc-abs-headline-block hsc-abs-headline-block--category">
        <h1 className="hds-h5 hsc-abs-headline-title">
          How do you want to get up?
        </h1>
      </div>
      <HscCategoryGrid
        categories={wakeCategories}
        positions={wakeCategoryPositions}
        selectedId={plan.wakeCategoryId}
        onSelect={(id) =>
          setPlan((p) => ({ ...p, wakeCategoryId: id, wakePick: null }))
        }
      />
    </>
  );
}

export function WakeContentScreen({ plan, setPlan }: ScreenProps) {
  const cat = plan.wakeCategoryId
    ? getWakeCategory(plan.wakeCategoryId)
    : null;
  if (!cat) return null;
  return (
    <HscContentPicker
      picks={cat.picks}
      selectedId={plan.wakePick?.id ?? null}
      onSelect={(wakePick) => setPlan((p) => ({ ...p, wakePick }))}
    />
  );
}

export function WakeSummaryScreen({ plan }: Pick<ScreenProps, "plan">) {
  if (!plan.wakePick) return null;
  const time = formatTime(plan.wakeTime);
  const start = sunriseStartLabel(plan.wakeTime);
  return (
    <>
      <div className="hsc-abs hsc-summary-hero-bg" aria-hidden>
        <img src={mediaAssets.summaryHeroBg} alt="" />
      </div>
      <div className="hsc-abs hsc-abs-summary-headline">
        <h1 className="hds-h5">Set to Rise at {time}</h1>
      </div>
      <p className="hsc-abs hsc-abs-summary-copy">
        Starting at {start}, your clock fades in sunrise light, so{" "}
        <em>{plan.wakePick.title}</em> wakes you gently at {time}.
      </p>
      <div className="hsc-abs hsc-routine-card">
        <div className="hsc-routine-art-stack">
          <img src={plan.wakePick.imageUrl} alt="" />
          <img src={wakeSummaryAssets.lightArt} alt="" />
        </div>
        <div className="hsc-routine-card-text">
          <h4>{plan.wakePick.title}</h4>
          <p>Coachella Sunrise</p>
        </div>
      </div>
    </>
  );
}

export function BedtimeScreen({ plan, setPlan }: ScreenProps) {
  return (
    <>
      <div className="hsc-abs hsc-abs-headline-block">
        <h1 className="hds-h5 hsc-abs-headline-title">
          Get in to bed by {formatTime(plan.bedtimeTime)}
        </h1>
        <p className="hds-h6 hsc-abs-headline-sub">
          Adjust if you need a different bedtime.
        </p>
      </div>
      <div className="hsc-abs hsc-abs-time-picker">
        <HscTimePicker
          value={plan.bedtimeTime}
          onChange={(bedtimeTime) => setPlan((p) => ({ ...p, bedtimeTime }))}
        />
      </div>
    </>
  );
}

export function EaseCategoryScreen({ plan, setPlan }: ScreenProps) {
  return (
    <>
      <div className="hsc-abs hsc-abs-headline-block hsc-abs-headline-block--category">
        <h1 className="hds-h5 hsc-abs-headline-title">
          How do you want to ease in?
        </h1>
      </div>
      <HscCategoryGrid
        categories={easeCategories}
        positions={easeCategoryPositions}
        selectedId={plan.easeCategoryId}
        onSelect={(id) =>
          setPlan((p) => ({ ...p, easeCategoryId: id, easePick: null }))
        }
      />
    </>
  );
}

export function EaseContentScreen({ plan, setPlan }: ScreenProps) {
  const cat = plan.easeCategoryId
    ? getEaseCategory(plan.easeCategoryId)
    : null;
  if (!cat) return null;
  return (
    <HscContentPicker
      picks={cat.picks}
      selectedId={plan.easePick?.id ?? null}
      onSelect={(easePick) => setPlan((p) => ({ ...p, easePick }))}
      subtitle="A few for now. Thousands more for every night after."
    />
  );
}

export function EaseInBedScreen({ plan }: Pick<ScreenProps, "plan">) {
  if (!plan.easePick) return null;
  return (
    <>
      <div className="hsc-abs hsc-abs-headline-block">
        <h1 className="hds-h5 hsc-abs-headline-title">
          When you&apos;re in bed, tap the big button
        </h1>
        <p className="hds-h6 hsc-abs-headline-sub">
          {plan.easePick.title} plays, Blood Moon light sets the mood
        </p>
      </div>
      <div className="hsc-abs hsc-routine-card">
        <div className="hsc-routine-art-stack">
          <img src={plan.easePick.imageUrl} alt="" />
        </div>
        <div className="hsc-routine-card-text">
          <h4>{plan.easePick.title}</h4>
          <p>{plan.easePick.meta}</p>
        </div>
      </div>
    </>
  );
}

export function PlanSetScreen({ plan }: Pick<ScreenProps, "plan">) {
  return (
    <>
      <div className="hsc-abs hsc-abs-headline-block">
        <h1 className="hds-h5 hsc-abs-headline-title">
          Your plan is set. Tonight, get into bed.
        </h1>
      </div>
      <div className="hsc-abs hsc-plan-times">
        <span>{formatTime(plan.bedtimeTime)}</span>
        <span className="hds-caption">Plan</span>
        <span>{formatTime(plan.wakeTime)}</span>
      </div>
    </>
  );
}

export function SimpleHeadlineScreen({
  headline,
  sub,
}: {
  headline: string;
  sub?: string;
}) {
  return (
    <div className="hsc-abs hsc-abs-headline-block">
      <h1 className="hds-h5 hsc-abs-headline-title">{headline}</h1>
      {sub && <p className="hds-h6 hsc-abs-headline-sub">{sub}</p>}
    </div>
  );
}

export function BedSizeScreen({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (v: string) => void;
}) {
  const options = ["Twin", "Full", "Queen", "King", "California King"];
  return (
    <>
      <div className="hsc-abs hsc-abs-headline-block hsc-abs-headline-block--category">
        <h1 className="hds-h5 hsc-abs-headline-title">
          What size bed do you have?
        </h1>
      </div>
      <div className="hsc-abs hsc-abs-bed-list">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            className={"hsc-bed-option" + (selected === o ? " selected" : "")}
            onClick={() => onSelect(o)}
          >
            {o}
          </button>
        ))}
      </div>
    </>
  );
}

export function ShareBedScreen({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (v: string) => void;
}) {
  const options = ["Yes", "No", "Sometimes"];
  return (
    <>
      <div className="hsc-abs hsc-abs-headline-block hsc-abs-headline-block--category">
        <h1 className="hds-h5 hsc-abs-headline-title">Do you share a bed?</h1>
      </div>
      <div className="hsc-abs hsc-abs-bed-list">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            className={"hsc-bed-option" + (selected === o ? " selected" : "")}
            onClick={() => onSelect(o)}
          >
            {o}
          </button>
        ))}
      </div>
    </>
  );
}
