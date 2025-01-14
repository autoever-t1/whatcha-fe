import { ReactNode } from "react";
import styles from "./MainButton.module.css";

interface MainButtonProps {
  children: ReactNode;
}

export function MainButton({ children }: MainButtonProps) {
  return (
    <button className={`${styles.container} font-b-sm`}>{children}</button>
  );
}
