export type StepId =
  | "bluetoothIntro"
  | "planThreeParts"
  | "arcCarousel"
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
  | "placement"
  | "bedAndShare"
  | "threeControls"
  | "homeHQ";

export const STEPS: StepId[] = [
  "bluetoothIntro",
  "planThreeParts",
  "arcCarousel",
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
  "placement",
  "bedAndShare",
  "threeControls",
  "homeHQ",
];

const PROGRESS_FILL_PX: Partial<Record<StepId, number>> = {
  bluetoothIntro: 60,
  planThreeParts: 80,
  arcCarousel: 108,
  sleepIssue: 130,
  heardIssue: 148,
  wakeTime: 164,
  wakeCategory: 180,
  wakeContent: 196,
  wakeSummary: 212,
  bedtime: 224,
  easeCategory: 238,
  easeContent: 252,
  easeInBed: 264,
  planSet: 272,
  hatchPlus: 278,
  clockLearns: 282,
  placement: 286,
  bedAndShare: 289,
  threeControls: 291,
  homeHQ: 292,
};

export function stepIndex(id: StepId): number {
  return STEPS.indexOf(id);
}

export function progressFillPx(id: StepId): number {
  return PROGRESS_FILL_PX[id] ?? 60;
}

export function progressForStep(id: StepId): number {
  return progressFillPx(id) / 292;
}

export function showProgressHeader(id: StepId): boolean {
  return id !== "homeHQ";
}
