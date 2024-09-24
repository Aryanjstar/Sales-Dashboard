import { createSlice } from '@reduxjs/toolkit';
import salesData from '../data/salesData.json';

const initialState = {
  salesData: salesData.salesData,
  monthlyTargets: salesData.monthlyTargets,
  products: salesData.products,
  customers: salesData.customers,
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 10,
  selectedTimeRange: 'all',
  filters: {
    salesRep: '',
    client: '',
    product: '',
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTimeRange: (state, action) => {
      state.selectedTimeRange = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; // Reset to first page when filtering
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.currentPage = 1;
    },
    updateSalesData: (state, action) => {
      state.salesData = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setCurrentPage,
  setTimeRange,
  setFilters,
  resetFilters,
  updateSalesData,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
