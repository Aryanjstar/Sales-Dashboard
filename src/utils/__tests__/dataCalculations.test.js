import { calculateKPIs, formatCurrency } from '../dataCalculations';

describe('Data Calculations Utilities', () => {
  const mockSalesData = {
    salesData: [
      {
        date: '2024-03-01',
        revenue: 15000,
      },
      {
        date: '2024-03-15',
        revenue: 10000,
      },
      {
        date: '2024-02-01',
        revenue: 20000,
      },
      {
        date: '2024-02-15',
        revenue: 5000,
      },
    ],
  };

  const mockMonthlyTargets = {
    March: 30000,
    February: 20000,
  };

  describe('calculateKPIs', () => {
    test('calculates total revenue correctly', () => {
      const result = calculateKPIs(mockSalesData, mockMonthlyTargets);
      expect(result.totalRevenue).toBe(50000);
    });

    test('calculates target achievement percentage correctly', () => {
      const result = calculateKPIs(mockSalesData, mockMonthlyTargets);
      // March sales: 25000, Target: 30000, Achievement: 83.3%
      expect(result.targetAchievement).toBeCloseTo(83.3, 1);
    });

    test('calculates revenue growth correctly', () => {
      const result = calculateKPIs(mockSalesData, mockMonthlyTargets);
      // March: 25000, February: 25000, Growth: 0%
      expect(result.revenueGrowth).toBe(0);
    });

    test('handles missing data gracefully', () => {
      const result = calculateKPIs({ salesData: [] }, {});
      expect(result.totalRevenue).toBe(0);
      expect(result.targetAchievement).toBe(0);
      expect(result.revenueGrowth).toBe(0);
    });
  });

  describe('formatCurrency', () => {
    test('formats positive numbers correctly', () => {
      expect(formatCurrency(1234)).toBe('$1,234');
      expect(formatCurrency(1234567)).toBe('$1,234,567');
    });

    test('formats zero correctly', () => {
      expect(formatCurrency(0)).toBe('$0');
    });

    test('handles null/undefined values', () => {
      expect(formatCurrency(null)).toBe('$0');
      expect(formatCurrency(undefined)).toBe('$0');
    });
  });
});
