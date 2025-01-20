import { authAxios, PageResponse } from "@/shared";
import {
  ImageDTO,
  UsedCarDetailDTO,
  UsedCarListDto,
  UsedCarPayDTO,
  UsedCarSmallListDto,
} from "../model/types";

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
    `/api/interest/liked-cars/most-liked`
  );

  return response.data;
};

export const getUsedCarDetail = async (usedCarId: number) => {
  const response = await authAxios.get<UsedCarDetailDTO>(
    `/api/used-car/detail/${usedCarId}`
  );

  return response.data;
};

export const getUsedCarPay = async (usedCarId: number) => {
  const response = await authAxios.get<UsedCarPayDTO>(
    `/api/used-car/order/${usedCarId}`
  );

  return response.data;
};

export const likeUsedCar = async (usedCarId: number) => {
  const response = await authAxios.post<boolean>(
    `api/interest/liked-cars/${usedCarId}`
  );

  return response.data;
};

export const getLikedCar = async (page: number) => {
  const response = await authAxios.get<PageResponse<UsedCarListDto>>(
    `api/interest/liked-cars?page=${page}`
  );

  return response.data;
};

export const getImages = async (usedCarId: number) => {
  const response = await authAxios.get<ImageDTO[]>(
    `api/used-car/image/${usedCarId}`
  );

  return response.data;
};
