import { useState } from "react";
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
import {
  HEARD_COPY,
  SLEEP_ISSUES,
  type PlanSelections,
  type SleepIssue,
  type TimeValue,
} from "../types";
import { HscCategoryGrid } from "../components/HscCategoryGrid";
import { HscContentPicker } from "../components/HscContentPicker";
import { HscTimePicker } from "../components/HscTimePicker";

type ScreenProps = {
  plan: PlanSelections;
  setPlan: Dispatch<SetStateAction<PlanSelections>>;
};

// ─── Static plan arc used on PlanSet and HomeHQ ──────────────────────────────

function StaticPlanArc({
  bedtime,
  wake,
  label = "— Plan —",
}: {
  bedtime: string;
  wake: string;
  label?: string;
}) {
  return (
    <div className="hsc-static-arc-wrap">
      <svg viewBox="0 0 327 200" className="hsc-static-arc-svg" aria-hidden>
        <defs>
          <linearGradient id="planArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a3a6e" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#1e3a5f" stopOpacity="1" />
            <stop offset="100%" stopColor="#1a3a6e" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {/* Outer glow */}
        <path
          d="M 20 186 A 143 143 0 0 1 307 186"
          fill="none"
          stroke="#0d2244"
          strokeWidth="48"
          strokeLinecap="round"
        />
        {/* Track */}
        <path
          d="M 20 186 A 143 143 0 0 1 307 186"
          fill="none"
          stroke="url(#planArcGrad)"
          strokeWidth="32"
          strokeLinecap="round"
        />
        {/* Bedtime dot */}
        <circle cx="20" cy="186" r="8" fill="#4a8fd4" />
        {/* Wake dot */}
        <circle cx="307" cy="186" r="8" fill="#f1ebe1" />
      </svg>
      <div className="hsc-static-arc-times">
        <span className="hsc-arc-time hsc-arc-time--bed">{bedtime}</span>
        <span className="hsc-arc-plan-label">{label}</span>
        <span className="hsc-arc-time hsc-arc-time--wake">{wake}</span>
      </div>
    </div>
  );
}

// ─── Arc carousel slide SVGs ──────────────────────────────────────────────────

function Slide1Svg() {
  return (
    <svg viewBox="0 0 200 200" className="hsc-arc-slide-svg" aria-hidden>
      {/* Moon crescent */}
      <circle cx="100" cy="100" r="55" fill="#1a3056" />
      <circle cx="122" cy="88" r="44" fill="#040f1f" />
    </svg>
  );
}

function Slide2Svg() {
  return (
    <svg viewBox="0 0 335 240" className="hsc-arc-slide-svg hsc-arc-slide-svg--wide" aria-hidden>
      <defs>
        <linearGradient id="easeGrad" x1="0%" y1="0%" x2="60%" y2="0%">
          <stop offset="0%" stopColor="#9b6fd4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Track */}
      <path d="M 27 200 A 140 140 0 0 1 308 200" fill="none" stroke="#0d2244" strokeWidth="24" strokeLinecap="round" />
      {/* Ease-in lit zone (left ~40% of arc) */}
      <path d="M 27 200 A 140 140 0 0 1 167 60" fill="none" stroke="url(#easeGrad)" strokeWidth="24" strokeLinecap="round" />
      {/* Bedtime dot */}
      <circle cx="27" cy="200" r="10" fill="#c084fc" />
    </svg>
  );
}

function Slide3Svg() {
  return (
    <svg viewBox="0 0 335 240" className="hsc-arc-slide-svg hsc-arc-slide-svg--wide" aria-hidden>
      <defs>
        <linearGradient id="wakeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6b7fd4" stopOpacity="0.6" />
          <stop offset="45%" stopColor="#e8a87c" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f4c56a" stopOpacity="1" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe08a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f4a340" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Track glow */}
      <path d="M 27 200 A 140 140 0 0 1 308 200" fill="none" stroke="#0d1a33" strokeWidth="36" strokeLinecap="round" />
      {/* Colored arc */}
      <path d="M 27 200 A 140 140 0 0 1 308 200" fill="none" stroke="url(#wakeGrad)" strokeWidth="22" strokeLinecap="round" />
      {/* Sunrise glow at wake end */}
      <circle cx="308" cy="200" r="28" fill="url(#sunGlow)" />
      {/* Bed dot */}
      <circle cx="27" cy="200" r="9" fill="#8896cc" />
      {/* Wake dot */}
      <circle cx="308" cy="200" r="11" fill="#f4c56a" />
    </svg>
  );
}

