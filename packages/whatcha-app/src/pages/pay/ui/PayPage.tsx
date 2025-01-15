import { MainHeader } from "@shared/main-header";
import styles from "./PayPage.module.css";
import { ContentBox } from "@shared/content-box";
import { CarInfo } from "./CarInfo";
import SampleImg from "@assets/sample-image.png";
import { BillContent } from "@shared/bill-content";
import { AgreementItem } from "@shared/agreement-item";
import { BottomButton } from "@shared/bottom-button";
import { PayModal } from "@widgets/pay-modal";
import { useCallback, useState } from "react";

export function PayPage() {
  const [isPayModalOpen, setPayModalOpen] = useState(false);

  const handleClickPayButton = useCallback(() => {
    setPayModalOpen(true);
  }, []);

  const handleClickPayModalBack = useCallback(() => {
    setPayModalOpen(false);
  }, []);

  return (
    <div className={styles.container}>
      <MainHeader title="주문" />
      <div className={styles.content}>
        <ContentBox title="주문자 정보" position="top">
          <div className="layout-line">
            <span className="font-r-sm color-gray-600">이름</span>
            <span className="font-r-sm color-gray-600">김철수</span>
          </div>
          <div className="layout-line">
            <span className="font-r-sm color-gray-600">이메일</span>
            <span className="font-r-sm color-gray-600">abc1234@gmail.com</span>
          </div>
          <div className="layout-line">
            <span className="font-r-sm color-gray-600">휴대전화번호</span>
            <span className="font-r-sm color-gray-600">010-1234-1234</span>
          </div>
        </ContentBox>
        <ContentBox title="차량 정보">
          <CarInfo
            car={{
              img: SampleImg,
              model: "2022 하이브리드 그랜저 하이브리드 르블랑",
              date: "23년 11월",
              mileage: 3456,
              price: 3450,
            }}
          />
          <p className="font-r-sm color-gray-600">
            부대비용이 포함되지 않은 차량 가격입니다.
          </p>
        </ContentBox>
        <ContentBox title="주문금액">
          <BillContent price={30000000} canUpdateCoupon />
        </ContentBox>
        <div className={styles["payment-box"]}>
          <div className="layout-line">
            <span className="font-b-md">계약금액</span>
            <span className="font-r-md">300,000원</span>
          </div>
        </div>
        <ContentBox title="구매 필수 확인사항•동의">
          <p className="font-b-sm">
            구매 전 필수 사항을 모두 확인하고, 동의하셔야 계약이 진행됩니다.
          </p>
          <div className="div-line" />
          <AgreementItem
            label="[필수] 차량의 정보와 주문 및 고지사항 안내 확인"
            checked
            onClick={() => {}}
          />
          <AgreementItem
            label="[필수] 차량의 정보와 주문 및 고지사항 안내 확인"
            checked={false}
            onClick={() => {}}
          />
        </ContentBox>
      </div>
      <BottomButton onClick={handleClickPayButton}>계약하기</BottomButton>

      {isPayModalOpen && (
        <PayModal
          title="계약금 결제"
          price={300000}
          onClickBack={handleClickPayModalBack}
        />
      )}
    </div>
  );
}
