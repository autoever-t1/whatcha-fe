import { useQuery } from '@tanstack/react-query';
import { getBranchStores, getBranchStoreUsedCars } from '../api/carstock';

export const useBranchStores = () => {
  return useQuery({
    queryKey: ['branchStores'],
    queryFn: getBranchStores,
  });
};

export const useBranchStoreUsedCars = (branchStoreId: number) => {
  return useQuery({
    queryKey: ['branchStoreUsedCars', branchStoreId],
    queryFn: () => getBranchStoreUsedCars(branchStoreId),
    enabled: !!branchStoreId,
  });
};