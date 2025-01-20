import { ReactNode } from "react";
import styles from "./BottomButton.module.css";

interface BottomButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export function BottomButton({
  children,
  disabled,
  onClick,
}: BottomButtonProps) {
  return (
    <button
      className={`${styles.container} font-r-md`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