// ─── Screens ──────────────────────────────────────────────────────────────────

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
      <p className="hds-h6 hsc-abs-headline-sub" style={{ marginTop: 20 }}>
        Plan them, and the data tells you what&apos;s working and what to try next.
      </p>
    </div>
  );
}

export function ArcCarouselScreen({
  slide,
  onAdvance,
}: {
  slide: 0 | 1 | 2;
  onAdvance: () => void;
}) {
  const slides = [
    { svg: <Slide1Svg />, label: "When you get in to bed" },
    { svg: <Slide2Svg />, label: "How you ease in" },
    { svg: <Slide3Svg />, label: "And when you get up" },
  ];
  const current = slides[slide];

  return (
    <div className="hsc-arc-carousel" onClick={onAdvance} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onAdvance(); }}>
      <div className="hsc-arc-carousel-visual">
        {current.svg}
      </div>
      <p className="hsc-arc-carousel-label">{current.label}</p>
      <div className="hsc-carousel-dots">
        {slides.map((_, i) => (
          <span key={i} className={"hsc-carousel-dot" + (i === slide ? " active" : "")} />
        ))}
      </div>
    </div>
  );
}

export function SleepIssueScreen({ plan, setPlan }: ScreenProps) {
  return (
    <>
      <div className="hsc-abs hsc-abs-headline-block hsc-abs-headline-block--category">
        <h1 className="hds-h5 hsc-abs-headline-title">
          Where do your nights go wrong?
        </h1>
      </div>
      <div className="hsc-abs hsc-abs-bed-list">
        {SLEEP_ISSUES.map((issue) => (
          <button
            key={issue.id}
            type="button"
            className={
              "hsc-bed-option" +
              (plan.sleepIssue === issue.id ? " selected" : "")
            }
            onClick={() =>
              setPlan((p) => ({ ...p, sleepIssue: issue.id as SleepIssue }))
            }
          >
            {issue.label}
          </button>
        ))}
      </div>
    </>
  );
}

