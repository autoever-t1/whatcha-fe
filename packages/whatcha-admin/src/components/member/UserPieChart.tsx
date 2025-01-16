import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface UserPieChartProps {
  labels: string[];
  data: number[];
  title?: string;
  colors?: {
    background: string[];
    border: string[];
  };
}

const defaultColors = {
  background: [
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 99, 132, 0.8)', 
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
  ],
  border: [
    'rgba(54, 162, 235, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(255, 206, 86, 1)', 
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ]
};

function UserPieChart({ 
  labels, 
  data, 
  title,
  colors = defaultColors 
}: UserPieChartProps) {

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors.background,
        borderColor: colors.border,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 12
          }
        }
      },
      title: {
        display: !!title,
        text: title,
        font: {
          size: 16
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-[300px]">
      <Pie data={chartData} options={options} />
    </div>
  );
}

export default UserPieChart;