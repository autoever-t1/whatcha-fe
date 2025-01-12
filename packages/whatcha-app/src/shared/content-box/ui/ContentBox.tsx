import { ReactNode } from "react";
import styles from "./ContentBox.module.css";

interface ContentBoxProps {
  position?: "top" | "bottom";
  title: string;
  children: ReactNode;
}

export function ContentBox({ position, title, children }: ContentBoxProps) {
  return (
    <div
      className={`${styles.container} ${
        position === "top"
          ? styles.top
          : position === "bottom"
          ? styles.bottom
          : ""
      }`}
    >
      <h3 className={`font-b-md`}>{title}</h3>
      {children}
    </div>
  );
}
