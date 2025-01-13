import { ReactNode } from "react";
import styles from "./BottomButton.module.css";

interface BottomButtonProps {
  children: ReactNode;
  disabled?: boolean;
}

export function BottomButton({ children, disabled }: BottomButtonProps) {
  return (
    <button className={`${styles.container} font-r-md`} disabled={disabled}>
      {children}
    </button>
  );
}
