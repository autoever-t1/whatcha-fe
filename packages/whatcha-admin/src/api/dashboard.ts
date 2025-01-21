import client from './client';

interface DashboardStats {
  userCount: number;
  orderCount: number;
  totalSales: number | null;
  carStock: number;
}

interface DailyStat {
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

export interface TradeHistory {
  goodsNo: string;
  modelName: string;
  years: string;
  price: number;
  modelType: string;
  status: string;
}

interface RatioResponse {
  date: string;
  userCount: number;
  orderCount: number;
  totalSales: number;
  carStock: number;
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

// 최근 거래 내역 조회
export const getTradeHistory = async (): Promise<TradeHistory[]> => {
  const response = await client.get<TradeHistory[]>('/admin/tradeHistory');
  return response.data;
};

// 전날 대비 오늘 거래 비율 퍼센트
export const getRatio = async (): Promise<RatioResponse[]> => {
  const response = await client.get<RatioResponse[]>('/admin/dashBoard/ratio');
  return response.data;
};