import { BadgeButton } from "@shared/badge-button";
import { ConditionItem } from "./ConditionItem";
import { SearchHeader } from "./SearchHeader";
import styles from "./SearchPage.module.css";
import { TabItem } from "./TabItem";
import { RangeInput } from "@shared/range-input";
import { ColorButton } from "@shared/color-button";
import { UIEventHandler, useCallback, useRef, useState } from "react";
import { BottomButton } from "@shared/bottom-button";

interface Color {
  color: string;
  label: string;
}

const colors: Color[] = [
  { color: "#ffffff", label: "화이트" },
  { color: "#f5f5dc", label: "베이지" },
  { color: "#c0c0c0", label: "실버" },
  { color: "#808080", label: "그레이" },
  { color: "#000000", label: "블랙" },
  { color: "#583927", label: "브라운" },
  { color: "#ff0000", label: "레드" },
  { color: "#ffa500", label: "오렌지" },
  { color: "#ffff00", label: "옐로우" },
  { color: "#0000ff", label: "블루" },
  { color: "#00ff00", label: "그린" },
  { color: "#800080", label: "퍼플" },
];

export function SearchPage() {
  const [currentTab, setCurrentTab] = useState(0);

  const conditionBoxRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(null | HTMLDivElement)[]>([]);

  const handleScrollConditionBox: UIEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const scrollTop = (e.target as HTMLDivElement).scrollTop + 40;

      for (let i = tabsRef.current.length - 1; i >= 0; i--) {
        const top = (tabsRef.current[i] as HTMLDivElement).offsetTop;

        if (scrollTop >= top) {
          setCurrentTab(i);
          return;
        }
      }
    },
    []
  );

  const handleClickTab = useCallback((tabIdx: number) => {
    conditionBoxRef.current!.scrollTo({
      top: tabsRef.current[tabIdx]!.offsetTop - 40,
      behavior: "smooth",
    });
  }, []);

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
            <TabItem
              key={i}
              selected={i === currentTab}
              onClick={() => handleClickTab(i)}
            >
              {tab}
            </TabItem>
          ))}
        </div>
        <div
          className={styles["condition-box"]}
          onScroll={handleScrollConditionBox}
          ref={conditionBoxRef}
        >
          <ConditionItem ref={(e) => (tabsRef.current[0] = e)} title="차종">
            <div className={styles.grid}>
              <BadgeButton>승용</BadgeButton>
              <BadgeButton>승용</BadgeButton>
              <BadgeButton>승용</BadgeButton>
              <BadgeButton>승용</BadgeButton>
              <BadgeButton>승용</BadgeButton>
              <BadgeButton selected>SUV</BadgeButton>
            </div>
          </ConditionItem>
          <ConditionItem ref={(e) => (tabsRef.current[1] = e)} title="모델">
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
          <ConditionItem ref={(e) => (tabsRef.current[2] = e)} title="가격">
            <RangeInput
              from={{ value: "1000", unit: "만원", suffix: "부터" }}
              to={{ value: "2000", unit: "만원", suffix: "까지" }}
            />
          </ConditionItem>
          <ConditionItem ref={(e) => (tabsRef.current[3] = e)} title="주행거리">
            <RangeInput
              from={{ value: "0", unit: "km", suffix: "부터" }}
              to={{ value: "12000", unit: "km", suffix: "까지" }}
            />
          </ConditionItem>
          <ConditionItem ref={(e) => (tabsRef.current[4] = e)} title="연식">
            <RangeInput
              from={{ value: "2024", unit: "년", suffix: "부터" }}
              to={{ value: "2025", unit: "년", suffix: "까지" }}
            />
          </ConditionItem>
          <ConditionItem ref={(e) => (tabsRef.current[5] = e)} title="연료">
            <div className={styles.grid}>
              <BadgeButton>가솔린</BadgeButton>
              <BadgeButton>디젤</BadgeButton>
              <BadgeButton>하이브리드</BadgeButton>
              <BadgeButton>전기</BadgeButton>
            </div>
          </ConditionItem>
          <ConditionItem
            ref={(e) => (tabsRef.current[6] = e)}
            title="색상 계열"
          >
            <div className={styles.grid}>
              {colors.map((color, i) => (
                <ColorButton color={color.color} label={color.label} key={i} />
              ))}
            </div>
          </ConditionItem>
          <ConditionItem
            ref={(e) => (tabsRef.current[7] = e)}
            title="옵션"
            last
          >
            <div className={styles.grid}>
              {Array.from({ length: 16 }).map((_, i) => (
                <BadgeButton key={i}>가죽시트</BadgeButton>
              ))}
            </div>
          </ConditionItem>
        </div>
      </div>
      <BottomButton>조건 검색</BottomButton>
    </div>
  );
}
