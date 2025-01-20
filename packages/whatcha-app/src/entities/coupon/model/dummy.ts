import { fillPageResponse, PageResponse } from "@/shared";
import { CouponDTO } from "./types";

export const getAllCoupon_: PageResponse<CouponDTO> = {
  content: Array.from({ length: 10 }, (_, i) => i).map((i) => ({
    userCouponId: i,
    couponName: "[신규가입] 10%할인 쿠폰" + i,
    discountPercentage: 10,
    discountValue: null,
    maxDiscountAmount: 100000,
    expiryDate: "2025-06-30",
  })),
  ...fillPageResponse(),
};
