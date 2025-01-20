import { MouseEventHandler, useCallback } from "react";
import styles from "./RadioButton.module.css";

interface RadioButtonProps {
  value: boolean;
  onClick: () => void;
  label: string;
}

export function RadioButton({ value, label, onClick }: RadioButtonProps) {
  const handleClick: MouseEventHandler<HTMLInputElement> = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <div className={styles.container} onClick={handleClick}>
      <div
        className={`${styles["circle-wrapper"]} ${value ? styles.checked : ""}`}
      />
      <span className="font-r-md">{label}</span>
    </div>
  );
}
