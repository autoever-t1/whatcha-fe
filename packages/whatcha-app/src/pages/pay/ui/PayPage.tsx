import { MainHeader } from "@shared/main-header";
import styles from "./PayPage.module.css";
import { ContentBox } from "@shared/content-box";
import { CarInfo } from "./CarInfo";
import { BillContent } from "@shared/bill-content";
import { AgreementItem } from "@shared/agreement-item";
import { BottomButton } from "@shared/bottom-button";
import { PayModal } from "@widgets/pay-modal";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CouponModal } from "@widgets/coupon-modal";
import { getUsedCarDetail, UsedCarDetailDTO } from "@/entities/used-car";
import { useNavigate, useParams } from "react-router";
import { CouponDTO } from "@/entities/coupon";
import { createOrder, DepositDTO } from "@/features/order";

export function PayPage() {
  const navigate = useNavigate();

  const params = useParams();
  const usedCarId = useMemo(() => {
    return parseInt(params.carId!);
  }, [params]);

  const [car, setCar] = useState<UsedCarDetailDTO>();
  const [selectedCoupon, setSelectedCoupon] = useState<CouponDTO | null>(null);
  const [isPayModalOpen, setPayModalOpen] = useState(false);
  const [isCouponModalOpen, setCouponModalOpen] = useState(false);
  const [agreements, setAgreements] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const canNext = useMemo(() => {
    return agreements.every(Boolean);
  }, [agreements]);

  const getCar = useCallback(async () => {
    const response = await getUsedCarDetail(usedCarId);

    setCar(response);
  }, [usedCarId]);

  useEffect(() => {
    getCar();
  }, [getCar]);

  const handleClickBackButton = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleClickCouponButton = useCallback(() => {
    setCouponModalOpen(true);
  }, []);

  const handleClickCouponModalBack = useCallback(() => {
    setCouponModalOpen(false);
  }, []);

  const handleClickCouponItem = useCallback((coupon: CouponDTO) => {
    setSelectedCoupon(coupon);
    setCouponModalOpen(false);
  }, []);

  const handleClickPayButton = useCallback(() => {
    setPayModalOpen(true);
  }, []);

  const handleClickPayModalBack = useCallback(() => {
    setPayModalOpen(false);
  }, []);

  const handleClickAgree = useCallback((i: number) => {
    setAgreements((prev) => {
      const newArr = [...prev];
      newArr[i] = !newArr[i];
      return newArr;
    });
  }, []);

  const handleClickPay = useCallback(async () => {
    if (!car) return;
    const manageCost = 1000000;
    const deliveryCost = 300000;
    const transferCost = 30000;
    const registerCost = 2500000;

    const depositInfo: DepositDTO = {
      usedCarId,
      fullPayment:
        car.price + manageCost + deliveryCost + transferCost + registerCost,
      deposit: 300000,
      userCouponId: selectedCoupon ? selectedCoupon.userCouponId : null,
    };

    const response = await createOrder(depositInfo);

    navigate(`/order/${response.orderId}`);
  }, [car, selectedCoupon, navigate]);

  return (
    <div className={styles.container}>
      <MainHeader title="주문" onClickBack={handleClickBackButton} />
      <div className={styles.content}>
        <ContentBox title="주문자 정보" position="top">
          <div className="layout-line">
            <span className="font-r-sm color-gray-600">이름</span>
            <span className="font-r-sm color-gray-600">
              {sessionStorage.getItem("name")}
            </span>
          </div>
          <div className="layout-line">
            <span className="font-r-sm color-gray-600">이메일</span>
            <span className="font-r-sm color-gray-600">
              {sessionStorage.getItem("email")}
            </span>
          </div>
          <div className="layout-line">
            <span className="font-r-sm color-gray-600">휴대전화번호</span>
            <span className="font-r-sm color-gray-600">
              {sessionStorage.getItem("phone")}
            </span>
          </div>
        </ContentBox>
        {car && (
          <>
            <ContentBox title="차량 정보">
              <CarInfo car={car} />
              <p className="font-r-sm color-gray-600">
                부대비용이 포함되지 않은 차량 가격입니다.
              </p>
            </ContentBox>
            <ContentBox title="주문금액">
              <BillContent
                price={car.price}
                coupon={selectedCoupon}
                canUpdateCoupon
                onClickCouponButton={handleClickCouponButton}
              />
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
                checked={agreements[0]}
                onClick={() => {
                  handleClickAgree(0);
                }}
              />
              <AgreementItem
                label="[필수] 성능상태 점검기록부, 점검 리포트 확인"
                checked={agreements[1]}
                onClick={() => {
                  handleClickAgree(1);
                }}
              />
              <AgreementItem
                label="[필수] 계약조항 및 환불약관 내용 확인"
                checked={agreements[2]}
                onClick={() => {
                  handleClickAgree(2);
                }}
              />
              <AgreementItem
                label="[필수] 계약금 결제 전 중요 안내 사항 확인"
                checked={agreements[3]}
                onClick={() => {
                  handleClickAgree(3);
                }}
              />
              <AgreementItem
                label="[필수] 일괄서명 동의 안내"
                checked={agreements[4]}
                onClick={() => {
                  handleClickAgree(4);
                }}
              />
            </ContentBox>
          </>
        )}
      </div>
      <BottomButton onClick={handleClickPayButton} disabled={!canNext}>
        계약하기
      </BottomButton>

      {isPayModalOpen && (
        <PayModal
          title="계약금 결제"
          price={300000}
          onClickBack={handleClickPayModalBack}
          onClickNext={handleClickPay}
        />
      )}
      {isCouponModalOpen && (
        <CouponModal
          title="쿠폰함"
          onClickBack={handleClickCouponModalBack}
          onClickCoupon={handleClickCouponItem}
        />
      )}
    </div>
  );
}
