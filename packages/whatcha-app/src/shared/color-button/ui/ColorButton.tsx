import styles from "./ColorButton.module.css";

interface ColorButtonProps {
  color: string;
  label: string;
}

export function ColorButton({ color, label }: ColorButtonProps) {
  return (
    <button className={styles.container}>
      <div className={styles.circle} style={{ backgroundColor: color }} />
      <div className={`${styles.label} font-r-sm`}>{label}</div>
    </button>
  );
}
