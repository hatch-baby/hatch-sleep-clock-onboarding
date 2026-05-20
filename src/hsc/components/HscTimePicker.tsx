import type { TimeValue } from "../types";

type Props = {
  value: TimeValue;
  onChange: (v: TimeValue) => void;
  showDays?: boolean;
  days?: number[];
  onDaysChange?: (days: number[]) => void;
};

const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MINUTES = Array.from({ length: 60 }, (_, i) => i);
const PERIODS = ["am", "pm"] as const;
const DAY_LABELS = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];

const OFFSETS = [-2, -1, 0, 1, 2];
const OPACITIES = [0.2, 0.4, 1, 0.4, 0.2];

function DrumColumn<T>({
  values,
  selectedIndex,
  format,
  onSelect,
}: {
  values: T[];
  selectedIndex: number;
  format: (v: T) => string;
  onSelect: (idx: number) => void;
}) {
  return (
    <div className="hsc-drum-col">
      {OFFSETS.map((offset, i) => {
        const idx = ((selectedIndex + offset) % values.length + values.length) % values.length;
        return (
          <div
            key={offset}
            className={"hsc-drum-item" + (offset === 0 ? " hsc-drum-item--selected" : "")}
            style={{ opacity: OPACITIES[i] }}
            onClick={() => {
              if (offset !== 0) {
                onSelect(((selectedIndex + offset) % values.length + values.length) % values.length);
              }
            }}
          >
            {format(values[idx])}
          </div>
        );
      })}
    </div>
  );
}

export function HscTimePicker({
  value,
  onChange,
  showDays = false,
  days = [],
  onDaysChange,
}: Props) {
  const hourIdx = HOURS.indexOf(value.hour);
  const minuteIdx = value.minute;
  const periodIdx = PERIODS.indexOf(value.period);

  const displayHour = value.hour < 1 ? 12 : value.hour > 12 ? value.hour - 12 : value.hour;
  void displayHour;

  return (
    <div className="hsc-time-picker-wrap">
      <p className="hsc-drum-label">Rise time</p>
      <div className="hsc-drum-picker">
        <div className="hsc-drum-highlight" />
        <DrumColumn
          values={HOURS}
          selectedIndex={hourIdx < 0 ? 6 : hourIdx}
          format={(h) => String(h)}
          onSelect={(idx) => onChange({ ...value, hour: HOURS[idx] })}
        />
        <DrumColumn
          values={MINUTES}
          selectedIndex={minuteIdx}
          format={(m) => String(m).padStart(2, "0")}
          onSelect={(idx) => onChange({ ...value, minute: idx })}
        />
        <DrumColumn
          values={PERIODS as unknown as string[]}
          selectedIndex={periodIdx < 0 ? 0 : periodIdx}
          format={(p) => String(p).toUpperCase()}
          onSelect={(idx) =>
            onChange({ ...value, period: PERIODS[idx] })
          }
        />
      </div>

      {showDays && onDaysChange && (
        <div className="hsc-days-wrap">
          <p className="hsc-drum-label hsc-drum-label--days">Select days</p>
          <div className="hsc-days-row">
            {DAY_LABELS.map((label, i) => {
              const active = days.includes(i);
              return (
                <button
                  key={label}
                  type="button"
                  className={"hsc-day-btn" + (active ? " active" : "")}
                  onClick={() =>
                    onDaysChange(
                      active ? days.filter((d) => d !== i) : [...days, i]
                    )
                  }
                >
                  {label}
                </button>
              );
            })}
          </div>
          <p className="hsc-days-hint">Your alarm only plays on selected days.</p>
        </div>
      )}
    </div>
  );
}
