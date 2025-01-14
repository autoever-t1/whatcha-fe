import { ReactNode } from "react";
import styles from "./MenuItem.module.css";

interface MenuItemProps {
  icon: string;
  children: ReactNode;
  onClick?: () => void;
}

export function MenuItem({ icon, children, onClick }: MenuItemProps) {
  return (
    <button className={`${styles.container} font-b-sm`} onClick={onClick}>
      <div className={styles["icon-wrapper"]}>
        <img src={icon} alt="icon" />
      </div>
      {children}
    </button>
  );
}
