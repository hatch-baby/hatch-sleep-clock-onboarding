import type { TimeValue } from "../types";

type Props = {
  value: TimeValue;
  onChange: (t: TimeValue) => void;
};

function to12h(h24: number): { hour: number; period: "am" | "pm" } {
  const period: "am" | "pm" = h24 >= 12 ? "pm" : "am";
  let hour = h24 % 12;
  if (hour === 0) hour = 12;
  return { hour, period };
}

function to24h(hour: number, period: "am" | "pm"): number {
  if (period === "am") return hour === 12 ? 0 : hour;
  return hour === 12 ? 12 : hour + 12;
}

export function HscTimePicker({ value, onChange }: Props) {
  const h24 = to24h(value.hour, value.period);
  const minuteStr = String(value.minute).padStart(2, "0");

  const bumpHour = (delta: number) => {
    const next = (h24 + delta + 24) % 24;
    const { hour, period } = to12h(next);
    onChange({ hour, minute: value.minute, period });
  };

  const bumpMinute = (delta: number) => {
    let m = value.minute + delta;
    let h = h24;
    if (m >= 60) {
      m = 0;
      h = (h + 1) % 24;
    } else if (m < 0) {
      m = 45;
      h = (h + 23) % 24;
    }
    const { hour, period } = to12h(h);
    onChange({ hour, minute: m, period });
  };

  return (
    <div className="hsc-time-picker">
      <div className="hsc-time-display">
        {value.hour}:{minuteStr} {value.period}
      </div>
      <div className="hsc-time-controls">
        <button type="button" onClick={() => bumpHour(-1)} aria-label="Earlier hour">
          −
        </button>
        <span className="hds-caption">Hour</span>
        <button type="button" onClick={() => bumpHour(1)} aria-label="Later hour">
          +
        </button>
      </div>
      <div className="hsc-time-controls">
        <button type="button" onClick={() => bumpMinute(-15)} aria-label="Earlier 15 min">
          −
        </button>
        <span className="hds-caption">Minute</span>
        <button type="button" onClick={() => bumpMinute(15)} aria-label="Later 15 min">
          +
        </button>
      </div>
      <div className="hsc-time-period">
        <button
          type="button"
          className={value.period === "am" ? "active" : ""}
          onClick={() => onChange({ ...value, period: "am" })}
        >
          am
        </button>
        <button
          type="button"
          className={value.period === "pm" ? "active" : ""}
          onClick={() => onChange({ ...value, period: "pm" })}
        >
          pm
        </button>
      </div>
    </div>
  );
}
