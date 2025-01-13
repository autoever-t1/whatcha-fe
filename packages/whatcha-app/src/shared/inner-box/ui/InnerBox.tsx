import { ReactNode } from "react";
import styles from "./InnerBox.module.css";

interface InnerBoxProps {
  children: ReactNode;
}

export function InnerBox({ children }: InnerBoxProps) {
  return <div className={styles.container}>{children}</div>;
}
