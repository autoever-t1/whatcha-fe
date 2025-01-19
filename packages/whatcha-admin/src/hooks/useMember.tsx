import { useQuery } from '@tanstack/react-query';
import { getUserAgeStats, getUserGenderStats } from '../api/member';

// 나이 훅
export const useUserAgeStats = () => {
  return useQuery({
    queryKey: ['userAgeStats'],
    queryFn: getUserAgeStats,
  });
};


//성별 훅
export const useUserGenderStats = () => {
  return useQuery({
    queryKey: ['userGenderStats'],
    queryFn: getUserGenderStats,
  });
};