import { ReactNode } from "react";
import styles from "./MainButton.module.css";

interface MainButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export function MainButton({ children, disabled, onClick }: MainButtonProps) {
  return (
    <button
      className={`${styles.container} font-b-sm`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
