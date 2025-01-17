export interface UsedCar {
  usedCarId: number;
  modelName: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  exteriorColor: string;
}

export interface Option {
  optionId: number;
  optionName: string;
  label: string;
}
