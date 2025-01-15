import { MainHeader } from "@shared/main-header";
import styles from "./AlarmPage.module.css";
import { useNavigate } from "react-router";
import { useCallback } from "react";
import { AlarmItem } from "./AlarmItem";

export function AlarmPage() {
  const navigate = useNavigate();

  const handleClickBackButton = useCallback(() => {
    navigate("/mypage");
  }, [navigate]);

  return (
    <div className={styles.container}>
      <MainHeader
        title="입고 알림 신청 내역"
        onClickBack={handleClickBackButton}
      />
      <div className={styles.content}>
        <AlarmItem
          alarm={{
            model: "쏘나타 하이브리드 르블랑",
            expireDate: "2025-01-15",
          }}
        />
      </div>
    </div>
  );
}
