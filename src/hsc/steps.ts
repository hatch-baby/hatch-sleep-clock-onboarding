export type StepId =
  | "bluetoothIntro"
  | "planThreeParts"
  | "arcBedtime"
  | "arcSleep"
  | "arcWake"
  | "sleepIssue"
  | "heardIssue"
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
  | "placementFinal"
  | "homeHQ";

export const STEPS: StepId[] = [
  "bluetoothIntro",
  "planThreeParts",
  "arcBedtime",
  "arcSleep",
  "arcWake",
  "sleepIssue",
  "heardIssue",
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
  "placementFinal",
  "homeHQ",
];

/** Progress fill width in px (292px track max) — tuned to Figma frames */
const PROGRESS_FILL_PX: Partial<Record<StepId, number>> = {
  bluetoothIntro: 76,
  planThreeParts: 88,
  arcBedtime: 100,
  arcSleep: 112,
  arcWake: 124,
  sleepIssue: 136,
  heardIssue: 148,
  wakeTime: 156,
  wakeCategory: 76,
  wakeContent: 120,
  wakeSummary: 140,
  bedtime: 160,
  easeCategory: 180,
  easeContent: 200,
  easeInBed: 220,
  planSet: 240,
  hatchPlus: 252,
  clockLearns: 264,
  placementIntro: 272,
  placementDone: 280,
  bedSize: 286,
  shareBed: 290,
  placementFinal: 292,
  homeHQ: 292,
};

export function stepIndex(id: StepId): number {
  return STEPS.indexOf(id);
}

export function progressFillPx(id: StepId): number {
  return PROGRESS_FILL_PX[id] ?? 76;
}

export function progressForStep(id: StepId): number {
  return progressFillPx(id) / 292;
}

export function showProgressHeader(id: StepId): boolean {
  return id !== "homeHQ";
}
