export type StepId =
  | "bluetoothIntro"
  | "planThreeParts"
  | "arcBedtime"
  | "arcSleep"
  | "arcWake"
  | "arcEaseIn"
  | "heardBedtime"
  | "heardWake"
  | "heardPlan"
  | "wakeTime"
  | "wakeCategory"
  | "wakeContent"
  | "wakeSummary"
  | "bedtime"
  | "easeCategory"
  | "easeContent"
  | "easeInBed"
  | "planSet"
  | "hatchPlus"
  | "clockLearns"
  | "placementIntro"
  | "placementDone"
  | "bedSize"
  | "shareBed"
  | "homeHQ";

export const STEPS: StepId[] = [
  "bluetoothIntro",
  "planThreeParts",
  "arcBedtime",
  "arcSleep",
  "arcWake",
  "arcEaseIn",
  "heardBedtime",
  "heardWake",
  "heardPlan",
  "wakeTime",
  "wakeCategory",
  "wakeContent",
  "wakeSummary",
  "bedtime",
  "easeCategory",
  "easeContent",
  "easeInBed",
  "planSet",
  "hatchPlus",
  "clockLearns",
  "placementIntro",
  "placementDone",
  "bedSize",
  "shareBed",
  "homeHQ",
];

export function stepIndex(id: StepId): number {
  return STEPS.indexOf(id);
}

export function progressForStep(id: StepId): number {
  const i = stepIndex(id);
  return i < 0 ? 0 : (i + 1) / STEPS.length;
}
