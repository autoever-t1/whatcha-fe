import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AllCoupon, addCoupon, AddCouponRequest } from '../api/coupon';

export const useCoupons = (page: number = 0, pageSize: number = 20) => {
  return useQuery({
    queryKey: ['coupons', page, pageSize],
    queryFn: () => AllCoupon(page, pageSize),
  });
};

export const useAddCoupon = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: AddCouponRequest) => addCoupon(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
  });
};