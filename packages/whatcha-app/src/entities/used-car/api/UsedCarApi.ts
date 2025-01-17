import { authAxios, PageResponse } from "@/shared";
import { UsedCarListDto, UsedCarSmallListDto } from "../model/types";

export const getUsedCarByKeyword = async (
  keyword: string,
  page: number
): Promise<PageResponse<UsedCarListDto>> => {
  const response = await authAxios.get<PageResponse<UsedCarListDto>>(
    `/api/used-car/search?keyword=${keyword}&page=${page}`
  );

  return response.data;
};

export const getUsedCarByConditions = async (queries: string, page: number) => {
  const response = await authAxios.get<PageResponse<UsedCarListDto>>(
    `/api/used-car/filter?${queries}&page=${page}`
  );

  return response.data;
};

export const getRecommemdationsApi = async () => {
  const response = await authAxios.get<UsedCarSmallListDto[]>(
    `/api/interest/recommended-cars`
  );

  return response.data;
};

export const getTop5Api = async () => {
  const response = await authAxios.get<UsedCarSmallListDto[]>(
    `/api/interest/liked-car/most-liked`
  );

  return response.data;
};
