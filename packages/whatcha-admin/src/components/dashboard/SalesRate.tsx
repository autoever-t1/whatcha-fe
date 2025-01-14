import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['G80', 'GV80', 'GV70', '그랜저', '팰리세이드', '기타'],
  datasets: [
    {
      data: [29, 15, 13, 13, 8, 22],
      backgroundColor: [
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
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
    }
  },
  responsive: true,
  maintainAspectRatio: false,
};

function PieChart() {
  return (
    <div className="w-full h-[300px]">
      <Pie data={data} options={options} />
    </div>
  );
}

export default PieChart;