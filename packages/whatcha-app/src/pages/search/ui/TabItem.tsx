import { ReactNode } from "react";
import styles from "./TabItem.module.css";

interface TabItemProps {
  children: ReactNode;
  selected: boolean;
  onClick: () => void;
}

export function TabItem({ children, selected, onClick }: TabItemProps) {
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
