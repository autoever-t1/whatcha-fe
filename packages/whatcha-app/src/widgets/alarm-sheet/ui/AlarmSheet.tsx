import { useCallback, useMemo, useState } from "react";
import styles from "./AlarmSheet.module.css";
import { MainButton } from "@/shared/main-button";

interface AlarmSheetProps {
  onClose: () => void;
  onCreateAlarm: (alertExpirationDate: string) => void;
}

export function AlarmSheet({ onClose, onCreateAlarm }: AlarmSheetProps) {
  const now = new Date();

  const [selectedPeriod, setSelectedPeriod] = useState<number>(0);

  const targetDate = useMemo(() => {
    const newDate = now;
    newDate.setDate(now.getDate() + selectedPeriod);

    return `${newDate.getFullYear()}년 ${
      newDate.getMonth() + 1
    }월 ${newDate.getDate()}일`;
  }, [now, selectedPeriod]);

  const expirationDate = useMemo(() => {
    const newDate = now;
    newDate.setDate(now.getDate() + selectedPeriod);

    return `${newDate.getFullYear()}-${
      newDate.getMonth() + 1 < 10
        ? `0${newDate.getMonth() + 1}`
        : newDate.getMonth() + 1
    }-${newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()}`;
  }, [now, selectedPeriod]);

  const handleClickPeriod = useCallback((period: number) => {
    setSelectedPeriod(period);
  }, []);

  return (
    <div className={styles.wrapper} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <p className="font-b-lg">입고 알림 신청</p>
        <div className={styles["button-box"]}>
          <button
            className={`${
              selectedPeriod === 7
                ? `${styles.selected} font-b-md`
                : "font-r-md"
            }`}
            onClick={() => handleClickPeriod(7)}
          >
            7일
          </button>
          <button
            className={`${
              selectedPeriod === 30
                ? `${styles.selected} font-b-md`
                : "font-r-md"
            }`}
            onClick={() => handleClickPeriod(30)}
          >
            30일
          </button>
          <button
            className={`${
              selectedPeriod === 90
                ? `${styles.selected} font-b-md`
                : "font-r-md"
            }`}
            onClick={() => handleClickPeriod(90)}
          >
            90일
          </button>
        </div>
        <div className={styles.until}>
          {selectedPeriod === 0 ? (
            <span className="font-b-md">입고 알림 기간을 선택해주세요</span>
          ) : (
            <>
              <span className="font-b-lg color-primary">{targetDate}</span>
              <br />
              <span className="font-b-md">까지 입고 알림을 받습니다</span>
            </>
          )}
        </div>
        <MainButton
          disabled={selectedPeriod === 0}
          onClick={() => onCreateAlarm(expirationDate)}
        >
          입고 알림 신청하기
        </MainButton>
      </div>
    </div>
  );
}
