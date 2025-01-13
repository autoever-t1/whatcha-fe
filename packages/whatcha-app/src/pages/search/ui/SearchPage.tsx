import { BadgeButton } from "@shared/badge-button";
import { ConditionItem } from "./ConditionItem";
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
        <div className={styles["condition-box"]}>
          <ConditionItem title="차종">
            <div className={styles.grid}>
              <BadgeButton>승용</BadgeButton>
              <BadgeButton>승용</BadgeButton>
              <BadgeButton>승용</BadgeButton>
              <BadgeButton>승용</BadgeButton>
              <BadgeButton>승용</BadgeButton>
              <BadgeButton selected>SUV</BadgeButton>
            </div>
          </ConditionItem>
          <ConditionItem title="모델">
            <div className={styles.grid}>
              <BadgeButton>아반떼</BadgeButton>
              <BadgeButton>쏘나타</BadgeButton>
              <BadgeButton>그랜저</BadgeButton>
              <BadgeButton>베뉴</BadgeButton>
              <BadgeButton>싼타페</BadgeButton>
              <BadgeButton selected>코나</BadgeButton>
              <BadgeButton>펠리세이드</BadgeButton>
              <BadgeButton>스타리아</BadgeButton>
            </div>
          </ConditionItem>
        </div>
      </div>
    </div>
  );
}
