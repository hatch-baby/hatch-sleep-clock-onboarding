import { playPreview } from "../audioPreview";
import { shellAssets } from "../figmaAssets";
import type { ContentPick } from "../types";

type Props = {
  picks: ContentPick[];
  selectedId: string | null;
  onSelect: (pick: ContentPick) => void;
  subtitle?: string;
};

export function HscContentPicker({
  picks,
  selectedId,
  onSelect,
  subtitle = "A few for now. Thousands more for every morning after.",
}: Props) {
  return (
    <>
      <div className="hsc-screen-pad">
        <h1 className="hds-h5">We picked these for you</h1>
        <p className="hds-h6">{subtitle}</p>
      </div>
      <div className="hsc-content-list">
        {picks.map((pick) => {
          const selected = selectedId === pick.id;
          return (
            <div
              key={pick.id}
              className={"hsc-content-row" + (selected ? " selected" : "")}
            >
              <div className="hsc-content-row-inner">
                <div
                  className="hsc-content-select-area"
                  onClick={() => onSelect(pick)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") onSelect(pick);
                  }}
                />
                <h3>{pick.title}</h3>
                <p>{pick.meta}</p>
                <button
                  type="button"
                  className="hsc-play-btn"
                  aria-label={`Preview ${pick.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    playPreview(pick.audioUrl);
                  }}
                >
                  <img src={shellAssets.playIcon} alt="" />
                </button>
                <img
                  className="hsc-content-thumb"
                  src={pick.imageUrl}
                  alt=""
                />
                <span className="hsc-check">
                  <img
                    src={
                      selected
                        ? shellAssets.checkmarkFilled
                        : shellAssets.checkmarkEmpty
                    }
                    alt=""
                  />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
