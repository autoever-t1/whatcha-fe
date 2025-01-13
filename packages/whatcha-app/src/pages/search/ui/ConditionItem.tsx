import { ReactNode } from "react";
import styles from "./ConditionItem.module.css";

interface ConditionItemProps {
  title: string;
  children: ReactNode;
}

export function ConditionItem({ title, children }: ConditionItemProps) {
  return (
    <div className={styles.container}>
      <div className={`${styles.title} font-b-md`}>{title}</div>
      {children}
    </div>
  );
}
