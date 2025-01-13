import styles from "./BadgeButton.module.css";

interface BadgeButtonProps {
  children: string;
  selected?: boolean;
}

export function BadgeButton({ children, selected }: BadgeButtonProps) {
  return (
    <button
      className={`${styles.container} font-r-sm ${
        selected ? styles.selected : ""
      }`}
    >
      {children}
    </button>
  );
}
