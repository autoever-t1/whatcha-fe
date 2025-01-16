import { ReactNode } from "react";
import styles from "./BaseModal.module.css";
import { MainHeader } from "@shared/main-header";

interface BaseModalProps {
  children: ReactNode;
  title: string;
  onClickBack: () => void;
}

export function BaseModal({ children, title, onClickBack }: BaseModalProps) {
  return (
    <div className={styles.container}>
      <MainHeader title={title} onClickBack={onClickBack} />
      {children}
    </div>
  );
}
