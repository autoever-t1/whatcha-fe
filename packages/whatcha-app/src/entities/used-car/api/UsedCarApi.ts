import { authAxios, PageResponse } from "@/shared";
import { UsedCarListDto } from "../model/types";

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
