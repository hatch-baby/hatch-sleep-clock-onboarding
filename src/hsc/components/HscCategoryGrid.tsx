import type { Category } from "../types";

type Position = "tl" | "tr" | "bl" | "br";

type Props = {
  categories: Category[];
  positions: { id: string; pos: Position }[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

const posStyle: Record<Position, { left: number; top: number }> = {
  tl: { left: 18, top: 244 },
  tr: { left: 193, top: 244 },
  bl: { left: 18, top: 410 },
  br: { left: 193, top: 410 },
};

export function HscCategoryGrid({
  categories,
  positions,
  selectedId,
  onSelect,
}: Props) {
  const byId = Object.fromEntries(categories.map((c) => [c.id, c]));

  return (
    <>
      {positions.map(({ id, pos }) => {
        const cat = byId[id];
        if (!cat) return null;
        const { left, top } = posStyle[pos];
        return (
          <button
            key={id}
            type="button"
            className={
              "hsc-category-tile" + (selectedId === id ? " selected" : "")
            }
            style={{ left, top }}
            onClick={() => onSelect(id)}
          >
            <h3>{cat.title}</h3>
            <p>{cat.subtitle}</p>
          </button>
        );
      })}
    </>
  );
}
