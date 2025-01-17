export interface NewCouponResultDTO {
  couponName: string | null;
  discountPercentage: number | null;
  discountValue: number | null;
  maxDiscountAmount: number | null;
  expiryDate: string | null; // "2025-01-23"
  errorMessage: string | null;
}

export interface CouponDTO {
  couponName: string;
  discountPercentage: number | null;
  discountValue: number | null;
  maxDiscountAmount: number | null;
  expiryDate: string; // "2025-06-30"
}
