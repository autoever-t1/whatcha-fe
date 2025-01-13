import { SearchHeader } from "./SearchHeader";
import styles from "./SearchPage.module.css";
import { TabItem } from "./TabItem";

export function SearchPage() {
  return (
    <div className={styles.container}>
      <SearchHeader />
      <div className={styles.content}>
        <div className={styles["tab-list"]}>
          {[
            "차종",
            "모델",
            "가격",
            "주행거리",
            "연식",
            "연료",
            "색상 계열",
            "옵션",
          ].map((tab, i) => (
            <TabItem key={i}>{tab}</TabItem>
          ))}
        </div>
        <div className={styles["condition-box"]}></div>
      </div>
    </div>
  );
}
