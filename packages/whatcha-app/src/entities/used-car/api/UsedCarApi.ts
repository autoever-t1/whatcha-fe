import { authAxios, PageResponse_ } from "@/shared";
import { UsedCar } from "../model/types";

export const getUsedCarByKeyword = async (
  keyword: string,
  page: number
): Promise<PageResponse_<UsedCar>> => {
  // const response = await authAxios.get<PageResponse<UsedCar>>(
  //   `/api/used-car/search?keyword=${keyword}`
  // );

  // return response.data;

  console.log(
    `getUsedCarByKeyword: /api/used-car/search?keyword=${keyword}&page=${page}`
  );

  const data: UsedCar[] = [
    {
      usedCarId: 0,
      modelName: "그랜저 하이브리드 르블랑",
      year: 2024,
      price: 30000000,
      mileage: 12000,
      fuelType: "가솔린",
      exteriorColor: "화이트",
    },
    {
      usedCarId: 1,
      modelName: "그랜저 하이브리드 르블랑",
      year: 2024,
      price: 30000000,
      mileage: 12000,
      fuelType: "가솔린",
      exteriorColor: "화이트",
    },
    {
      usedCarId: 2,
      modelName: "그랜저 하이브리드 르블랑",
      year: 2024,
      price: 30000000,
      mileage: 12000,
      fuelType: "가솔린",
      exteriorColor: "화이트",
    },
  ];

  const response: PageResponse_<UsedCar> = {
    total: 30,
    page,
    size: 10,
    data,
  };

  return response;
};

export const getUsedCarByConditions = async (queries: string, page: number) => {
  // const response = await authAxios.get<PageResponse_<UsedCar>>(
  //   `/api/used-car?${queries}&page=${page}`
  // );

  // return response.data;

  console.log(`/api/used-car?${queries}&page=${page}`);
};
