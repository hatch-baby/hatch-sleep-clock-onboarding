export type ContentPick = {
  id: string;
  title: string;
  meta: string;
  imageUrl: string;
  audioUrl: string;
};

export type Category = {
  id: string;
  title: string;
  subtitle: string;
  picks: ContentPick[];
};

export type TimeValue = { hour: number; minute: number; period: "am" | "pm" };

export type SleepIssue =
  | "bedtimeTooLate"
  | "cantSwitchOff"
  | "keepWaking"
  | "wakeNotRested"
  | "allOkay";

export const SLEEP_ISSUES: { id: SleepIssue; label: string }[] = [
  { id: "bedtimeTooLate", label: "I go to bed too late" },
  { id: "cantSwitchOff", label: "I can't switch off at night" },
  { id: "keepWaking", label: "I keep waking up at night" },
  { id: "wakeNotRested", label: "I wake up and don't feel rested" },
  { id: "allOkay", label: "Everything's pretty okay" },
];

export const HEARD_COPY: Record<SleepIssue, string> = {
  bedtimeTooLate:
    "Heard. Going to bed on time is a big piece of this. We'll work on it.",
  cantSwitchOff:
    "Heard. Winding down is harder than it sounds. That's what the ease-in is for.",
  keepWaking:
    "Heard. Waking mid-sleep is rough. Your plan will help train a more consistent night.",
  wakeNotRested:
    "Heard. Waking up groggy means something's off. Let's fix your whole night.",
  allOkay:
    "Heard. Let's build a plan: bedtime, wind-down, and a gentle wake-up.",
};

export type PlanSelections = {
  sleepIssue: SleepIssue | null;
  wakeTime: TimeValue;
  wakeDays: number[];
  bedtimeTime: TimeValue;
  wakeCategoryId: string | null;
  wakePick: ContentPick | null;
  easeCategoryId: string | null;
  easePick: ContentPick | null;
};

export const defaultWakeTime: TimeValue = { hour: 7, minute: 30, period: "am" };
export const defaultBedtimeTime: TimeValue = { hour: 9, minute: 30, period: "pm" };
