import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../Dashboard';
import { DashboardProvider } from '../../context/DashboardContext';

// Mock all child components to isolate Dashboard testing
jest.mock('../KPICards', () => {
  return function MockKPICards() {
    return <div data-testid="kpi-cards">KPI Cards Component</div>;
  };
});

jest.mock('../SalesChart', () => {
  return function MockSalesChart() {
    return <div data-testid="sales-chart">Sales Chart Component</div>;
  };
});

jest.mock('../ProductChart', () => {
  return function MockProductChart() {
    return <div data-testid="product-chart">Product Chart Component</div>;
  };
});

jest.mock('../TopProductsTable', () => {
  return function MockTopProductsTable() {
    return <div data-testid="top-products">Top Products Table</div>;
  };
});

jest.mock('../TopCustomersTable', () => {
  return function MockTopCustomersTable() {
    return <div data-testid="top-customers">Top Customers Table</div>;
  };
});

jest.mock('../SalesTable', () => {
  return function MockSalesTable() {
    return <div data-testid="sales-table">Sales Table</div>;
  };
});

describe('Dashboard Component', () => {
  const renderDashboard = () => {
    return render(
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
    );
  };

  test('renders dashboard header with Krowd branding', () => {
    renderDashboard();

    expect(screen.getByText('Krowd')).toBeInTheDocument();
    expect(screen.getByText('Sales & Revenue Dashboard')).toBeInTheDocument();
  });

  test('renders all main sections', () => {
    renderDashboard();

    expect(screen.getByText('Key Performance Indicators')).toBeInTheDocument();
    expect(screen.getByText('Sales vs Target')).toBeInTheDocument();
    expect(screen.getByText('Product Revenue Share')).toBeInTheDocument();
    expect(screen.getByText('Top 5 Products')).toBeInTheDocument();
    expect(screen.getByText('Top 5 Customers')).toBeInTheDocument();
    expect(screen.getByText('Recent Sales Data')).toBeInTheDocument();
  });

  test('renders all child components', () => {
    renderDashboard();

    expect(screen.getByTestId('kpi-cards')).toBeInTheDocument();
    expect(screen.getByTestId('sales-chart')).toBeInTheDocument();
    expect(screen.getByTestId('product-chart')).toBeInTheDocument();
    expect(screen.getByTestId('top-products')).toBeInTheDocument();
    expect(screen.getByTestId('top-customers')).toBeInTheDocument();
    expect(screen.getByTestId('sales-table')).toBeInTheDocument();
  });

  test('displays current date in header', () => {
    renderDashboard();

    expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
  });
});
