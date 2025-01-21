// import { useEffect, useState } from 'react';
// import { useTradeHistory } from './useDashboard';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export const useTradeNoti = () => {
//   const { data: currentTrades = [] } = useTradeHistory();
//   const [prevLength, setPrevLength] = useState(0);

//   export const useTradeNoti = () => {
//     const { data: currentTrades = [] } = useTradeHistory();
//     const [prevLength, setPrevLength] = useState(0);
  
//     useQuery({
//       queryKey: ['tradeHistory'],
//       queryFn: getTradeHistory,
//       refetchInterval: 10000,
//       refetchIntervalInBackground: true,
//     });
  
//     useEffect(() => {
//       if (currentTrades.length > 0) {
//         if (currentTrades.length > prevLength && prevLength > 0) {
//           const newTrade = currentTrades[0];
//           toast.info(
//             <div>
//               <p className="font-bold">새로운 거래가 등록되었습니다</p>
//               <p>{newTrade.modelName}</p>
//               <p>{newTrade.price.toLocaleString()}원</p>
//             </div>
//           );
//         }
//         setPrevLength(currentTrades.length);
//       }
//     }, [currentTrades]);
//   };