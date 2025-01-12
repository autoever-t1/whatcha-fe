import { useLocation, useNavigate } from "react-router";
import styles from "./BottomNavigation.module.css";
import { useCallback } from "react";

export function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const onClickNavItem = useCallback(
    (url: string) => {
      navigate(url);
    },
    [navigate]
  );

  return (
    <div className={styles.container}>
      <button
        className={location.pathname === "/" ? styles.selected : ""}
        onClick={() => onClickNavItem("/")}
      >
        Home
      </button>
      <button
        className={location.pathname === "/search" ? styles.selected : ""}
        onClick={() => onClickNavItem("/search")}
      >
        Search
      </button>
      <button
        className={location.pathname === "/mypage" ? styles.selected : ""}
        onClick={() => onClickNavItem("/mypage")}
      >
        MyPage
      </button>
    </div>
  );
}
