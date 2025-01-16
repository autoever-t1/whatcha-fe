import { MainHeader } from "@shared/main-header";
import styles from "./FavoritePage.module.css";
import { ContentBox } from "@shared/content-box";
import { BadgeButton } from "@shared/badge-button";
import { RangeInput } from "@shared/range-input";
import { useCallback } from "react";
import { useNavigate } from "react-router";

const models: string[] = [
  "아반떼",
  "소나타",
  "그랜저",
  "베뉴",
  "싼타페",
  "코나",
  "펠리세이드",
  "스타리아",
];

export function FavoritePage() {
  const navigate = useNavigate();

  const handleClickBack = useCallback(() => {
    navigate("/mypage");
  }, [navigate]);

  return (
    <div className={styles.container}>
      <MainHeader title="선호 매물 수정" onClickBack={handleClickBack} />
      <div className={styles.content}>
        <ContentBox title="모델 (0/3)" position="top">
          <div className={styles.grid}>
            {models.map((model, i) => (
              <BadgeButton key={i}>{model}</BadgeButton>
            ))}
          </div>
        </ContentBox>
        <ContentBox title="예산">
          <RangeInput
            from={{
              value: "1000",
              onChange: () => {},
              unit: "만원",
              suffix: "부터",
            }}
            to={{
              value: "2000",
              onChange: () => {},
              unit: "만원",
              suffix: "까지",
            }}
          />
        </ContentBox>
      </div>
    </div>
  );
}
