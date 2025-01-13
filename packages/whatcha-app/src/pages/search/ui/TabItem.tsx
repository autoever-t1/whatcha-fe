import { ReactNode } from "react";
import styles from "./TabItem.module.css";

interface TabItemProps {
  children: ReactNode;
}

export function TabItem({ children }: TabItemProps) {
  return (
    <button className={`${styles.container} font-r-sm`}>{children}</button>
  );
}
