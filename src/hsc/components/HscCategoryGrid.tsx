import type { Category } from "../types";

type Position = "tl" | "tr" | "bl" | "br";

type Props = {
  categories: Category[];
  positions: { id: string; pos: Position }[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

const posClass: Record<Position, string> = {
  tl: "hsc-category-tile--tl",
  tr: "hsc-category-tile--tr",
  bl: "hsc-category-tile--bl",
  br: "hsc-category-tile--br",
};

export function HscCategoryGrid({
  categories,
  positions,
  selectedId,
  onSelect,
}: Props) {
  const byId = Object.fromEntries(categories.map((c) => [c.id, c]));

  return (
    <div className="hsc-category-grid">
      {positions.map(({ id, pos }) => {
        const cat = byId[id];
        if (!cat) return null;
        return (
          <button
            key={id}
            type="button"
            className={
              "hsc-category-tile " +
              posClass[pos] +
              (selectedId === id ? " selected" : "")
            }
            onClick={() => onSelect(id)}
          >
            <h3>{cat.title}</h3>
            <p>{cat.subtitle}</p>
          </button>
        );
      })}
    </div>
  );
}
