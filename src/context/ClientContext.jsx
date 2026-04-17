// context/ClientContext.js
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useReducer,
  useRef,
  useEffect,
} from "react";
import { useAuth } from "./AuthContexts";
import * as clientApi from "../services/ClientApi";

// ─── Initial State ──────────────────────────────────────────────────────────
const initialState = {
  clients: [],
  selectedClient: null,
  stats: {
    total: 0,
    active: 0,
    inactive: 0,
    expiringSoon: 0,
    byPlan: { free: 0, standard: 0, premium: 0, enterprise: 0 },
  },
  pagination: { page: 1, limit: 12, total: 0, pages: 1 },
  filters: {
    search: "",
    status: "all",
    membershipPlan: "all",
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  loading: false,
  error: null,
};

// ─── Action Types ────────────────────────────────────────────────────────────
const A = {
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_CLIENTS: "SET_CLIENTS",
  SET_SELECTED_CLIENT: "SET_SELECTED_CLIENT",
  SET_STATS: "SET_STATS",
  SET_PAGINATION: "SET_PAGINATION",
  SET_FILTERS: "SET_FILTERS",
  UPDATE_CLIENT: "UPDATE_CLIENT",
  ADD_CLIENT: "ADD_CLIENT",
  REMOVE_CLIENT: "REMOVE_CLIENT",
};

// ─── Reducer ─────────────────────────────────────────────────────────────────
const clientReducer = (state, action) => {
  switch (action.type) {
    case A.SET_LOADING:
      return { ...state, loading: action.payload };
    case A.SET_ERROR:
      return { ...state, error: action.payload };
    case A.SET_CLIENTS:
      return { ...state, clients: action.payload };
    case A.SET_SELECTED_CLIENT:
      return { ...state, selectedClient: action.payload };
    case A.SET_STATS:
      return { ...state, stats: action.payload };
    case A.SET_PAGINATION:
      return { ...state, pagination: action.payload };
    case A.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case A.UPDATE_CLIENT:
      return {
        ...state,
        clients: state.clients.map((c) =>
          c._id === action.payload._id ? action.payload : c,
        ),
        selectedClient:
          state.selectedClient?._id === action.payload._id
            ? action.payload
            : state.selectedClient,
      };
    case A.ADD_CLIENT:
      return {
        ...state,
        clients: [action.payload, ...state.clients],
        stats: {
          ...state.stats,
          total: state.stats.total + 1,
          active: state.stats.active + 1,
          byPlan: {
            ...state.stats.byPlan,
            [action.payload.membershipPlan]:
              (state.stats.byPlan[action.payload.membershipPlan] || 0) + 1,
          },
        },
      };
    case A.REMOVE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter((c) => c._id !== action.payload),
      };
    default:
      return state;
  }
};

// ─── Context ─────────────────────────────────────────────────────────────────
const ClientContext = createContext();

export const useClient = () => {
  const ctx = useContext(ClientContext);
  if (!ctx) throw new Error("useClient must be used within ClientProvider");
  return ctx;
};

