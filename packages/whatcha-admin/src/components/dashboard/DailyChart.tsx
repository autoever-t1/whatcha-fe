import { useDailyStats } from '../../hooks/useDashboard';
import { format } from 'date-fns';
import { CircularProgress } from '@mui/material';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  
  // const data = {
  //   labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  //   datasets: [
  //     {
  //       label: '판매량',
  //       data: [65, 75, 85, 70, 95, 110, 120, 130, 95, 85, 90, 100],
  //       borderColor: 'rgb(75, 192, 192)',
  //       backgroundColor: 'rgba(75, 192, 192, 0.5)',
  //       tension: 0.3,
  //     }
  //   ],
  // };
  
  function DailyChart() {

    const { data: dailyStats, isLoading } = useDailyStats();

  const chartData = {
    labels: dailyStats?.statistics.map(stat => 
      format(new Date(stat.date), 'M/d')
    ) ?? [],
    datasets: [
      {
        label: '판매량',
        data: dailyStats?.statistics.map(stat => stat.count) ?? [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
      }
    ],
  };

  // if (isLoading) return <div>로딩중</div>; // 초기 상태 isloading일 때 로딩중 텍스트에서 리턴에서 
  //CircularProgress로 전환
    if (isLoading) { 
    return <div className="flex justify-center items-center h-[300px]">
      <CircularProgress />  
    </div>;
  }
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <Line options={options} data={chartData} />
      </div>
    );
  }
  
  export default DailyChart;