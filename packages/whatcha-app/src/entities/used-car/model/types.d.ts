export interface UsedCarListDto {
  usedCarId: number;
  modelName: string;
  price: number;
  registrationDate: string;
  mileage: string;
  modelType: string;
  vhclRegNo: string;
  years: number;
  status: string;
  goodsNo: string;
  mainImage: string;
  likeCount: number;
}

export interface UsedCarSmallListDto {
  usedCarId: number;
  thumbnailUrl: string;
  modelName: string;
  registrationDate: string;
  mileage: number;
  vhclRegNo: string;
  price: number;
}

export interface Option {
  optionId: number;
  optionName: string;
  label: string;
}
