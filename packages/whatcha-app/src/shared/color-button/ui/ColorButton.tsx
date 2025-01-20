import styles from "./ColorButton.module.css";

interface ColorButtonProps {
  color: string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function ColorButton({
  color,
  label,
  selected,
  onClick,
}: ColorButtonProps) {
  return (
    <button
      className={`${styles.container} ${selected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <div
        className={`${styles.circle} ${selected ? styles.selected : ""}`}
        style={{ backgroundColor: color }}
      />
      <div
        className={`${styles.label} ${
          selected ? "font-b-sm color-primary" : "font-r-sm"
        }`}
      >
        {label}
      </div>
    </button>
  );
}
