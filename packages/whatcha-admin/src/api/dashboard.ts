import client from './client';

export interface DashboardStats {
  userCount: number;
  orderCount: number;
  totalSales: number | null;
  carStock: number;
}

export interface DailyStat {
  date: string;
  count: number;
}

interface DailyStatsResponse {
  statistics: DailyStat[];
}

interface ModelStat {
  modelName: string;
  orderCount: number;
}

interface ModelStatsResponse {
  statistics: ModelStat[];
}

// 차종별 판매 수
export const getModelStats = async (): Promise<ModelStatsResponse> => {
  const response = await client.get<ModelStatsResponse>('/admin/statistics/model');
  return response.data;
};

// 대시보드 통계 statCard
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await client.get<DashboardStats>('/admin/dashBoard');
  return response.data;
};

//일별 판매 현황황
export const getDailyStats = async (): Promise<DailyStatsResponse> => {
  const response = await client.get<DailyStatsResponse>('/admin/order/statistics/day');
  return response.data;
};