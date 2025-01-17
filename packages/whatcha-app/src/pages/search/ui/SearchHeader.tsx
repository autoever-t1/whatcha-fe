import styles from "./SearchHeader.module.css";
import ArrowBackIcon from "@common/assets/icons/arrow-back.svg";
import SearchIcon from "@common/assets/icons/search.svg";
import { useCallback } from "react";
import { useNavigate } from "react-router";

interface SearchHeaderProps {
  onClickSearch: () => void;
  keyword: string;
  onChangeKeyword: (value: string) => void;
}

export function SearchHeader({
  onClickSearch,
  keyword,
  onChangeKeyword,
}: SearchHeaderProps) {
  const navigate = useNavigate();

  const handleClickBackButton = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <button className={styles["icon-button"]} onClick={handleClickBackButton}>
        <img src={ArrowBackIcon} alt="Back" />
      </button>
      <input
        type="text"
        placeholder="모델명, 차량번호로 검색해보세요."
        className={`${styles["search-input"]} font-r-sm`}
        value={keyword}
        onChange={(e) => onChangeKeyword(e.target.value)}
      />
      <button className={styles["icon-button"]} onClick={onClickSearch}>
        <img src={SearchIcon} alt="Search" />
      </button>
    </div>
  );
}
