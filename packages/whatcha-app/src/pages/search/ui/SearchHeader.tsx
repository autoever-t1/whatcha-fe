import styles from "./SearchHeader.module.css";
import ArrowBackIcon from "@common/assets/icons/arrow-back.svg";
import SearchIcon from "@common/assets/icons/search.svg";

export function SearchHeader() {
  return (
    <div className={styles.container}>
      <button className={styles["icon-button"]}>
        <img src={ArrowBackIcon} alt="Back" />
      </button>
      <input
        type="text"
        placeholder="모델명, 차량번호로 검색해보세요."
        className={`${styles["search-input"]} font-r-sm`}
      />
      <button className={styles["icon-button"]}>
        <img src={SearchIcon} alt="Search" />
      </button>
    </div>
  );
}
