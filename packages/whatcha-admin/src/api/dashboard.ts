import client from './client';

export interface DashboardStats {
  userCount: number;
  orderCount: number;
  totalSales: number | null;
  carStock: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await client.get<DashboardStats>('/admin/dashBoard');
  return response.data;
};