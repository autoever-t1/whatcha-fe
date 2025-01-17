import { forwardRef, ReactNode } from "react";
import styles from "./ConditionItem.module.css";

interface ConditionItemProps {
  title: string;
  children: ReactNode;
  last?: boolean;
}

export const ConditionItem = forwardRef<HTMLDivElement, ConditionItemProps>(
  ({ title, children, last }, ref) => {
    return (
      <div
        className={`${styles.container} ${last ? styles.last : ""}`}
        ref={ref}
      >
        <div className={`${styles.title} font-b-md`}>{title}</div>
        {children}
      </div>
    );
  }
);
