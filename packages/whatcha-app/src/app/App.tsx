import { Outlet, useLocation } from "react-router";
import { useMemo } from "react";
import styles from "./App.module.css";
import { BottomNavigation } from "@widgets/bottom-navigation";

export function App() {
  const { pathname } = useLocation();

  const hasHeader = useMemo(() => {
    return ["/", "/mypage"].includes(pathname);
  }, [pathname]);

  return (
    <div className={styles.container}>
      <div
        className={`${styles["content-container"]} ${
          hasHeader ? styles["with-header"] : ""
        }`}
      >
        <Outlet />
      </div>
      {hasHeader && <BottomNavigation />}
    </div>
  );
}
