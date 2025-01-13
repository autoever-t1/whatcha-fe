import { ReactNode } from "react";
import styles from "./BottomButton.module.css";

interface BottomButton {
  children: ReactNode;
}

export function BottomButton() {
  return <div className={styles.container}></div>;
}
