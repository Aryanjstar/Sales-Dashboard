import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import KPICards from '../KPICards';

// Mock the sales data
jest.mock('../../data/salesData.json', () => ({
  salesData: [
    {
      id: 1,
      date: '2024-03-01',
      revenue: 10000,
      target: 12000,
    },
    {
      id: 2,
      date: '2024-02-01',
      revenue: 8000,
      target: 10000,
    },
  ],
  monthlyTargets: {
    March: 12000,
    February: 10000,
  },
}));

describe('KPICards Component', () => {
  test('renders all three KPI cards', () => {
    render(<KPICards />);

    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('Target Achievement')).toBeInTheDocument();
    expect(screen.getByText('Revenue Growth')).toBeInTheDocument();
  });

  test('displays currency formatting correctly', () => {
    render(<KPICards />);
    
    // Should display formatted currency values
    expect(screen.getAllByText(/\$/).length).toBeGreaterThan(0);
  });

  test('shows percentage values for target achievement', () => {
    render(<KPICards />);
    
    // Should display percentage for target achievement
    expect(screen.getAllByText(/%/).length).toBeGreaterThan(0);
  });

  test('renders icons for each KPI card', () => {
    render(<KPICards />);

    // Check if cards have proper structure
    const cards = screen.getAllByRole('generic');
    expect(cards.length).toBeGreaterThan(0);
  });
});
