// context/ChecklistContext.jsx
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useAuth } from "./AuthContexts";

const ChecklistContext = createContext();

export const useChecklist = () => {
  const context = useContext(ChecklistContext);
  if (!context)
    throw new Error("useChecklist must be used within a ChecklistProvider");
  return context;
};

const BASE_URL = "https://asset-management-2-y8uw.onrender.com/api/v1/user";

export const ChecklistProvider = ({ children }) => {
  const { token } = useAuth();

  // ─── State ────────────────────────────────────────────────────
  const [checklists, setChecklists] = useState([]);
  const [cloneList, setCloneList] = useState([]);
  const [requests, setRequests] = useState([]);
  const [requestStats, setRequestStats] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ─── Auth Headers ─────────────────────────────────────────────
  const authHeaders = useMemo(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
    [token],
  );

  const multipartHeaders = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
    }),
    [token],
  );

  // ─── Helper ───────────────────────────────────────────────────
  const request = useCallback(
    async (method, path, body = null, isFormData = false) => {
      setLoading(true);
      setError(null);
      try {
        const options = {
          method,
          headers: isFormData ? multipartHeaders : authHeaders,
        };
        if (body) options.body = isFormData ? body : JSON.stringify(body);
        
        const url = `${BASE_URL}${path}`;
        console.log(`Making ${method} request to: ${url}`);
        
        const res = await fetch(url, options);
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.message || "Request failed");
        return data;
      } catch (err) {
        console.error("Request error:", err);
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [authHeaders, multipartHeaders],
  );

  // ─── Checklist CRUD ───────────────────────────────────────────

  /** GET /checklist — with search, filter, pagination */
  const fetchChecklists = useCallback(
    async (params = {}) => {
      const {
        page = 1,
        limit = 20,
        search = "",
        type = "",
        status = "",
        category = "",
      } = params;
      const qs = new URLSearchParams({
        page,
        limit,
        ...(search && { search }),
        ...(type && { type }),
        ...(status && { status }),
        ...(category && { category }),
      }).toString();
      const data = await request("GET", `/checklist?${qs}`);
      setChecklists(data.checklists || []);
      setPagination(
        data.pagination || { page: 1, limit: 20, total: 0, totalPages: 1 },
      );
      return data;
    },
    [request],
  );

  /** GET /checklist/:id */
  const fetchChecklistById = useCallback(
    async (id) => {
      return await request("GET", `/checklist/${id}`);
    },
    [request],
  );

  /** POST /checklist — Create Custom Checklist */
  const createCustomChecklist = useCallback(
    async (payload) => {
      const body = { ...payload, type: "custom" };
      const data = await request("POST", "/checklist", body);
      await fetchChecklists();
      return data;
    },
    [request, fetchChecklists],
  );

  /** POST /checklist — Create Global Checklist */
  const createGlobalChecklist = useCallback(
    async (payload) => {
      const body = { ...payload, type: "global" };
      const data = await request("POST", "/checklist", body);
      await fetchChecklists();
      return data;
    },
    [request, fetchChecklists],
  );

  /** PUT /checklist/:id */
  const updateChecklist = useCallback(
    async (id, payload) => {
      const data = await request("PUT", `/checklist/${id}`, payload);
      await fetchChecklists();
      return data;
    },
    [request, fetchChecklists],
  );

  /** DELETE /checklist/:id */
  const deleteChecklist = useCallback(
    async (id) => {
      const data = await request("DELETE", `/checklist/${id}`);
      setChecklists((prev) => prev.filter((c) => c._id !== id));
      return data;
    },
    [request],
  );

  // ─── Clone ────────────────────────────────────────────────────

  /** GET /checklist/clone/list */
  const fetchCloneList = useCallback(
    async (params = {}) => {
      const { page = 1, limit = 20, search = "" } = params;
      const qs = new URLSearchParams({
        page,
        limit,
        ...(search && { search }),
      }).toString();
      const data = await request("GET", `/checklist/clone/list?${qs}`);
      setCloneList(data.checklists || []);
      setPagination(
        data.pagination || { page: 1, limit: 20, total: 0, totalPages: 1 },
      );
      return data;
    },
    [request],
  );

  /** POST /checklist/clone/:id */
  const cloneChecklist = useCallback(
    async (id, newName) => {
      const data = await request("POST", `/checklist/clone/${id}`, { newName });
      await fetchChecklists();
      return data;
    },
    [request, fetchChecklists],
  );

  // ─── Import from Excel ────────────────────────────────────────

  /** POST /checklist/import-excel — multipart/form-data */
  const importChecklistFromExcel = useCallback(
    async (file, meta = {}) => {
      const formData = new FormData();
      formData.append("file", file);
      if (meta.name) formData.append("name", meta.name);
      if (meta.description) formData.append("description", meta.description);
      if (meta.category) formData.append("category", meta.category);
      const data = await request(
        "POST",
        "/checklist/import-excel",
        formData,
        true,
      );
      await fetchChecklists();
      return data;
    },
    [request, fetchChecklists],
  );

  // ─── Requests ─────────────────────────────────────────────────

  /** POST /checklist/requests (user/admin) */
  const submitChecklistRequest = useCallback(
    async (payload) => {
      const data = await request("POST", "/checklist/requests", payload);
      // Don't call fetchRequests here to avoid circular dependency
      return data;
    },
    [request],
  );

  /** GET /checklist/requests/list */
  const fetchRequests = useCallback(
    async (params = {}) => {
      const { page = 1, limit = 20, status = "" } = params;
      const qs = new URLSearchParams({
        page,
        limit,
        ...(status && { status }),
      }).toString();
      const data = await request("GET", `/checklist/requests/list?${qs}`);
      setRequests(data.requests || []);
      setPagination(
        data.pagination || { page: 1, limit: 20, total: 0, totalPages: 1 },
      );
      return data;
    },
    [request],
  );

  /** GET /checklist/requests/stats */
  const fetchRequestStats = useCallback(async () => {
    const data = await request("GET", "/checklist/requests/stats");
    setRequestStats(data.counts || null);
    return data;
  }, [request]);

  /** GET /checklist/requests/:id */
  const fetchRequestById = useCallback(
    async (id) => {
      return await request("GET", `/checklist/requests/${id}`);
    },
    [request],
  );

  /** PATCH /checklist/requests/:id/review (superadmin) */
  const reviewRequest = useCallback(
    async (id, payload) => {
      const data = await request(
        "PATCH",
        `/checklist/requests/${id}/review`,
        payload,
      );
      await fetchRequests();
      return data;
    },
    [request, fetchRequests],
  );

  // ─── Value ────────────────────────────────────────────────────
  const value = useMemo(
    () => ({
      // state
      checklists,
      cloneList,
      requests,
      requestStats,
      pagination,
      loading,
      error,
      // checklist
      fetchChecklists,
      fetchChecklistById,
      createCustomChecklist,
      createGlobalChecklist,
      updateChecklist,
      deleteChecklist,
      // clone
      fetchCloneList,
      cloneChecklist,
      // import
      importChecklistFromExcel,
      // requests
      submitChecklistRequest,
      fetchRequests,
      fetchRequestStats,
      fetchRequestById,
      reviewRequest,
    }),
    [
      checklists,
      cloneList,
      requests,
      requestStats,
      pagination,
      loading,
      error,
      fetchChecklists,
      fetchChecklistById,
      createCustomChecklist,
      createGlobalChecklist,
      updateChecklist,
      deleteChecklist,
      fetchCloneList,
      cloneChecklist,
      importChecklistFromExcel,
      submitChecklistRequest,
      fetchRequests,
      fetchRequestStats,
      fetchRequestById,
      reviewRequest,
    ],
  );

  return (
    <ChecklistContext.Provider value={value}>
      {children}
    </ChecklistContext.Provider>
  );
};