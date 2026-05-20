import type { CSSProperties, ReactNode } from "react";
import type { NightExplainHeadlineKey } from "../nightExplainHeadline";
import { fontStack, wireframe } from "../wireframeTokens";

const copyStyle: CSSProperties = {
  margin: 0,
  fontSize: 32,
  lineHeight: 1.18,
  fontWeight: 700,
  letterSpacing: "-0.03em",
  color: wireframe.ink,
  fontFamily: fontStack,
  textAlign: "center",
  maxWidth: 340,
  marginInline: "auto",
};

const COPY: Record<Exclude<NightExplainHeadlineKey, "routine">, ReactNode> = {
  contentMade: "Content made for sleep",
  trackedNight: (
    <>
      Your sleep, quietly
      <br />
      tracked all night
    </>
  ),
  downDetail: "Down to the detail",
  wakeGently: (
    <>
      Wake up gently,
      <br />
      every morning
    </>
  ),
  seeWorking: "See what's working",
};

type NightExplainBottomHeadlineProps = {
  headline: NightExplainHeadlineKey;
  style?: CSSProperties;
};

export function NightExplainBottomHeadline({ headline, style }: NightExplainBottomHeadlineProps) {
  if (headline === "routine") {
    return null;
  }
  return <p style={{ ...copyStyle, ...style }}>{COPY[headline]}</p>;
}
