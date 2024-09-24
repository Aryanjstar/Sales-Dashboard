import React from 'react';
import KPICards from './KPICards';
import SalesChart from './SalesChart';
import ProductChart from './ProductChart';
import TopProductsTable from './TopProductsTable';
import TopCustomersTable from './TopCustomersTable';
import SalesTable from './SalesTable';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">Krowd</h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <span className="text-gray-600 text-sm">
                    Sales & Revenue Dashboard
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPIs Section */}
        <section className="mb-8 animate-fade-in">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Key Performance Indicators
          </h2>
          <KPICards />
        </section>

        {/* Charts Section */}
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="animate-slide-up">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Sales vs Target
              </h3>
              <SalesChart />
            </div>
            <div
              className="animate-slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Product Revenue Share
              </h3>
              <ProductChart />
            </div>
          </div>
        </section>

        {/* Tables Section */}
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              className="animate-slide-up"
              style={{ animationDelay: '0.4s' }}
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Top 5 Products
              </h3>
              <TopProductsTable />
            </div>
            <div
              className="animate-slide-up"
              style={{ animationDelay: '0.6s' }}
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Top 5 Customers
              </h3>
              <TopCustomersTable />
            </div>
          </div>
        </section>

        {/* Sales Data Table */}
        <section
          className="animate-slide-up"
          style={{ animationDelay: '0.8s' }}
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Sales Data
          </h3>
          <SalesTable />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
