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
  { id: "cantSwitchOff", label: "I can't switch my mind off to sleep" },
  { id: "keepWaking", label: "I wake up through the night" },
  { id: "wakeNotRested", label: "I never wake up feeling rested" },
  { id: "allOkay", label: "I sleep fine" },
];

export const HEARD_COPY: Record<SleepIssue, string> = {
  bedtimeTooLate:
    "Supporting you going to bed on time is part of the plan. Like a bedtime you'll look forward to.",
  cantSwitchOff:
    "Supporting you easing in to sleep is part of the plan. Like a wind-down that lets the day go.",
  keepWaking:
    "Waking mid-sleep is rough. Your plan will help train a more consistent night.",
  wakeNotRested:
    "Waking up groggy means something's off. Let's fix your whole night.",
  allOkay:
    "Let's build a plan anyway — bedtime, wind-down, and a gentle wake-up.",
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
