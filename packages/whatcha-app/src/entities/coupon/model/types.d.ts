export interface NewCouponResultDTO {
  couponName: string | null;
  discountPercentage: number;
  maxDiscountAmount: number;
  expiryDate: string | null; // "2025-01-23"
  errorMessage: string | null;
}

export interface CouponDTO {
  userCouponId: number;
  couponName: string;
  discountPercentage: number;
  maxDiscountAmount: number;
  expiryDate: string; // "2025-06-30"
}
