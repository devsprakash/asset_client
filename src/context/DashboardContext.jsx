// context/DashboardContext.js
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContexts';
import axios from 'axios';

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

const API_BASE_URL = "https://asset-management-2-y8uw.onrender.com/api/v1";

const getApiClient = (token) => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

export const DashboardProvider = ({ children }) => {
  const { token, isAuthenticated, user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exportData, setExportData] = useState(null);

  const abortControllerRef = useRef(null);
  const isMounted = useRef(true);

  // Cancel previous requests
  const cancelPreviousRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
  };

  // Helper to check if component is mounted
  const safeSetState = useCallback((setter, value) => {
    if (isMounted.current) {
      setter(value);
    }
  }, []);

  // Fetch Super Admin Dashboard
  const fetchSuperAdminDashboard = useCallback(async (filters = {}) => {
    if (!isAuthenticated || !token) {
      console.log('Not authenticated, skipping super admin dashboard fetch');
      return null;
    }
    
    const userRole = user?.role;
    if (userRole !== 'super_admin' && userRole !== 'superadmin') {
      console.log('User is not super admin, skipping');
      return null;
    }

    cancelPreviousRequest();
    safeSetState(setLoading, true);
    safeSetState(setError, null);

    try {
      const api = getApiClient(token);
      const params = new URLSearchParams();
      if (filters.dateRange) params.append('dateRange', filters.dateRange);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);

      console.log('Fetching super admin dashboard with params:', params.toString());
      const response = await api.get(`/dashboard/super-admin?${params.toString()}`, {
        signal: abortControllerRef.current.signal
      });

      if (response.data && response.data.success) {
        safeSetState(setDashboardData, response.data);
        return response.data;
      }
      throw new Error(response.data?.message || 'Failed to fetch dashboard');
    } catch (err) {
      if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
        console.error('Fetch super admin dashboard error:', err);
        safeSetState(setError, err.response?.data?.message || err.message);
      }
      return null;
    } finally {
      safeSetState(setLoading, false);
    }
  }, [isAuthenticated, token, user, safeSetState]);

  // Fetch Admin Dashboard
  const fetchAdminDashboard = useCallback(async (filters = {}) => {
    if (!isAuthenticated || !token) {
      console.log('Not authenticated, skipping admin dashboard fetch');
      return null;
    }
    
    if (user?.role !== 'admin') {
      console.log('User is not admin, skipping');
      return null;
    }

    cancelPreviousRequest();
    safeSetState(setLoading, true);
    safeSetState(setError, null);

    try {
      const api = getApiClient(token);
      const params = new URLSearchParams();
      if (filters.dateRange) params.append('dateRange', filters.dateRange);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);

      console.log('Fetching admin dashboard with params:', params.toString());
      const response = await api.get(`/dashboard/admin?${params.toString()}`, {
        signal: abortControllerRef.current.signal
      });

      if (response.data && response.data.success) {
        safeSetState(setDashboardData, response.data);
        return response.data;
      }
      throw new Error(response.data?.message || 'Failed to fetch dashboard');
    } catch (err) {
      if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
        console.error('Fetch admin dashboard error:', err);
        safeSetState(setError, err.response?.data?.message || err.message);
      }
      return null;
    } finally {
      safeSetState(setLoading, false);
    }
  }, [isAuthenticated, token, user, safeSetState]);

  // Fetch Team Dashboard
  const fetchTeamDashboard = useCallback(async () => {
    if (!isAuthenticated || !token) {
      console.log('Not authenticated, skipping team dashboard fetch');
      return null;
    }
    
    if (user?.role !== 'team') {
      console.log('User is not team member, skipping');
      return null;
    }

    cancelPreviousRequest();
    safeSetState(setLoading, true);
    safeSetState(setError, null);

    try {
      const api = getApiClient(token);
      const response = await api.get('/dashboard/team', {
        signal: abortControllerRef.current.signal
      });

      if (response.data && response.data.success) {
        safeSetState(setDashboardData, response.data);
        safeSetState(setStatsData, response.data);
        return response.data;
      }
      throw new Error(response.data?.message || 'Failed to fetch team dashboard');
    } catch (err) {
      if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
        console.error('Fetch team dashboard error:', err);
        safeSetState(setError, err.response?.data?.message || err.message);
      }
      return null;
    } finally {
      safeSetState(setLoading, false);
    }
  }, [isAuthenticated, token, user, safeSetState]);

  // Fetch Dashboard Stats
  const fetchDashboardStats = useCallback(async () => {
    if (!isAuthenticated || !token) return null;

    cancelPreviousRequest();

    try {
      const api = getApiClient(token);
      const response = await api.get('/dashboard/stats', {
        signal: abortControllerRef.current.signal
      });

      if (response.data && response.data.success) {
        safeSetState(setStatsData, response.data);
        return response.data;
      }
      throw new Error(response.data?.message || 'Failed to fetch stats');
    } catch (err) {
      if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
        console.error('Fetch stats error:', err);
      }
      return null;
    }
  }, [isAuthenticated, token, safeSetState]);

  // Fetch Chart Data
  const fetchChartData = useCallback(async (chartType = null) => {
    if (!isAuthenticated || !token) return null;
    if (user?.role === 'team') return null;

    cancelPreviousRequest();

    try {
      const api = getApiClient(token);
      const url = chartType ? `/dashboard/charts?chartType=${chartType}` : '/dashboard/charts';
      const response = await api.get(url, {
        signal: abortControllerRef.current.signal
      });

      if (response.data && response.data.success) {
        safeSetState(setChartData, response.data);
        return response.data;
      }
      throw new Error(response.data?.message || 'Failed to fetch chart data');
    } catch (err) {
      if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
        console.error('Fetch chart data error:', err);
      }
      return null;
    }
  }, [isAuthenticated, token, user, safeSetState]);

  // Fetch Recent Activities
  const fetchRecentActivities = useCallback(async (limit = 10) => {
    if (!isAuthenticated || !token) return [];

    cancelPreviousRequest();

    try {
      const api = getApiClient(token);
      const response = await api.get(`/dashboard/activities?limit=${limit}`, {
        signal: abortControllerRef.current.signal
      });

      if (response.data && response.data.success) {
        // Extract activities from response (they are returned as object with numeric keys)
        const activitiesList = Object.keys(response.data)
          .filter(key => !isNaN(parseInt(key)) && key !== 'success' && key !== 'message')
          .map(key => response.data[key]);
        safeSetState(setActivities, activitiesList);
        return activitiesList;
      }
      throw new Error(response.data?.message || 'Failed to fetch activities');
    } catch (err) {
      if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
        console.error('Fetch activities error:', err);
      }
      return [];
    }
  }, [isAuthenticated, token, safeSetState]);

  // Export Dashboard Report
  const exportDashboardReport = useCallback(async () => {
    if (!isAuthenticated || !token) return null;

    try {
      const api = getApiClient(token);
      const response = await api.get('/dashboard/export', {
        responseType: 'blob'
      });

      return response.data;
    } catch (err) {
      console.error('Export dashboard error:', err);
      safeSetState(setError, err.response?.data?.message || 'Failed to export dashboard');
      return null;
    }
  }, [isAuthenticated, token, safeSetState]);

  // Load dashboard based on user role
  const loadDashboard = useCallback(async (filters = {}) => {
    if (!isAuthenticated || !token) {
      console.log('Not authenticated, skipping dashboard load');
      return;
    }

    console.log('Loading dashboard for role:', user?.role);
    safeSetState(setLoading, true);
    
    try {
      const userRole = user?.role;
      
      if (userRole === 'super_admin' || userRole === 'superadmin') {
        await fetchSuperAdminDashboard(filters);
      } else if (userRole === 'admin') {
        await fetchAdminDashboard(filters);
      } else if (userRole === 'team') {
        await fetchTeamDashboard();
      }
      
      await fetchDashboardStats();
      await fetchRecentActivities();
      
      if (userRole !== 'team') {
        await fetchChartData();
      }
    } catch (err) {
      console.error('Load dashboard error:', err);
    } finally {
      safeSetState(setLoading, false);
    }
  }, [isAuthenticated, token, user, fetchSuperAdminDashboard, fetchAdminDashboard, fetchTeamDashboard, fetchDashboardStats, fetchRecentActivities, fetchChartData, safeSetState]);

  // Clear error
  const clearError = useCallback(() => {
    safeSetState(setError, null);
  }, [safeSetState]);

  // Cleanup on unmount
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const value = {
    dashboardData,
    statsData,
    chartData,
    activities,
    loading,
    error,
    fetchSuperAdminDashboard,
    fetchAdminDashboard,
    fetchTeamDashboard,
    fetchDashboardStats,
    fetchChartData,
    fetchRecentActivities,
    exportDashboardReport,
    loadDashboard,
    clearError,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};