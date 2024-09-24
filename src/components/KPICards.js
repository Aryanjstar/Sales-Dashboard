import React from 'react';
import { TrendingUp, Target, DollarSign } from 'lucide-react';
import salesData from '../data/salesData.json';

const KPICards = () => {
  // Calculate KPIs
  const calculateKPIs = () => {
    const { salesData: sales, monthlyTargets } = salesData;

    // Total Revenue
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.revenue, 0);

    // Current month target (March)
    const currentMonthTarget = monthlyTargets.March;

    // Current month sales (March)
    const currentMonthSales = sales
      .filter((sale) => sale.date.startsWith('2024-03'))
      .reduce((sum, sale) => sum + sale.revenue, 0);

    // Target Achievement %
    const targetAchievement = (
      (currentMonthSales / currentMonthTarget) *
      100
    ).toFixed(1);

    // Revenue Growth % (March vs February)
    const februarySales = sales
      .filter((sale) => sale.date.startsWith('2024-02'))
      .reduce((sum, sale) => sum + sale.revenue, 0);

    const revenueGrowth = (
      ((currentMonthSales - februarySales) / februarySales) *
      100
    ).toFixed(1);

    return {
      totalRevenue,
      targetAchievement,
      revenueGrowth,
      currentMonthSales,
      currentMonthTarget,
    };
  };

  const kpis = calculateKPIs();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(kpis.totalRevenue),
      subtitle: 'All time',
      icon: DollarSign,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: '+12.5%',
    },
    {
      title: 'Target Achievement',
      value: `${kpis.targetAchievement}%`,
      subtitle: `${formatCurrency(kpis.currentMonthSales)} / ${formatCurrency(kpis.currentMonthTarget)}`,
      icon: Target,
      color:
        kpis.targetAchievement >= 100
          ? 'bg-green-500'
          : kpis.targetAchievement >= 80
            ? 'bg-yellow-500'
            : 'bg-red-500',
      textColor:
        kpis.targetAchievement >= 100
          ? 'text-green-600'
          : kpis.targetAchievement >= 80
            ? 'text-yellow-600'
            : 'text-red-600',
      bgColor:
        kpis.targetAchievement >= 100
          ? 'bg-green-50'
          : kpis.targetAchievement >= 80
            ? 'bg-yellow-50'
            : 'bg-red-50',
    },
    {
      title: 'Revenue Growth',
      value: `${kpis.revenueGrowth}%`,
      subtitle: 'Month over month',
      icon: TrendingUp,
      color: kpis.revenueGrowth >= 0 ? 'bg-emerald-500' : 'bg-red-500',
      textColor: kpis.revenueGrowth >= 0 ? 'text-emerald-600' : 'text-red-600',
      bgColor: kpis.revenueGrowth >= 0 ? 'bg-emerald-50' : 'bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {kpiCards.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div
            key={index}
            className={`${kpi.bgColor} rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {kpi.title}
                </p>
                <p className={`text-3xl font-bold ${kpi.textColor} mb-1`}>
                  {kpi.value}
                </p>
                <p className="text-xs text-gray-500">{kpi.subtitle}</p>
              </div>
              <div className={`${kpi.color} p-3 rounded-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KPICards;
