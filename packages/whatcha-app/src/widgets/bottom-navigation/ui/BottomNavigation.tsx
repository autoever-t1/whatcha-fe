import { useLocation, useNavigate } from "react-router";
import styles from "./BottomNavigation.module.css";
import { useCallback } from "react";
import HomeIcon from "@common/assets/icons/home.svg";
import HomePrimaryIcon from "@common/assets/icons/home-primary.svg";
import SearchIcon from "@common/assets/icons/search.svg";
import SearchPrimaryIcon from "@common/assets/icons/search-primary.svg";
import AccountIcon from "@common/assets/icons/account.svg";
import AccountPrimaryIcon from "@common/assets/icons/account-primary.svg";

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
        className={`${
          location.pathname === "/" ? styles.selected : ""
        } font-r-sm`}
        onClick={() => onClickNavItem("/")}
      >
        <img
          src={location.pathname === "/" ? HomePrimaryIcon : HomeIcon}
          alt="Home"
        />
        홈
      </button>
      <button
        className={`${
          location.pathname === "/search" ? styles.selected : ""
        } font-r-sm`}
        onClick={() => onClickNavItem("/search")}
      >
        <img
          src={location.pathname === "/search" ? SearchPrimaryIcon : SearchIcon}
          alt="Search"
        />
        검색
      </button>
      <button
        className={`${
          location.pathname === "/mypage" ? styles.selected : ""
        } font-r-sm`}
        onClick={() => onClickNavItem("/mypage")}
      >
        <img
          src={
            location.pathname === "/mypage" ? AccountPrimaryIcon : AccountIcon
          }
          alt="MyPage"
        />
        마이페이지
      </button>
    </div>
  );
}
