type Props = {
  label: string;
  disabled?: boolean;
  variant?: "primary" | "tertiary";
  onClick: () => void;
};

export function HscPrimaryButton({
  label,
  disabled,
  variant = "primary",
  onClick,
}: Props) {
  return (
    <button
      type="button"
      className={
        "hsc-btn" + (variant === "tertiary" ? " hsc-btn--tertiary" : "")
      }
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