// ─── Provider ────────────────────────────────────────────────────────────────
export const ClientProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(clientReducer, initialState);
  const [actionLoading, setActionLoading] = useState(false);

  const filtersRef = useRef(state.filters);
  const paginationRef = useRef(state.pagination);

  useEffect(() => {
    filtersRef.current = state.filters;
  }, [state.filters]);

  useEffect(() => {
    paginationRef.current = state.pagination;
  }, [state.pagination]);

  // ─── fetchClients ─────────────────────────────────────────────────────────
  const fetchClients = useCallback(async (overrides = {}) => {
    if (!isAuthenticated || !token) {
      console.log("Not authenticated, skipping fetchClients");
      return;
    }

    dispatch({ type: A.SET_LOADING, payload: true });
    dispatch({ type: A.SET_ERROR, payload: null });

    try {
      const activeFilters = { ...filtersRef.current, ...overrides };
      const activePagination = { ...paginationRef.current, ...overrides };

      const result = await clientApi.getAllClients(token, {
        page: overrides.page ?? activePagination.page,
        limit: activePagination.limit,
        search: activeFilters.search,
        status: activeFilters.status,
        membershipPlan: activeFilters.membershipPlan,
        sortBy: activeFilters.sortBy,
        sortOrder: activeFilters.sortOrder,
      });

      if (result && result.success) {
        // Transform clients to include computed fields
        const clientsWithStats = (result.clients || []).map(client => ({
          ...client,
          usagePercentage: client.usersUsed && client.licenseLimit 
            ? Math.round((client.usersUsed / client.licenseLimit) * 100) 
            : 0,
          daysRemaining: client.subscriptionEndDate
            ? Math.max(0, Math.ceil((new Date(client.subscriptionEndDate) - new Date()) / (1000 * 60 * 60 * 24)))
            : 0,
        }));

        dispatch({ type: A.SET_CLIENTS, payload: clientsWithStats });

        if (result.summary) {
          dispatch({
            type: A.SET_STATS,
            payload: {
              total: result.summary.total || result.summary.totalCustomers || 0,
              active: result.summary.activeCustomers || 0,
              inactive: (result.summary.total || result.summary.totalCustomers || 0) - (result.summary.activeCustomers || 0),
              expiringSoon: result.summary.expiringSoon || 0,
              byPlan: result.summary.byPlan || { free: 0, standard: 0, premium: 0, enterprise: 0 },
            },
          });
        }

        if (result.pagination) {
          dispatch({ type: A.SET_PAGINATION, payload: result.pagination });
        }
      } else {
        throw new Error(result?.message || "Failed to fetch clients");
      }
    } catch (error) {
      console.error("fetchClients error:", error);
      dispatch({ type: A.SET_ERROR, payload: error.message || "Failed to fetch clients" });
      dispatch({ type: A.SET_CLIENTS, payload: [] });
    } finally {
      dispatch({ type: A.SET_LOADING, payload: false });
    }
  }, [token, isAuthenticated]);

  // ─── fetchClientById ───────────────────────────────────────────────────────
  const fetchClientById = useCallback(async (clientId) => {
    if (!isAuthenticated || !token) {
      throw new Error("Not authenticated");
    }

    dispatch({ type: A.SET_LOADING, payload: true });
    try {
      const result = await clientApi.getClientById(token, clientId);
      if (result?.success && result?.client) {
        const clientWithComputed = {
          ...result.client,
          usagePercentage: result.client.usersUsed && result.client.licenseLimit
            ? Math.round((result.client.usersUsed / result.client.licenseLimit) * 100)
            : 0,
          daysRemaining: result.client.subscriptionEndDate
            ? Math.max(0, Math.ceil((new Date(result.client.subscriptionEndDate) - new Date()) / (1000 * 60 * 60 * 24)))
            : 0,
        };
        dispatch({ type: A.SET_SELECTED_CLIENT, payload: clientWithComputed });
        return clientWithComputed;
      }
      throw new Error(result?.message || "Client not found");
    } catch (error) {
      console.error("fetchClientById error:", error);
      dispatch({ type: A.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      dispatch({ type: A.SET_LOADING, payload: false });
    }
  }, [token, isAuthenticated]);

  // ─── addClient ─────────────────────────────────────────────────────────────
  const addClient = useCallback(async (clientData) => {
    if (!isAuthenticated || !token) {
      throw new Error("Not authenticated");
    }

    setActionLoading(true);
    try {
      const result = await clientApi.createClient(token, clientData);
      if (result?.success && result?.client) {
        const newClient = {
          ...result.client,
          usagePercentage: 0,
          daysRemaining: result.client.subscriptionEndDate
            ? Math.max(0, Math.ceil((new Date(result.client.subscriptionEndDate) - new Date()) / (1000 * 60 * 60 * 24)))
            : 0,
        };
        dispatch({ type: A.ADD_CLIENT, payload: newClient });
        await fetchClients();
        return result;
      }
      throw new Error(result?.message || "Failed to create client");
    } catch (error) {
      console.error("addClient error:", error);
      dispatch({ type: A.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      setActionLoading(false);
    }
  }, [token, fetchClients, isAuthenticated]);

  // ─── editClient ────────────────────────────────────────────────────────────
  const editClient = useCallback(async (clientId, updateData) => {
    if (!isAuthenticated || !token) {
      throw new Error("Not authenticated");
    }

    setActionLoading(true);
    try {
      const result = await clientApi.updateClient(token, clientId, updateData);
      if (result?.success && result?.client) {
        const updatedClient = {
          ...result.client,
          usagePercentage: result.client.usersUsed && result.client.licenseLimit
            ? Math.round((result.client.usersUsed / result.client.licenseLimit) * 100)
            : 0,
          daysRemaining: result.client.subscriptionEndDate
            ? Math.max(0, Math.ceil((new Date(result.client.subscriptionEndDate) - new Date()) / (1000 * 60 * 60 * 24)))
            : 0,
        };
        dispatch({ type: A.UPDATE_CLIENT, payload: updatedClient });
        await fetchClients();
        return result;
      }
      throw new Error(result?.message || "Failed to update client");
    } catch (error) {
      console.error("editClient error:", error);
      dispatch({ type: A.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      setActionLoading(false);
    }
  }, [token, fetchClients, isAuthenticated]);

  // ─── changeClientStatus ────────────────────────────────────────────────────
  const changeClientStatus = useCallback(async (clientId, status) => {
    if (!isAuthenticated || !token) {
      throw new Error("Not authenticated");
    }

    setActionLoading(true);
    try {
      await clientApi.updateClientStatus(token, clientId, status);
      await fetchClients();
      if (state.selectedClient?._id === clientId) {
        await fetchClientById(clientId);
      }
      return { success: true };
    } catch (error) {
      console.error("changeClientStatus error:", error);
      dispatch({ type: A.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      setActionLoading(false);
    }
  }, [token, fetchClients, fetchClientById, state.selectedClient, isAuthenticated]);

  // ─── removeClient ──────────────────────────────────────────────────────────
  const removeClient = useCallback(async (clientId, permanent = false) => {
    if (!isAuthenticated || !token) {
      throw new Error("Not authenticated");
    }

    setActionLoading(true);
    try {
      await clientApi.deleteClient(token, clientId, permanent);
      dispatch({ type: A.REMOVE_CLIENT, payload: clientId });
      await fetchClients();
      return { success: true };
    } catch (error) {
      console.error("removeClient error:", error);
      dispatch({ type: A.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      setActionLoading(false);
    }
  }, [token, fetchClients, isAuthenticated]);

  // ─── renewClientMembership ─────────────────────────────────────────────────
  const renewClientMembership = useCallback(async (clientId, extendDays) => {
    if (!isAuthenticated || !token) {
      throw new Error("Not authenticated");
    }

    setActionLoading(true);
    try {
      const result = await clientApi.renewClientMembership(token, clientId, extendDays);
      if (result?.success && result?.client) {
        dispatch({ type: A.UPDATE_CLIENT, payload: result.client });
        await fetchClients();
        if (state.selectedClient?._id === clientId) {
          await fetchClientById(clientId);
        }
        return result;
      }
      throw new Error(result?.message || "Failed to renew membership");
    } catch (error) {
      console.error("renewClientMembership error:", error);
      dispatch({ type: A.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      setActionLoading(false);
    }
  }, [token, fetchClients, fetchClientById, state.selectedClient, isAuthenticated]);

  // ─── updateAutoRenewal ─────────────────────────────────────────────────────
  const updateAutoRenewal = useCallback(async (clientId, enabled) => {
    if (!isAuthenticated || !token) {
      throw new Error("Not authenticated");
    }

    setActionLoading(true);
    try {
      const result = await clientApi.updateAutoRenewal(token, clientId, enabled);
      if (result?.success) {
        await fetchClientById(clientId);
        return result;
      }
      throw new Error(result?.message || "Failed to update auto-renewal");
    } catch (error) {
      console.error("updateAutoRenewal error:", error);
      dispatch({ type: A.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      setActionLoading(false);
    }
  }, [token, fetchClientById, isAuthenticated]);

  // ─── updateFilters ─────────────────────────────────────────────────────────
  const updateFilters = useCallback((newFilters) => {
    const merged = { ...filtersRef.current, ...newFilters };
    filtersRef.current = merged;
    dispatch({ type: A.SET_FILTERS, payload: newFilters });
    const newPagination = { ...paginationRef.current, page: 1 };
    paginationRef.current = newPagination;
    dispatch({ type: A.SET_PAGINATION, payload: newPagination });
  }, []);

  // ─── changePage ────────────────────────────────────────────────────────────
  const changePage = useCallback((newPage) => {
    const newPagination = { ...paginationRef.current, page: newPage };
    paginationRef.current = newPagination;
    dispatch({ type: A.SET_PAGINATION, payload: newPagination });
  }, []);

  // ─── resetFilters ──────────────────────────────────────────────────────────
  const resetFilters = useCallback(() => {
    const defaultFilters = {
      search: "",
      status: "all",
      membershipPlan: "all",
      sortBy: "createdAt",
      sortOrder: "desc",
    };
    filtersRef.current = defaultFilters;
    dispatch({ type: A.SET_FILTERS, payload: defaultFilters });
    const defaultPagination = { ...paginationRef.current, page: 1 };
    paginationRef.current = defaultPagination;
    dispatch({ type: A.SET_PAGINATION, payload: defaultPagination });
    fetchClients(defaultFilters);
  }, [fetchClients]);

  // Initial fetch on mount
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchClients();
    }
  }, [isAuthenticated, token, fetchClients]);

  const value = {
    // State
    clients: state.clients,
    selectedClient: state.selectedClient,
    stats: state.stats,
    pagination: state.pagination,
    filters: state.filters,
    loading: state.loading,
    actionLoading,
    error: state.error,
    // Actions
    fetchClients,
    fetchClientById,
    addClient,
    editClient,
    changeClientStatus,
    removeClient,
    renewClientMembership,
    updateAutoRenewal,
    updateFilters,
    changePage,
    resetFilters,
  };

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
};