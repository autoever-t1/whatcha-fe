import { MainHeader } from "@shared/main-header";
import styles from "./OrderPage.module.css";
import { useCallback, useMemo, useState } from "react";
import { ContentBox } from "@shared/content-box";
import { BillContent } from "@shared/bill-content";
import { ProgressBar } from "./ProgressBar";
import { BottomButton } from "@shared/bottom-button";
import { PayModal } from "@widgets/pay-modal";
import { Contract } from "./Contract";
import { ReceiveMethod } from "./ReceiveMethod";
import { OrderResult } from "./OrderResult";
import { useNavigate } from "react-router";

export function OrderPage() {
  const navigate = useNavigate();

  const [progress, _] = useState(4);
  const [isPayModalOpen, setPayModalOpen] = useState(false);

  const handleClickBackButton = useCallback(() => {
    navigate("/mypage/orders");
  }, [navigate]);

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
    else if (progress === 3) return "수령 방법";
    else if (progress === 4) return "";
    else return "";
  }, [progress]);

  const bottomButtonText = useMemo(() => {
    if (progress === 1) return "잔금 결제하기";
    else if (progress === 2) return "계약서 서명하기";
    else if (progress === 3) return "수령 방법 선택하기";
    else return "";
  }, [progress]);

  const handleClickBottomButton = useMemo(() => {
    if (progress === 1) {
      return handleClickPayButton;
    } else return () => {};
  }, [progress, handleClickPayButton]);

  return (
    <div className={styles.container}>
      <MainHeader title="주문 현황" onClickBack={handleClickBackButton} />
      <div
        className={`${styles.content} ${
          progress === 4 ? styles["last-process"] : ""
        }`}
      >
        <ProgressBar progress={progress} />
        <div className="layout-vertical">
          <ContentBox title={title}>
            {progress === 1 ? (
              <BillContent price={30000000} canUpdateCoupon={false} />
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
            ) : progress === 3 ? (
              <ReceiveMethod />
            ) : progress === 4 ? (
              <OrderResult />
            ) : (
              <></>
            )}
          </ContentBox>
          {progress === 4 && (
            <>
              <ContentBox title="주문금액">
                <BillContent price={30000000} canUpdateCoupon={false} />
              </ContentBox>
              <ContentBox title="계약서">
                <Contract
                  contract={{
                    name: "김철수",
                    vhclRegNo: "123가4567",
                    date: "2021년 4월",
                    model: "그랜저 하이브리드 르블랑",
                    price: 30000000,
                  }}
                />
              </ContentBox>
            </>
          )}
        </div>
      </div>
      {progress < 4 && (
        <BottomButton onClick={handleClickBottomButton}>
          {bottomButtonText}
        </BottomButton>
      )}

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
