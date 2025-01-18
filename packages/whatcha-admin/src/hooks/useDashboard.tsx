import { useQuery } from '@tanstack/react-query';
import { getDashboardStats, getDailyStats, getModelStats} from '../api/dashboard';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats,
  });
};

export const useDailyStats = () => {
  return useQuery({
    queryKey: ['dailyStats'],
    queryFn: getDailyStats,
  });
};

export const useModelStats = () => {
  return useQuery({
    queryKey: ['modelStats'],
    queryFn: getModelStats,
  });
};