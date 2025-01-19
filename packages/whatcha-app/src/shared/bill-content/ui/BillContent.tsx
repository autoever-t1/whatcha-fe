import { InnerBox } from "@shared/inner-box";
import styles from "./BillContent.module.css";
import { CouponDTO } from "@/entities/coupon";
import { useMemo } from "react";

interface BillContentProps {
  price: number;
  coupon: CouponDTO | null;
  canUpdateCoupon: boolean;
  onClickCouponButton?: () => void;
}

const manageCost = 1000000;
const deliveryCost = 300000;
const transferCost = 30000;
const registerCost = 2500000;

export function BillContent({
  price,
  coupon,
  canUpdateCoupon,
  onClickCouponButton,
}: BillContentProps) {
  const discountAmount = useMemo(() => {
    if (coupon) {
      const a = coupon.maxDiscountAmount;
      const b = Math.round((coupon.discountPercentage! / 100) * price);

      return Math.min(a, b);
    } else return 0;
  }, [price, coupon]);

  const usedCouponName = useMemo(() => {
    return coupon ? coupon.couponName : "사용된 쿠폰이 없습니다.";
  }, [coupon]);

  return (
    <>
      <div className="layout-line">
        <span className="font-r-md color-gray-600">차량 주문금액</span>
        <span className="font-r-md color-gray-600">
          {(price + manageCost + deliveryCost + transferCost).toLocaleString()}
          원
        </span>
      </div>
      <InnerBox>
        <div className="layout-vertical">
          <div className="layout-line">
            <span className="font-r-sm color-gray-600">차량가격</span>
            <span className="font-r-sm color-gray-600">
              {price.toLocaleString()}원
            </span>
          </div>
          <div className="layout-line">
            <span className="font-r-sm color-gray-600">관리비용(매도비)</span>
            <span className="font-r-sm color-gray-600">
              {manageCost.toLocaleString()}원
            </span>
          </div>
          <div className="layout-line">
            <span className="font-r-sm color-gray-600">탁송료</span>
            <span className="font-r-sm color-gray-600">
              {deliveryCost.toLocaleString()}원
            </span>
          </div>
          <div className="layout-line">
            <span className="font-r-sm color-gray-600">이전대행수수료</span>
            <span className="font-r-sm color-gray-600">
              {transferCost.toLocaleString()}원
            </span>
          </div>
        </div>
      </InnerBox>
      <div className="layout-line">
        <div className={styles["coupon-title"]}>
          <span className="font-r-md color-gray-600">할인금액</span>
          {canUpdateCoupon && (
            <button className="font-r-xs" onClick={onClickCouponButton}>
              쿠폰 등록/수정
            </button>
          )}
        </div>
        <span className="font-r-md color-gray-600">
          {discountAmount.toLocaleString()}원
        </span>
      </div>
      <InnerBox>
        <div className="layout-vertical">
          <p className="font-b-sm">사용 쿠폰</p>
          <p className="font-r-sm color-gray-600">{usedCouponName}</p>
        </div>
      </InnerBox>
      <InnerBox>
        <div className="layout-vertical">
          <div className="layout-line">
            <span className="font-b-sm">총 차량 주문금액</span>
            <span className="font-b-sm">
              {(
                price +
                manageCost +
                deliveryCost +
                transferCost
              ).toLocaleString()}
              원
            </span>
          </div>
          <div className="layout-line">
            <span className="font-b-sm">이전등록비</span>
            <span className="font-b-sm">{registerCost.toLocaleString()}원</span>
          </div>
          <div className="layout-line">
            <span className="font-b-sm">할인금액</span>
            <span className="font-b-sm">
              -{discountAmount.toLocaleString()}원
            </span>
          </div>
          <div className="div-line-400" />
          <div className="layout-line color-primary">
            <span className="font-b-md">예상 총 주문금액</span>
            <span className="font-b-md">
              {(
                price +
                manageCost +
                deliveryCost +
                transferCost +
                registerCost -
                discountAmount
              ).toLocaleString()}
              원
            </span>
          </div>
        </div>
      </InnerBox>
      <p className="font-r-xs color-gray-600">
        탁송료는 서울특별시 강남구 기준으로 계산되며, 계약금 결제 후 지정된
        탁송지역으로 탁송료가 변경됩니다.
      </p>
      <p className="font-r-xs color-gray-600">
        승인 요청 중인 경우 쿠폰 적용은 가능하나 승인 완료 후 사용이 가능합니다.
      </p>
      <p className="font-r-xs color-gray-600">
        계약금은 총 주문금액에 포함되며 차량 주문 결제 시 제외됩니다.
      </p>
    </>
  );
}
