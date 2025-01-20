import { useMemo } from "react";
import styles from "./CouponItem.module.css";
import { CouponDTO } from "@/entities/coupon";

interface CouponItemProps {
  coupon: CouponDTO;
  onClick?: () => void;
}

export function CouponItem({ coupon, onClick }: CouponItemProps) {
  const { couponName, discountPercentage, maxDiscountAmount, expiryDate } =
    coupon;

  const discountMessage = useMemo(() => {
    return `${discountPercentage}%`;
  }, [discountPercentage]);

  return (
    <div className={styles.container} onClick={onClick}>
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
