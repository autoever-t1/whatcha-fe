import { BaseModal } from "@shared/base-modal";
import styles from "./CouponModal.module.css";
import { useCallback, useEffect, useState } from "react";
import { CouponItem } from "@shared/coupon-item";

interface Coupon {
  couponId: number;
  couponName: string;
  discountPercentage: number | null;
  discountValue: number | null;
  maxDiscountAmount: number | null;
  expiryDate: string;
}

interface CouponModalProps {
  onClickCoupon: (couponId: number) => void;
  title: string;
  onClickBack: () => void;
}

export function CouponModal({
  onClickCoupon,
  title,
  onClickBack,
}: CouponModalProps) {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const getCoupons = useCallback(async () => {
    setCoupons([
      {
        couponId: 1,
        couponName: "신규 가입 축하 쿠폰",
        discountPercentage: 10,
        discountValue: null,
        maxDiscountAmount: 100000,
        expiryDate: "2025-01-16",
      },
      {
        couponId: 2,
        couponName: "신규 가입 축하 쿠폰",
        discountPercentage: 10,
        discountValue: null,
        maxDiscountAmount: 100000,
        expiryDate: "2025-01-16",
      },
      {
        couponId: 3,
        couponName: "신규 가입 축하 쿠폰",
        discountPercentage: 10,
        discountValue: null,
        maxDiscountAmount: 100000,
        expiryDate: "2025-01-16",
      },
      {
        couponId: 4,
        couponName: "신규 가입 축하 쿠폰",
        discountPercentage: 10,
        discountValue: null,
        maxDiscountAmount: 100000,
        expiryDate: "2025-01-16",
      },
      {
        couponId: 5,
        couponName: "신규 가입 축하 쿠폰",
        discountPercentage: 10,
        discountValue: null,
        maxDiscountAmount: 100000,
        expiryDate: "2025-01-16",
      },
      {
        couponId: 6,
        couponName: "신규 가입 축하 쿠폰",
        discountPercentage: 10,
        discountValue: null,
        maxDiscountAmount: 100000,
        expiryDate: "2025-01-16",
      },
      {
        couponId: 7,
        couponName: "신규 가입 축하 쿠폰",
        discountPercentage: 10,
        discountValue: null,
        maxDiscountAmount: 100000,
        expiryDate: "2025-01-16",
      },
      {
        couponId: 8,
        couponName: "신규 가입 축하 쿠폰",
        discountPercentage: 10,
        discountValue: null,
        maxDiscountAmount: 100000,
        expiryDate: "2025-01-16",
      },
      {
        couponId: 9,
        couponName: "신규 가입 축하 쿠폰",
        discountPercentage: 10,
        discountValue: null,
        maxDiscountAmount: 100000,
        expiryDate: "2025-01-16",
      },
    ]);
  }, []);

  useEffect(() => {
    getCoupons();
  }, [getCoupons]);

  return (
    <BaseModal title={title} onClickBack={onClickBack}>
      <div className={styles.content}>
        {coupons.map((coupon, i) => (
          <CouponItem
            key={i}
            coupon={coupon}
            onClick={() => onClickCoupon(coupon.couponId)}
          />
        ))}
      </div>
    </BaseModal>
  );
}
