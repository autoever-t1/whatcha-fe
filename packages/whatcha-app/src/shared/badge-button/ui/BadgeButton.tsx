import styles from "./BadgeButton.module.css";

interface BadgeButtonProps {
  children: string;
  selected?: boolean;
  onClick?: () => void;
}

export function BadgeButton({ children, selected, onClick }: BadgeButtonProps) {
  return (
    <button
      className={`${styles.container} font-r-sm ${
        selected ? styles.selected : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
