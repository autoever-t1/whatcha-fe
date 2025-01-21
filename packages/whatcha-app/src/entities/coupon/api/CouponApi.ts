import { authAxios, PageResponse } from "@/shared";
import { CouponDTO, NewCouponResultDTO } from "../model/types";

export const getAllCoupon = async (page: number) => {
  const response = await authAxios.get<PageResponse<CouponDTO>>(
    `/api/coupon?page=${page}`
  );

  return response.data;
};

export const createCoupon = async (couponCode: string) => {
  const response = await authAxios.post<NewCouponResultDTO>(`/api/coupon`, {
    couponCode,
  });

  return response.data;
};

export const hasNewCoupon = async () => {
  const response = await authAxios.get<boolean>("api/coupon/roulette");

  return response.data;
};
