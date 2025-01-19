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

export const getBranchStores = async (): Promise<BranchStore[]> => {
  const response = await client.get<BranchStore[]>('/admin/branch-store');
  return response.data;
};

export const getBranchStoreUsedCars = async (branchStoreId: number): Promise<UsedCar[]> => {
  const response = await client.get<UsedCar[]>(`/admin/branch-store/${branchStoreId}`);
  return response.data;
};