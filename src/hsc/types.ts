export type ContentPick = {
  id: string;
  title: string;
  meta: string;
  artworkHue: string;
  audioUrl: string;
};

export type Category = {
  id: string;
  title: string;
  subtitle: string;
  picks: ContentPick[];
};

export type TimeValue = { hour: number; minute: number; period: "am" | "pm" };

export type PlanSelections = {
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
