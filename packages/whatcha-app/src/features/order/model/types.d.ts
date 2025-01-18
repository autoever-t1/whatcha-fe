export interface DepositDTO {
  usedCarId: number;
  fullPayment: number;
  deposit: number;
  userCouponId: number | null;
}

export interface CreateOrderResultDTO {
  orderId: number;
}
