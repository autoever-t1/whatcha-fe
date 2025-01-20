import { ReactNode } from "react";
import styles from "./ContentBox.module.css";

interface ContentBoxProps {
  position?: "top" | "bottom";
  title: string;
  children: ReactNode;
  color?: "default" | "primary";
}

export function ContentBox({
  position,
  title,
  children,
  color = "default",
}: ContentBoxProps) {
  return (
    <div
      className={`${styles.container} ${
        position === "top"
          ? styles.top
          : position === "bottom"
          ? styles.bottom
          : ""
      } ${color === "primary" ? styles.primary : ""}`}
    >
      <h3 className={`font-b-lg ${color === "primary" ? styles.primary : ""}`}>
        {title}
      </h3>
      {children}
    </div>
  );
}
