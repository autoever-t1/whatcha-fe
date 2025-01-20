import client from './client';

interface BranchStore {
  branchStoreId: number;
  branchStoreName: string;
  location: string;
  latitude: number;
  longitude: number;
  ownedCarCount: number;
  phone: string;
}

interface UsedCar {
  usedCarId: number;
  modelName: string;
  price: number;
  registrationDate: string;
  mileage: string;
  fuelType: string;
  engineCapacity: number;
  exteriorColor: string;
  interiorColor: string;
  modelType: string;
  passengerCapacity: number;
  driveType: string;
  vhclRegNo: string;
  years: string;
  transmission: string;
  status: string;
  goodsNo: string;
  mainImage: string;
}

// 차량 등록 API
export interface CarRegistrationData {
  driveType: string;
  engineCapacity: number;
  exteriorColor: string;
  fuelType: string;
  goodsNo: string;
  interiorColor: string;
  mainImage: string;
  mileage: string;
  modelName: string;
  modelType: string;
  passengerCapacity: number;
  price: number;
  registrationDate: string;
  transmission: string;
  vhclRegNo: string;
  years: string;
  model: {
    modelName: string;
    modelType: string;
    factoryPrice: number;
    orderCount: number;
  };
  option: {
    hasNavigation: boolean;
    hasHiPass: boolean;
    hasHeatedSteeringWheel: boolean;
    hasHeatedSeats: boolean;
    hasVentilatedSeats: boolean;
    hasPowerSeats: boolean;
    hasLeatherSeats: boolean;
    hasPowerTrunk: boolean;
    hasSunroof: boolean;
    hasHUD: boolean;
    hasSurroundViewMonitor: boolean;
    hasRearMonitor: boolean;
    hasBlindSpotWarning: boolean;
    hasLaneDepartureWarning: boolean;
    hasSmartCruiseControl: boolean;
    hasFrontParkingWarning: boolean;
  };
  branchStoreId: number;
  colorId: number;
}

// 지점 목록
export const getBranchStores = async (): Promise<BranchStore[]> => {
  const response = await client.get<BranchStore[]>('/admin/branch-store');
  return response.data;
};

// 해당 지점 중고차 매물 보여주기
export const getBranchStoreUsedCars = async (branchStoreId: number): Promise<UsedCar[]> => {
  const response = await client.get<UsedCar[]>(`/admin/branch-store/${branchStoreId}`);
  return response.data;
};

// 차량 등록
export const registerCar = async (data: CarRegistrationData) => {
  const response = await client.post('/admin/registerCar', data);
  return response.data;
};