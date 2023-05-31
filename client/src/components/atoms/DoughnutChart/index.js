import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const DoughnutChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = null;

    const renderChart = () => {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstance) {
        chartInstance.destroy(); // Destroy the previous chart instance
      }

      chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
          // Configure chart options here
        },
      });
    };

    renderChart();

    return () => {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the chart instance on component unmount
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default DoughnutChart;