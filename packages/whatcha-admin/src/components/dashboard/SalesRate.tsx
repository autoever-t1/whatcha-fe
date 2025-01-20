import { useModelStats } from '../../hooks/useDashboard';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { CircularProgress } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        font: {
          size: 12
        }
      }
    }
  },
  responsive: true,
  maintainAspectRatio: false,
};

function SalesRate() {
  const { data: modelStats, isLoading } = useModelStats();

  if (isLoading) {
    return <div className="flex justify-center items-center h-[300px]">
      <CircularProgress />
    </div>;
  }

  const data = {
    labels: modelStats?.statistics.map(stat => stat.modelName) ?? [],
    datasets: [
      {
        data: modelStats?.statistics.map(stat => stat.orderCount) ?? [],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(239, 255, 4, 0.8)',
          'rgba(15, 34, 136, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(222, 65, 243, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(230, 159, 64, 0.8)',
          'rgba(100, 184, 281, 0.8)',
          'rgba(60, 213, 69, 0.8)',
          'rgba(227, 238, 69, 0.8)',
          'rgba(242, 39, 39, 0.8)'

        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(239, 255, 4, 1)',
          'rgba(15, 34, 136, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(222, 65, 243, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(230, 159, 64, 1)',
          'rgba(100, 184, 281, 1)',
          'rgba(60, 213, 69, 1)',
          'rgba(227, 238, 69, 1)',
          'rgba(242, 39, 39, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-[300px]">
      <Pie data={data} options={options} />
    </div>
  );
}

export default SalesRate;