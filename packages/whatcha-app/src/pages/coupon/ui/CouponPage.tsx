import { ContentBox } from "@shared/content-box";
import styles from "./CouponPage.module.css";
import { MainButton } from "@shared/main-button";
import { MainHeader } from "@shared/main-header";
import { CouponItem } from "@shared/coupon-item";
import { useCallback } from "react";
import { useNavigate } from "react-router";

export function CouponPage() {
  const navigate = useNavigate();

  const handleClickBack = useCallback(() => {
    navigate("/mypage");
  }, [navigate]);

  return (
    <div className={styles.container}>
      <MainHeader title="쿠폰함" onClickBack={handleClickBack} />
      <div className={styles.content}>
        <ContentBox title="새 쿠폰 등록" position="top">
          <input className={`${styles["new-input"]} font-r-md`} />
          <div className={styles["button-wrapper"]}>
            <MainButton>쿠폰 등록</MainButton>
          </div>
        </ContentBox>
        <div className={styles["bottom-box"]}>
          <div className={`${styles["box-title"]} font-b-md`}>
            보유 중인 쿠폰
          </div>
          <CouponItem
            coupon={{
              couponName: "[신규 가입] 10% 할인 쿠폰",
              discountPercentage: 10,
              discountValue: null,
              maxDiscountAmount: 100000,
              expiryDate: "2025-01-31",
            }}
          />
          <CouponItem
            coupon={{
              couponName: "[신규 가입] 10% 할인 쿠폰",
              discountPercentage: null,
              discountValue: 300000,
              maxDiscountAmount: null,
              expiryDate: "2025-01-31",
            }}
          />
          <CouponItem
            coupon={{
              couponName: "[신규 가입] 10% 할인 쿠폰",
              discountPercentage: 10,
              discountValue: null,
              maxDiscountAmount: 100000,
              expiryDate: "2025-01-31",
            }}
          />
        </div>
      </div>
    </div>
  );
}