export function HeardScreen({ issue }: { issue: SleepIssue | null }) {
  const text = issue ? HEARD_COPY[issue] : HEARD_COPY.allOkay;
  return (
    <div className="hsc-abs hsc-heard-block">
      <p className="hsc-heard-text">Got it.</p>
      <p className="hsc-heard-text hsc-heard-text--spacer">&nbsp;</p>
      <p className="hsc-heard-text">{text}</p>
    </div>
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
          showDays
          days={plan.wakeDays}
          onDaysChange={(wakeDays) => setPlan((p) => ({ ...p, wakeDays }))}
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
      <div className="hsc-abs hsc-routine-card hsc-routine-card--ease">
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
  const bedtime = formatTime(plan.bedtimeTime);
  const wake = formatTime(plan.wakeTime);
  return (
    <>
      <div className="hsc-abs hsc-planset-title-block">
        <h1 className="hds-h5 hsc-planset-title">
          Your plan is set.<br />
          Tonight, get into bed.<br />
          Your clock takes it from there.
        </h1>
      </div>
      <div className="hsc-abs hsc-planset-arc">
        <StaticPlanArc bedtime={bedtime} wake={wake} />
      </div>
      <p className="hsc-abs hsc-planset-body">
        The clock follows your whole night. How you ease in, how you sleep, how
        you wake. Your plan gets sharper from here.
      </p>
    </>
  );
}

export function HatchPlusScreen() {
  const [selected, setSelected] = useState<"annual" | "monthly">("annual");
  return (
    <>
      <div className="hsc-abs hsc-hatch-title-block">
        <h1 className="hds-h5 hsc-hatch-title">Your plan runs on Hatch+</h1>
        <p className="hds-h6 hsc-hatch-subtitle">From getting into bed to getting up</p>
      </div>
      <div className="hsc-abs hsc-hatch-options">
        <button
          type="button"
          className={"hsc-hatch-option" + (selected === "annual" ? " selected" : "")}
          onClick={() => setSelected("annual")}
        >
          <div className="hsc-hatch-option-radio">
            <span className={"hsc-radio" + (selected === "annual" ? " checked" : "")} />
          </div>
          <div className="hsc-hatch-option-text">
            <strong>30-day free trial</strong>
            <span>$49.99 / year</span>
          </div>
          <span className="hsc-hatch-badge">16% Off</span>
        </button>
        <button
          type="button"
          className={"hsc-hatch-option" + (selected === "monthly" ? " selected" : "")}
          onClick={() => setSelected("monthly")}
        >
          <div className="hsc-hatch-option-radio">
            <span className={"hsc-radio" + (selected === "monthly" ? " checked" : "")} />
          </div>
          <div className="hsc-hatch-option-text">
            <strong>7-day free trial</strong>
            <span>$4.99 / month</span>
          </div>
        </button>
        <p className="hsc-hatch-note">No payments now</p>
      </div>
    </>
  );
}

export function ClockLearnsScreen() {
  return (
    <>
      <div className="hsc-abs hsc-abs-headline-block">
        <h1 className="hds-h5 hsc-abs-headline-title">
          Your clock learns. Your sleep gets better.
        </h1>
      </div>
      <p className="hsc-abs hsc-clock-learns-body">
        Precise, private sensors pick up your breathing and movement. Every
        morning, you&apos;ll see what&apos;s working and what to try next.
      </p>
      <p className="hsc-abs hsc-clock-learns-body hsc-clock-learns-body--2">
        The better it&apos;s placed, the better it learns.
      </p>
    </>
  );
}

const PLACEMENT_ITEMS = [
  {
    title: "Distance: Within 4 ft",
    sub: "On your nightstand, close to where you sleep.",
  },
  {
    title: "Height: At mattress level or above",
    sub: "Stacked books work fine",
  },
  {
    title: "Angle: Facing your chest",
    sub: "Nothing blocking the path between it and you",
  },
];

export function PlacementScreen({
  checked,
  onToggle,
}: {
  checked: boolean[];
  onToggle: (i: number) => void;
}) {
  return (
    <>
      <div className="hsc-abs hsc-abs-headline-block">
        <h1 className="hds-h5 hsc-abs-headline-title">
          Here&apos;s where it works best
        </h1>
      </div>
      <div className="hsc-abs hsc-placement-list">
        {PLACEMENT_ITEMS.map((item, i) => (
          <button
            key={i}
            type="button"
            className={"hsc-placement-item" + (checked[i] ? " checked" : "")}
            onClick={() => onToggle(i)}
          >
            <div className="hsc-placement-text">
              <strong>{item.title}</strong>
              <span>{item.sub}</span>
            </div>
            <span className="hsc-placement-check">
              {checked[i] ? (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="11" fill="#f1ebe1" />
                  <path d="M 6 11 L 9.5 14.5 L 16 8" stroke="#040f1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="10" stroke="#4a6080" strokeWidth="1.5" />
                </svg>
              )}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

const BED_SIZES = ["Twin / Twin XL", "Full / Double", "Queen", "King", "California King"];

export function BedAndShareScreen({
  shareBed,
  bedSize,
  onShareBed,
  onBedSize,
}: {
  shareBed: string | null;
  bedSize: string | null;
  onShareBed: (v: string) => void;
  onBedSize: (v: string) => void;
}) {
  return (
    <div className="hsc-abs hsc-bed-share-wrap">
      <p className="hsc-bed-share-section-title">Do you share a bed?</p>
      <div className="hsc-bed-share-toggle">
        {["Yes", "No"].map((opt) => (
          <button
            key={opt}
            type="button"
            className={"hsc-share-btn" + (shareBed === opt ? " selected" : "")}
            onClick={() => onShareBed(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      <p className="hsc-bed-share-section-title hsc-bed-share-section-title--2">
        What size bed do you have?
      </p>
      <div className="hsc-bed-size-list">
        {BED_SIZES.map((size) => (
          <button
            key={size}
            type="button"
            className={"hsc-bed-option" + (bedSize === size ? " selected" : "")}
            onClick={() => onBedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

const THREE_CONTROLS = [
  {
    heading: "Tap to turn on",
    sub: "Ease into your night.",
    color: "#1a3056",
  },
  {
    heading: "Twist for volume",
    sub: "Adjusts volume for whatever is playing.",
    color: "#1a2e4a",
  },
  {
    heading: "Hold down to stop",
    sub: "Stops whatever is playing.",
    color: "#152840",
  },
];

export function ThreeControlsScreen() {
  return (
    <>
      <div className="hsc-abs hsc-three-title-block">
        <p className="hsc-three-eyebrow">One final thing</p>
        <h1 className="hds-h5 hsc-three-title">
          Three controls to know before tonight
        </h1>
      </div>
      <div className="hsc-abs hsc-three-list">
        {THREE_CONTROLS.map((item) => (
          <div key={item.heading} className="hsc-three-card" style={{ background: item.color }}>
            <div className="hsc-three-card-art" aria-hidden>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="36" fill="#0d2244" opacity="0.6" />
                <circle cx="40" cy="40" r="18" fill="#4a90d9" opacity="0.4" />
                <circle cx="40" cy="40" r="8" fill="#6ab4f8" />
              </svg>
            </div>
            <div className="hsc-three-card-text">
              <strong>{item.heading}</strong>
              <span>{item.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function HomeHQScreen({ plan }: { plan: PlanSelections }) {
  const bedtime = formatTime(plan.bedtimeTime);
  const wake = formatTime(plan.wakeTime);
  return (
    <div className="hsc-home-root">
      {/* Custom status bar area */}
      <div className="hsc-home-topbar">
        <span className="hsc-home-topbar-time">Bedtime</span>
        <div className="hsc-home-topbar-icons">
          <span className="hsc-home-nav-icon">›</span>
          <span className="hsc-home-nav-icon">⚙</span>
        </div>
      </div>

      <h1 className="hsc-home-headline">
        Welcome to your sleep headquarters.{" "}
        <span className="hsc-home-headline--gold">We&apos;re so glad you&apos;re here.</span>
      </h1>

      {/* Arc */}
      <div className="hsc-home-arc">
        <StaticPlanArc bedtime={bedtime} wake={wake} />
      </div>

      {/* CTA card */}
      <div className="hsc-home-card">
        <p className="hsc-home-card-title">Tonight, all you have to do is show up</p>
        <p className="hsc-home-card-body">
          Your plan is ready. Tap in to see what a day in the life with Sleep
          Clock looks like and learn the controls you need to know.
        </p>
        <button type="button" className="hsc-home-card-btn">Explore your plan</button>
      </div>

      {/* Day 0 */}
      <div className="hsc-home-day0">
        <div className="hsc-home-day0-header">
          <span className="hsc-home-day0-label">DAY 0 - GETTING STARTED</span>
          <span className="hsc-home-day0-info">ⓘ</span>
        </div>
        <div className="hsc-home-day0-row">
          <div>
            <p className="hsc-home-day0-sub">Nights sensed</p>
            <p className="hsc-home-day0-count">0 nights</p>
          </div>
          <div className="hsc-home-night-dots">
            {[1,2,3,4,5,6,7].map((n) => (
              <span key={n} className="hsc-home-night-dot">{n}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="hsc-home-tabbar">
        <button type="button" className="hsc-home-tab hsc-home-tab--active">
          <span className="hsc-home-tab-icon">●</span>
          <span>Sleep</span>
        </button>
        <button type="button" className="hsc-home-tab">
          <span className="hsc-home-tab-icon">☰</span>
          <span>Plan</span>
        </button>
        <button type="button" className="hsc-home-tab">
          <span className="hsc-home-tab-icon">♪</span>
          <span>Library</span>
        </button>
      </div>
    </div>
  );
}

// Keep for backwards compat with any imports
export function SimpleHeadlineScreen({ headline, sub }: { headline: string; sub?: string }) {
  return (
    <div className="hsc-abs hsc-abs-headline-block">
      <h1 className="hds-h5 hsc-abs-headline-title">{headline}</h1>
      {sub && <p className="hds-h6 hsc-abs-headline-sub">{sub}</p>}
    </div>
  );
}

export function BedSizeScreen({ selected, onSelect }: { selected: string | null; onSelect: (v: string) => void }) {
  const options = ["Twin", "Full", "Queen", "King", "California King"];
  return (
    <>
      <div className="hsc-abs hsc-abs-headline-block hsc-abs-headline-block--category">
        <h1 className="hds-h5 hsc-abs-headline-title">What size bed do you have?</h1>
      </div>
      <div className="hsc-abs hsc-abs-bed-list">
        {options.map((o) => (
          <button key={o} type="button" className={"hsc-bed-option" + (selected === o ? " selected" : "")} onClick={() => onSelect(o)}>{o}</button>
        ))}
      </div>
    </>
  );
}

export function ShareBedScreen({ selected, onSelect }: { selected: string | null; onSelect: (v: string) => void }) {
  return (
    <>
      <div className="hsc-abs hsc-abs-headline-block hsc-abs-headline-block--category">
        <h1 className="hds-h5 hsc-abs-headline-title">Do you share a bed?</h1>
      </div>
      <div className="hsc-abs hsc-abs-bed-list">
        {["Yes", "No", "Sometimes"].map((o) => (
          <button key={o} type="button" className={"hsc-bed-option" + (selected === o ? " selected" : "")} onClick={() => onSelect(o)}>{o}</button>
        ))}
      </div>
    </>
  );
}

// Needed because BedtimeScreen uses TimeValue
export type { TimeValue };
