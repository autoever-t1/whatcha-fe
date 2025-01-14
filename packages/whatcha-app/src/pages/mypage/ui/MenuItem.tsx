import { ReactNode } from "react";
import styles from "./MenuItem.module.css";

interface MenuItemProps {
  icon: string;
  children: ReactNode;
}

export function MenuItem({ icon, children }: MenuItemProps) {
  return (
    <button className={`${styles.container} font-b-sm`}>
      <div className={styles["icon-wrapper"]}>
        <img src={icon} alt="icon" />
      </div>
      {children}
    </button>
  );
}
