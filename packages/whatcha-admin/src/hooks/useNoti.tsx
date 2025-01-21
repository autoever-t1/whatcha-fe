import { useEffect, useState } from 'react';
import { useTradeHistory } from './useDashboard';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { TradeHistory, getTradeHistory } from '../api/dashboard'; // getTradeHistory 추가

export const useTradeNoti = () => {
  const isAuthenticated = Boolean(sessionStorage.getItem("at"));
  const { data: currentTrades = [] } = useTradeHistory();
  const [prevTrades, setPrevTrades] = useState<TradeHistory[]>([]);

  useQuery({
    queryKey: ['tradeHistory'],
    queryFn: getTradeHistory,
    refetchInterval: 20000,
    refetchIntervalInBackground: true,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!isAuthenticated || !currentTrades.length) return;

    // 이전에 없던 새로운 거래들 찾기
    const newTrades = currentTrades.filter(
      current => !prevTrades.some(prev => prev.goodsNo === current.goodsNo)
    );

    // 새로운 거래가 있고 이전 거래 목록이 있을 때만 알림
    if (newTrades.length > 0 && prevTrades.length > 0) {
      const latestTrade = newTrades[0]; // 가장 최근 거래
      toast.info(
        <div>
          <p className="font-bold">새로운 거래가 등록되었습니다</p>
          <p>{latestTrade.modelName}</p>
          <p>{latestTrade.price.toLocaleString()}원</p>
        </div>
      );
    }

    setPrevTrades(currentTrades);
  }, [currentTrades, isAuthenticated]);
};