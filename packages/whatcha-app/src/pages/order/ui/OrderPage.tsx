import { MainHeader } from "@shared/main-header";
import styles from "./OrderPage.module.css";
import { useCallback, useEffect, useState } from "react";
import { ContentBox } from "@shared/content-box";
import { BillContent } from "@shared/bill-content";
import { ProgressBar } from "./ProgressBar";
import { BottomButton } from "@shared/bottom-button";

export function OrderPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => (p + 1) % 5);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={styles.container}>
      <MainHeader title="주문 현황" />
      <div className={styles.content}>
        <ProgressBar progress={progress} />
        <ContentBox title="주문금액" position="bottom">
          <BillContent price={30000000} />
        </ContentBox>
      </div>
      <BottomButton>잔금 결제하기</BottomButton>
    </div>
  );
}
