import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '../api/dashboard';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats,
  });
};