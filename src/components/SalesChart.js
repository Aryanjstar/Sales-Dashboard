import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import salesData from '../data/salesData.json';

const SalesChart = () => {
  // Process data for monthly sales vs target
  const processChartData = () => {
    const { salesData: sales, monthlyTargets } = salesData;

    const monthlyData = {};

    // Group sales by month
    sales.forEach((sale) => {
      const month = new Date(sale.date).toLocaleDateString('en-US', {
        month: 'long',
      });
      if (!monthlyData[month]) {
        monthlyData[month] = {
          month,
          actualSales: 0,
          target: monthlyTargets[month] || 0,
        };
      }
      monthlyData[month].actualSales += sale.revenue;
    });

    return Object.values(monthlyData);
  };

  const chartData = processChartData();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className={`text-sm`} style={{ color: entry.color }}>
              {`${entry.name}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#666" fontSize={12} />
          <YAxis stroke="#666" fontSize={12} tickFormatter={formatCurrency} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="actualSales"
            stroke="#2563eb"
            strokeWidth={3}
            name="Actual Sales"
            dot={{ fill: '#2563eb', strokeWidth: 2, r: 6 }}
            activeDot={{
              r: 8,
              stroke: '#2563eb',
              strokeWidth: 2,
              fill: '#fff',
            }}
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="#dc2626"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Target"
            dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
