// Utility functions for data calculations
export const calculateKPIs = (salesData, monthlyTargets) => {
  try {
    const { salesData: sales } = salesData;

    // Total Revenue
    const totalRevenue = sales.reduce(
      (sum, sale) => sum + (sale.revenue || 0),
      0
    );

    // Current month target (March)
    const currentMonthTarget = monthlyTargets.March || 0;

    // Current month sales (March)
    const currentMonthSales = sales
      .filter((sale) => sale.date && sale.date.startsWith('2024-03'))
      .reduce((sum, sale) => sum + (sale.revenue || 0), 0);

    // Target Achievement %
    const targetAchievement =
      currentMonthTarget > 0
        ? ((currentMonthSales / currentMonthTarget) * 100).toFixed(1)
        : '0.0';

    // Revenue Growth % (March vs February)
    const februarySales = sales
      .filter((sale) => sale.date && sale.date.startsWith('2024-02'))
      .reduce((sum, sale) => sum + (sale.revenue || 0), 0);

    const revenueGrowth =
      februarySales > 0
        ? (((currentMonthSales - februarySales) / februarySales) * 100).toFixed(
            1
          )
        : '0.0';

    return {
      totalRevenue,
      targetAchievement: parseFloat(targetAchievement),
      revenueGrowth: parseFloat(revenueGrowth),
      currentMonthSales,
      currentMonthTarget,
    };
  } catch (error) {
    console.error('Error calculating KPIs:', error);
    return {
      totalRevenue: 0,
      targetAchievement: 0,
      revenueGrowth: 0,
      currentMonthSales: 0,
      currentMonthTarget: 0,
    };
  }
};

export const formatCurrency = (amount) => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return '$0';
  }
};
