import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { useProgressStore } from '../../stores/progressStore';
import { format, subDays } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ProgressChart() {
  const activities = useProgressStore((state) => state.activities);

  // Prepare data for the last 7 days
  const labels = Array.from({ length: 7 }, (_, i) => {
    return format(subDays(new Date(), i), 'MMM d');
  }).reverse();

  const data = {
    labels,
    datasets: [
      {
        label: 'Meditation Minutes',
        data: labels.map((date) => {
          return activities
            .filter(
              (a) =>
                a.type === 'meditation' &&
                format(new Date(a.completedAt), 'MMM d') === date
            )
            .reduce((acc, curr) => acc + curr.duration, 0);
        }),
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Your Meditation Progress',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Minutes',
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <Line data={data} options={options} />
    </div>
  );
}