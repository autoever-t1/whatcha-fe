import { authAxios, PageResponse } from "@/shared";
import { CouponDTO, NewCouponResultDTO } from "../model/types";
import { getAllCoupon_ } from "../model/dummy";

export const getAllCoupon = async () => {
  try {
    const response = await authAxios.get<PageResponse<CouponDTO>>(
      `/api/coupon`
    );

    return response.data;
  } catch {
    return getAllCoupon_;
  }
};

export const createCoupon = async (couponCode: string) => {
  const response = await authAxios.post<NewCouponResultDTO>(`/api/coupon`, {
    couponCode,
  });

  return response.data;
};
