import { authAxios } from "@/shared";
import { CouponDTO, NewCouponResultDTO } from "../model/types";

export const getCoupons = async () => {
  const response = await authAxios.get<CouponDTO>(`/api/coupon`);

  return response.data;
};

export const createCoupon = async (couponCode: string) => {
  const response = await authAxios.post<NewCouponResultDTO>(
    `/api/coupon`,
    couponCode
  );

  return response.data;
};
