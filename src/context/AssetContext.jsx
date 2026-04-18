// context/AssetContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContexts';

const AssetContext = createContext();

export const useAsset = () => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error('useAsset must be used within an AssetProvider');
  }
  return context;
};

// API base URL
const API_BASE_URL = "https://asset-management-2-y8uw.onrender.com/api/v1";

export const AssetProvider = ({ children }) => {
  const { isAdmin, isTeam } = useAuth();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [totalAssets, setTotalAssets] = useState(0);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    critical: 0,
    inMaintenance: 0,
    retired: 0,
    parentAssets: 0,
    childAssets: 0
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });

  // Create axios instance with default config
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add token to requests
  api.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      console.log('Access Token present:', !!accessToken);
      
      if (accessToken && accessToken !== "undefined" && accessToken !== "null") {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Create new asset
  const createAsset = async (assetData) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token || token === "undefined" || token === "null") {
        throw new Error('No authentication token found. Please login again.');
      }
      
      console.log('Creating asset with data:', assetData);
      
      const response = await api.post('/asset', assetData);
      console.log('Create Asset Response:', response.data);
      
      if (response.data.success) {
        if (response.data.asset) {
          setAssets(prevAssets => [response.data.asset, ...prevAssets]);
          setTotalAssets(prev => prev + 1);
          // Update stats
          await getAssets();
        }
        return { 
          success: true, 
          message: response.data.message || 'Asset created successfully',
          asset: response.data.asset 
        };
      } else {
        throw new Error(response.data.message || 'Failed to create asset');
      }
    } catch (error) {
      console.error('Create asset error:', error);
      
      let errorMessage = 'Failed to create asset';
      
      if (error.response?.status === 401) {
        errorMessage = 'Session expired. Please login again.';
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Get all assets with pagination and filters
  const getAssets = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/asset', { params: filters });
      console.log('Get Assets Response:', response.data);
      
      if (response.data.success) {
        const assetsList = response.data.assets || [];
        setAssets(assetsList);
        setTotalAssets(assetsList.length);
        
        // Update stats from API response
        if (response.data.stats) {
          setStats({
            total: response.data.stats.total || 0,
            active: response.data.stats.active || 0,
            critical: response.data.stats.critical || 0,
            inMaintenance: response.data.stats.inMaintenance || 0,
            retired: response.data.stats.retired || 0,
            parentAssets: response.data.stats.parentAssets || 0,
            childAssets: response.data.stats.childAssets || 0
          });
        } else {
          // Calculate stats locally if not provided
          const statsData = {
            total: assetsList.length,
            active: assetsList.filter(a => a.status === 'active').length,
            critical: assetsList.filter(a => a.isCritical === true).length,
            inMaintenance: assetsList.filter(a => a.status === 'in_maintenance').length,
            retired: assetsList.filter(a => a.status === 'retired').length,
            parentAssets: assetsList.filter(a => a.childAssets?.length > 0).length,
            childAssets: assetsList.filter(a => a.parentAsset).length
          };
          setStats(statsData);
        }
        
        // Update pagination
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
        
        return { 
          success: true, 
          assets: assetsList, 
          stats: response.data.stats || stats,
          pagination: response.data.pagination 
        };
      } else {
        throw new Error(response.data.message || 'Failed to fetch assets');
      }
    } catch (error) {
      console.error('Get assets error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to fetch assets';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Get single asset by ID
  const getAssetById = async (assetId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/asset/${assetId}`);
      console.log('Get Asset By ID Response:', response.data);
      
      if (response.data.success) {
        const asset = response.data.asset;
        setSelectedAsset(asset);
        return { success: true, asset: asset };
      } else {
        throw new Error(response.data.message || 'Failed to fetch asset');
      }
    } catch (error) {
      console.error('Get asset by ID error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to fetch asset';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Update asset
  const updateAsset = async (assetId, updateData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/asset/${assetId}`, updateData);
      console.log('Update Asset Response:', response.data);
      
      if (response.data.success) {
        const updatedAsset = response.data.asset;
        // Update the asset in the list
        setAssets(prevAssets => 
          prevAssets.map(asset => 
            asset._id === assetId ? updatedAsset : asset
          )
        );
        if (selectedAsset && selectedAsset._id === assetId) {
          setSelectedAsset(updatedAsset);
        }
        return { 
          success: true, 
          message: response.data.message || 'Asset updated successfully',
          asset: updatedAsset 
        };
      } else {
        throw new Error(response.data.message || 'Failed to update asset');
      }
    } catch (error) {
      console.error('Update asset error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update asset';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Delete asset
  const deleteAsset = async (assetId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/asset/${assetId}`);
      console.log('Delete Asset Response:', response.data);
      
      if (response.data.success) {
        // Remove the asset from the list
        setAssets(prevAssets => 
          prevAssets.filter(asset => asset._id !== assetId)
        );
        setTotalAssets(prev => prev - 1);
        
        if (selectedAsset && selectedAsset._id === assetId) {
          setSelectedAsset(null);
        }
        
        // Refresh stats
        await getAssets();
        
        return { 
          success: true, 
          message: response.data.message || 'Asset deleted successfully' 
        };
      } else {
        throw new Error(response.data.message || 'Failed to delete asset');
      }
    } catch (error) {
      console.error('Delete asset error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete asset';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Search assets
  const searchAssets = async (searchTerm) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/asset/search', { params: { q: searchTerm } });
      console.log('Search Assets Response:', response.data);
      
      if (response.data.success) {
        const searchResults = response.data.assets || [];
        setAssets(searchResults);
        return { success: true, assets: searchResults };
      } else {
        throw new Error(response.data.message || 'Failed to search assets');
      }
    } catch (error) {
      console.error('Search assets error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to search assets';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Get assets by category
  const getAssetsByCategory = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/asset/category/${category}`);
      console.log('Get Assets By Category Response:', response.data);
      
      if (response.data.success) {
        const categoryAssets = response.data.assets || [];
        setAssets(categoryAssets);
        return { success: true, assets: categoryAssets };
      } else {
        throw new Error(response.data.message || 'Failed to fetch assets by category');
      }
    } catch (error) {
      console.error('Get assets by category error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to fetch assets';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Get assets by status
  const getAssetsByStatus = async (status) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/asset/status/${status}`);
      console.log('Get Assets By Status Response:', response.data);
      
      if (response.data.success) {
        const statusAssets = response.data.assets || [];
        setAssets(statusAssets);
        return { success: true, assets: statusAssets };
      } else {
        throw new Error(response.data.message || 'Failed to fetch assets by status');
      }
    } catch (error) {
      console.error('Get assets by status error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to fetch assets';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Get critical assets
  const getCriticalAssets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/asset/critical');
      console.log('Get Critical Assets Response:', response.data);
      
      if (response.data.success) {
        const criticalAssets = response.data.assets || [];
        setAssets(criticalAssets);
        return { success: true, assets: criticalAssets };
      } else {
        throw new Error(response.data.message || 'Failed to fetch critical assets');
      }
    } catch (error) {
      console.error('Get critical assets error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to fetch assets';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Clear all assets
  const clearAssets = () => {
    setAssets([]);
    setSelectedAsset(null);
    setTotalAssets(0);
    setStats({
      total: 0,
      active: 0,
      critical: 0,
      inMaintenance: 0,
      retired: 0,
      parentAssets: 0,
      childAssets: 0
    });
    setPagination({
      page: 1,
      limit: 20,
      total: 0,
      pages: 0
    });
  };

  const value = {
    assets,
    loading,
    error,
    selectedAsset,
    totalAssets,
    stats,
    pagination,
    createAsset,
    getAssets,
    getAssetById,
    updateAsset,
    deleteAsset,
    searchAssets,
    getAssetsByCategory,
    getAssetsByStatus,
    getCriticalAssets,
    clearAssets,
    setSelectedAsset,
    isAdmin,
    isTeam,
    api
  };

  return (
    <AssetContext.Provider value={value}>
      {children}
    </AssetContext.Provider>
  );
};