import React, { createContext, useContext, useReducer } from 'react';
import salesData from '../data/salesData.json';

const DashboardContext = createContext();

// Dashboard state management
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

// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_TIME_RANGE: 'SET_TIME_RANGE',
  SET_FILTERS: 'SET_FILTERS',
  RESET_FILTERS: 'RESET_FILTERS',
};

// Reducer function
function dashboardReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case actionTypes.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case actionTypes.SET_TIME_RANGE:
      return { ...state, selectedTimeRange: action.payload };
    case actionTypes.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        currentPage: 1, // Reset to first page when filtering
      };
    case actionTypes.RESET_FILTERS:
      return {
        ...state,
        filters: initialState.filters,
        currentPage: 1,
      };
    default:
      return state;
  }
}

// Context Provider Component
export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Action creators
  const actions = {
    setLoading: (loading) =>
      dispatch({ type: actionTypes.SET_LOADING, payload: loading }),
    setError: (error) =>
      dispatch({ type: actionTypes.SET_ERROR, payload: error }),
    setCurrentPage: (page) =>
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: page }),
    setTimeRange: (range) =>
      dispatch({ type: actionTypes.SET_TIME_RANGE, payload: range }),
    setFilters: (filters) =>
      dispatch({ type: actionTypes.SET_FILTERS, payload: filters }),
    resetFilters: () => dispatch({ type: actionTypes.RESET_FILTERS }),
  };

  const value = {
    ...state,
    actions,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

// Custom hook to use dashboard context
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}

export default DashboardContext;
