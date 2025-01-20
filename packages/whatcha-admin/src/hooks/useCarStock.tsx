import { useQuery } from '@tanstack/react-query';
import { getBranchStores, getBranchStoreUsedCars, CarRegistrationData ,registerCar } from '../api/carstock';
import { useMutation, useQueryClient } from '@tanstack/react-query';

//지점 훅
export const useBranchStores = () => {
  return useQuery({
    queryKey: ['branchStores'],
    queryFn: getBranchStores,
  });
};


// 지점 중고차 목록 훅
export const useBranchStoreUsedCars = (branchStoreId: number) => {
  return useQuery({
    queryKey: ['branchStoreUsedCars', branchStoreId],
    queryFn: () => getBranchStoreUsedCars(branchStoreId),
    enabled: !!branchStoreId,
  });
};

export const useRegisterCar = (branchStoreId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CarRegistrationData) => registerCar(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['branchStoreUsedCars', branchStoreId]
      });
    }
  });
};