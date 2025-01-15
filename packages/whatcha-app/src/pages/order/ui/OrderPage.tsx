import { MainHeader } from "@shared/main-header";
import styles from "./OrderPage.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ContentBox } from "@shared/content-box";
import { BillContent } from "@shared/bill-content";
import { ProgressBar } from "./ProgressBar";
import { BottomButton } from "@shared/bottom-button";
import { PayModal } from "@widgets/pay-modal";
import { Contract } from "./Contract";

export function OrderPage() {
  const [progress, setProgress] = useState(2);
  const [isPayModalOpen, setPayModalOpen] = useState(false);

  useEffect(() => {
    // const timer = setInterval(() => {
    //   setProgress((p) => (p + 1) % 5);
    // }, 1000);
    // return () => {
    //   clearInterval(timer);
    // };
  }, []);

  const handleClickPayButton = useCallback(() => {
    if (progress === 1) {
      setPayModalOpen(true);
    }
  }, [progress]);

  const handleClickPayModalBackButton = useCallback(() => {
    setPayModalOpen(false);
  }, []);

  const title = useMemo(() => {
    if (progress === 1) return "주문금액";
    else if (progress === 2) return "";
    else return "";
  }, [progress]);

  const bottomButtonText = useMemo(() => {
    if (progress === 1) return "잔금 결제하기";
    else if (progress === 2) return "계약서 서명하기";
    else return "";
  }, [progress]);

  const handleClickBottomButton = useMemo(() => {
    if (progress === 1) {
      return handleClickPayButton;
    } else return () => {};
  }, [progress, handleClickPayButton]);

  return (
    <div className={styles.container}>
      <MainHeader title="주문 현황" />
      <div className={styles.content}>
        <ProgressBar progress={progress} />
        <ContentBox title={title} position="bottom">
          {progress === 1 ? (
            <BillContent price={30000000} canUpdateCoupon />
          ) : progress === 2 ? (
            <Contract
              contract={{
                name: "김철수",
                vhclRegNo: "123가4567",
                date: "2021년 4월",
                model: "그랜저 하이브리드 르블랑",
                price: 30000000,
              }}
            />
          ) : (
            <></>
          )}
        </ContentBox>
      </div>
      <BottomButton onClick={handleClickBottomButton}>
        {bottomButtonText}
      </BottomButton>

      {isPayModalOpen && (
        <PayModal
          title="잔금 결제"
          price={30000000}
          onClickBack={handleClickPayModalBackButton}
        />
      )}
    </div>
  );
}
