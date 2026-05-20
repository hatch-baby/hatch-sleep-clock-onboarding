import { useCallback, useEffect, useState } from "react";
import { easeCategories, getEaseCategory, getWakeCategory, wakeCategories } from "./contentManifest";
import { playPreview, stopPreview } from "./audioPreview";
import { formatTime, sunriseStartLabel } from "./formatTime";
import { defaultBedtimeTime, defaultWakeTime, type PlanSelections } from "./types";
import { progressForStep, STEPS, type StepId } from "./steps";
import "./hds.css";

const initialPlan = (): PlanSelections => ({
  wakeTime: { ...defaultWakeTime },
  wakeDays: [1,2,3,4,5],
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

function PlayIcon() {
  return <svg viewBox="0 0 12 12" fill="currentColor"><path d="M2 1.5v9l8-4.5z"/></svg>;
}

export function HscOnboardingFlow() {
  const [index, setIndex] = useState(() => {
    const s = stepFromUrl();
    return s ? STEPS.indexOf(s) : 0;
  });
  const [plan, setPlan] = useState(initialPlan);
  const step = STEPS[Math.min(index, STEPS.length - 1)];

  useEffect(() => { stopPreview(); }, [step]);
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    p.set("p", "hsc");
    p.set("step", step);
    window.history.replaceState(null, "", window.location.pathname + "?" + p.toString());
  }, [step]);

  const onNext = useCallback(() => setIndex((i) => Math.min(i + 1, STEPS.length - 1)), []);
  const goTo = useCallback((id: StepId) => { const i = STEPS.indexOf(id); if (i >= 0) setIndex(i); }, []);

  const pct = Math.round(progressForStep(step) * 100);
  const catWake = plan.wakeCategoryId ? getWakeCategory(plan.wakeCategoryId) : null;
  const catEase = plan.easeCategoryId ? getEaseCategory(plan.easeCategoryId) : null;

  return (
    <div className="hsc-page hsc-root">
      <div className="hsc-phone">
        <div className="hsc-phone-inner">
          <div className="hsc-status"><span>9:41</span></div>
          <div className="hsc-progress-wrap">
            <div className="hsc-progress-label">Registering your Sleep Clock</div>
            <div className="hsc-progress-track"><div className="hsc-progress-fill" style={{ width: pct + "%" }} /></div>
          </div>
          <div className="hsc-scroll">
            {step === "bluetoothIntro" && (
              <>
                <div className="hsc-hero-block" />
                <h1 className="hsc-headline">Bluetooth Connection</h1>
                <p className="hsc-body">Your clock starts tracking the moment you get into bed. First, let us set you up.</p>
              </>
            )}
            {step === "planThreeParts" && <h1 className="hsc-headline">Your night has three parts you can control</h1>}
            {step.startsWith("arc") && <div className="hsc-arc-placeholder">Arc — static until animation spec</div>}
            {step === "heardBedtime" && <p className="hsc-body">Heard. Going to bed on time is part of the plan.</p>}
            {step === "heardWake" && <p className="hsc-body">Heard. Waking up well is part of the plan.</p>}
            {step === "heardPlan" && <p className="hsc-body">Heard. Let us build a plan: bedtime, wind-down, gentle wake.</p>}
            {step === "wakeTime" && (
              <>
                <h1 className="hsc-headline">When do you want to get up?</h1>
                <input type="time" className="hsc-time-input" defaultValue="07:30" onChange={(e) => {
                  const [h,m] = e.target.value.split(":").map(Number);
                  setPlan(p => ({...p, wakeTime: { hour: h||7, minute: m||0, period: h>=12?"pm":"am" }}));
                }} />
              </>
            )}
            {step === "wakeCategory" && (
              <>
                <h1 className="hsc-headline">How do you want to get up?</h1>
                <div className="hsc-category-grid">
                  {wakeCategories.map(c => (
                    <button key={c.id} type="button" className={"hsc-category-tile" + (plan.wakeCategoryId===c.id?" selected":"")} onClick={() => setPlan(p=>({...p,wakeCategoryId:c.id,wakePick:null}))}>
                      <h3>{c.title}</h3><p>{c.subtitle}</p>
                    </button>
                  ))}
                </div>
              </>
            )}
            {step === "wakeContent" && catWake && (
              <>
                <h1 className="hsc-headline">We picked these for you</h1>
                <div className="hsc-content-list">
                  {catWake.picks.map(pick => (
                    <div key={pick.id} className={"hsc-content-row" + (plan.wakePick?.id===pick.id?" selected":"")}>
                      <div className="hsc-content-main" onClick={() => setPlan(p=>({...p,wakePick:pick}))}>
                        <div><h3>{pick.title}</h3><p>{pick.meta}</p></div>
                        <button type="button" className="hsc-play-btn" onClick={e=>{e.stopPropagation();playPreview(pick.audioUrl);}}><PlayIcon/></button>
                      </div>
                      <div className="hsc-content-art" style={{background:pick.artworkHue}} />
                      <span className="hsc-check" />
                    </div>
                  ))}
                </div>
              </>
            )}
            {step === "wakeSummary" && plan.wakePick && (
              <>
                <h1 className="hsc-headline">Set to Rise at {formatTime(plan.wakeTime)}</h1>
                <p className="hsc-body">Starting at {sunriseStartLabel(plan.wakeTime)}, so {plan.wakePick.title} wakes you at {formatTime(plan.wakeTime)}.</p>
                <div className="hsc-routine-card"><div className="hsc-routine-art" style={{background:plan.wakePick.artworkHue}}/><div><h4>{plan.wakePick.title}</h4><p>{plan.wakePick.meta}</p></div></div>
              </>
            )}
            {step === "bedtime" && (
              <>
                <h1 className="hsc-headline">Get in to bed by {formatTime(plan.bedtimeTime)}</h1>
                <input type="time" className="hsc-time-input" defaultValue="21:30" onChange={(e)=>{const [h,m]=e.target.value.split(":").map(Number);setPlan(p=>({...p,bedtimeTime:{hour:h||9,minute:m||30,period:h>=12?"pm":"am"}}));}} />
              </>
            )}
            {step === "easeCategory" && (
              <>
                <h1 className="hsc-headline">How do you want to ease in?</h1>
                <div className="hsc-category-grid">
                  {easeCategories.map(c => (
                    <button key={c.id} type="button" className={"hsc-category-tile" + (plan.easeCategoryId===c.id?" selected":"")} onClick={() => setPlan(p=>({...p,easeCategoryId:c.id,easePick:null}))}>
                      <h3>{c.title}</h3><p>{c.subtitle}</p>
                    </button>
                  ))}
                </div>
              </>
            )}
            {step === "easeContent" && catEase && (
              <>
                <h1 className="hsc-headline">We picked these for you</h1>
                <div className="hsc-content-list">
                  {catEase.picks.map(pick => (
                    <div key={pick.id} className={"hsc-content-row" + (plan.easePick?.id===pick.id?" selected":"")}>
                      <div className="hsc-content-main" onClick={() => setPlan(p=>({...p,easePick:pick}))}>
                        <div><h3>{pick.title}</h3><p>{pick.meta}</p></div>
                        <button type="button" className="hsc-play-btn" onClick={e=>{e.stopPropagation();playPreview(pick.audioUrl);}}><PlayIcon/></button>
                      </div>
                      <div className="hsc-content-art" style={{background:pick.artworkHue}} />
                      <span className="hsc-check" />
                    </div>
                  ))}
                </div>
              </>
            )}
            {step === "easeInBed" && plan.easePick && (
              <>
                <h1 className="hsc-headline">When you are in bed, tap the big button</h1>
                <p className="hsc-body">{plan.easePick.title} plays, Blood Moon light sets the mood</p>
                <div className="hsc-routine-card"><div className="hsc-routine-art" style={{background:plan.easePick.artworkHue}}/><div><h4>{plan.easePick.title}</h4></div></div>
              </>
            )}
            {step === "planSet" && (
              <>
                <h1 className="hsc-headline">Your plan is set. Tonight, get into bed.</h1>
                <div className="hsc-plan-times"><span>{formatTime(plan.bedtimeTime)}</span><span>— Plan —</span><span>{formatTime(plan.wakeTime)}</span></div>
              </>
            )}
            {step === "hatchPlus" && <h1 className="hsc-headline">Your plan runs on Hatch+</h1>}
            {step === "clockLearns" && <h1 className="hsc-headline">Your clock learns. Your sleep gets better.</h1>}
            {step === "placementIntro" && <h1 className="hsc-headline">Here is where it works best</h1>}
            {step === "placementDone" && <h1 className="hsc-headline">Placement complete</h1>}
            {step === "bedSize" && <h1 className="hsc-headline">What size bed do you have?</h1>}
            {step === "shareBed" && <h1 className="hsc-headline">Do you share a bed?</h1>}
            {step === "homeHQ" && <h1 className="hsc-headline">Welcome to your sleep headquarters.</h1>}
          </div>
          <div className="hsc-footer">
            <button type="button" className="hsc-btn" disabled={
              (step==="wakeCategory"&&!plan.wakeCategoryId) ||
              (step==="wakeContent"&&!plan.wakePick) ||
              (step==="easeCategory"&&!plan.easeCategoryId) ||
              (step==="easeContent"&&!plan.easePick)
            } onClick={() => {
              if (step==="wakeCategory") goTo("wakeContent");
              else if (step==="easeCategory") goTo("easeContent");
              else onNext();
            }}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}
