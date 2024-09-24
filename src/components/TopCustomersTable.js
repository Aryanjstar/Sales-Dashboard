import React from 'react';
import { Users, Star } from 'lucide-react';
import salesData from '../data/salesData.json';

const TopCustomersTable = () => {
  const { customers } = salesData;

  // Sort customers by total revenue and take top 5
  const topCustomers = customers
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 5);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRankBadge = (index) => {
    if (index === 0)
      return <Star className="h-4 w-4 text-yellow-500 fill-current" />;
    return (
      <span className="text-sm font-semibold text-gray-500">#{index + 1}</span>
    );
  };

  const getIndustryColor = (industry) => {
    const colors = {
      'Fine Dining': 'bg-purple-100 text-purple-800',
      'Family Dining': 'bg-blue-100 text-blue-800',
      'Casual Dining': 'bg-green-100 text-green-800',
      'Fast Casual': 'bg-yellow-100 text-yellow-800',
      'BBQ & Grill': 'bg-red-100 text-red-800',
      'Cafe & Bistro': 'bg-pink-100 text-pink-800',
    };
    return colors[industry] || 'bg-gray-100 text-gray-800';
  };

  const getAverageOrderValue = (customer) => {
    return customer.totalRevenue / customer.totalOrders;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Top Customers</h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Industry
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orders
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {topCustomers.map((customer, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center w-8">
                    {getRankBadge(index)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {customer.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    Avg: {formatCurrency(getAverageOrderValue(customer))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getIndustryColor(customer.industry)}`}
                  >
                    {customer.industry}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm font-bold text-gray-900">
                    {formatCurrency(customer.totalRevenue)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm text-gray-900 font-medium">
                    {customer.totalOrders}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopCustomersTable;
