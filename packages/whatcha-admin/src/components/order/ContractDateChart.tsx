import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { useDailyStats } from '../../hooks/useDashboard';
import { format } from 'date-fns';
import { CircularProgress } from '@mui/material';

const ContractDateChart = () => {
  const { data: dailyStats, isLoading } = useDailyStats();

  const chartData = {
    labels: dailyStats?.statistics.map(stat => 
      format(new Date(stat.date), 'M/d')
    ) ?? [],
    datasets: [
      {
        label: '계약 건수',
        data: dailyStats?.statistics.map(stat => stat.count) ?? [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        // borderWidth: 0,
        barThickness: 30, // 막대 두께 설정
      },
    ],
  };

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
    maintainAspectRatio: false,
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default ContractDateChart;