import { useMemo } from "react";
import styles from "./CouponItem.module.css";

interface Coupon {
  couponName: string;
  discountPercentage: number | null;
  discountValue: number | null;
  maxDiscountAmount: number | null;
  expiryDate: string;
}

interface CouponItemProps {
  coupon: Coupon;
}

export function CouponItem({ coupon }: CouponItemProps) {
  const {
    couponName,
    discountPercentage,
    discountValue,
    maxDiscountAmount,
    expiryDate,
  } = coupon;

  const discountMessage = useMemo(() => {
    return discountPercentage !== null
      ? `${discountPercentage}%`
      : `${discountValue}원`;
  }, [discountPercentage, discountValue]);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <p className="font-b-sm">{couponName}</p>
        <p className="font-b-lg color-primary">{discountMessage}</p>
        {maxDiscountAmount && (
          <p className="font-r-sm color-gray-400">
            최대 {maxDiscountAmount.toLocaleString()}원 할인
          </p>
        )}
        <p className="font-r-sm color-gray-400">{expiryDate} 까지</p>
      </div>
      <div className={styles.deco} />
    </div>
  );
}
