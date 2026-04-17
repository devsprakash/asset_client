// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContexts";
import { AssetProvider } from "./context/AssetContext";
import { ClientProvider } from "./context/ClientContext";
import { TeamProvider } from "./context/TeamContext";
import { ChecklistProvider } from "./context/ChecklistContext";
import { DashboardProvider } from "./context/DashboardContext";
import { ReportProvider } from "./context/ReportContext";

// Auth Pages
import Login from "./components/Login";

// Team Pages
import MyTask from "./pages/team/MyTask";
import MyTaskDetails from "./pages/team/MyTaskDetails";
import TeamAssetManagement from "./pages/team/TeamAssetManagement";
import TeamAssetDetails from "./pages/team/AssetDetails";
import TeamCloneAsset from "./pages/team/TeamCloneAsssets";
import TeamAddAsset from "./pages/team/TeamAddAsset";
import TeamAssetRequest from "./pages/team/TeamAssetRequest";
import History from "./pages/team/History";
import TeamProfile from "./pages/TeamProfile";
import MyRequestAssetDetails from "./pages/team/MyRequestAssetDetails";
import CloneAssetDetails from "./pages/team/CloneAssetDetails";
import Dashboard from "./pages/Dashboard";
import ClientManagement from "./pages/ClientManagement";
import ClientDetails from "./pages/ClientDetails";
import DashboardLayout from "./layout/Layout";
import TeamManagement from "./pages/TeamManagement";
import TeamDetails from "./pages/TeamDetails";
import ReportsPage from "./pages/Reports";

// Checklist Pages
import Checklist from "./pages/CheckList";
import CustomChecklistBuilder from "./pages/CustomChecklist";
import GlobalChecklistBuilder from "./pages/GlobalChecklist";
import CloneChecklist from "./pages/CloneChecklist";
import ImportChecklistFields from "./pages/ImportChecklist";
import ChecklistRequests from "./pages/RequestModal";

// Landing Pages
import Main from "./pages/landing/Main";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

// Wrapper components
const AssetRouteWrapper = ({ children }) => <AssetProvider>{children}</AssetProvider>;
const ClientRouteWrapper = ({ children }) => <ClientProvider>{children}</ClientProvider>;
const TeamRouteWrapper = ({ children }) => <TeamProvider>{children}</TeamProvider>;
const ChecklistRouteWrapper = ({ children }) => <ChecklistProvider>{children}</ChecklistProvider>;

// Base Combined Wrapper (for most routes)
const CombinedRouteWrapper = ({ children }) => (
  <ClientProvider>
    <TeamProvider>
      <AssetProvider>
        <ChecklistProvider>
          <ReportProvider>
            {children}
          </ReportProvider>
        </ChecklistProvider>
      </AssetProvider>
    </TeamProvider>
  </ClientProvider>
);

// Dashboard specific wrapper with DashboardProvider
const DashboardRouteWrapper = ({ children }) => (
  <ClientProvider>
    <TeamProvider>
      <AssetProvider>
        <ChecklistProvider>
          <DashboardProvider>
            <ReportProvider>
              {children}
            </ReportProvider>
          </DashboardProvider>
        </ChecklistProvider>
      </AssetProvider>
    </TeamProvider>
  </ClientProvider>
);

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Admin Dashboard Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
                <DashboardLayout>
                  <DashboardRouteWrapper>
                    <Dashboard />
                  </DashboardRouteWrapper>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Client Management Routes (Super Admin Only) */}
          <Route
            path="/admin/clients"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <DashboardLayout>
                  <ClientRouteWrapper>
                    <ClientManagement />
                  </ClientRouteWrapper>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/clients-details/:id"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <DashboardLayout>
                  <ClientRouteWrapper>
                    <ClientDetails />
                  </ClientRouteWrapper>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Team Management Routes */}
          <Route
            path="/admin/team"
            element={
              <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
                <DashboardLayout>
                  <TeamRouteWrapper>
                    <TeamManagement />
                  </TeamRouteWrapper>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/team-details/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
                <DashboardLayout>
                  <TeamRouteWrapper>
                    <TeamDetails />
                  </TeamRouteWrapper>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Checklist Routes */}
          <Route
            path="/admin/checklists"
            element={
              <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
                <DashboardLayout>
                  <ChecklistRouteWrapper>
                    <Checklist />
                  </ChecklistRouteWrapper>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/checklists/custom-builder"
            element={
              <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
                <DashboardLayout>
                  <ChecklistRouteWrapper>
                    <CustomChecklistBuilder />
                  </ChecklistRouteWrapper>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/checklists/global-builder"
            element={
              <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
                <DashboardLayout>
                  <ChecklistRouteWrapper>
                    <GlobalChecklistBuilder />
                  </ChecklistRouteWrapper>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/checklists/import-fields"
            element={
              <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
                <DashboardLayout>
                  <ChecklistRouteWrapper>
                    <ImportChecklistFields />
                  </ChecklistRouteWrapper>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/clone-checklist"
            element={
              <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
                <DashboardLayout>
                  <ChecklistRouteWrapper>
                    <CloneChecklist />
                  </ChecklistRouteWrapper>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/checklist-requests"
            element={
              <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
                <DashboardLayout>
                  <ChecklistRouteWrapper>
                    <ChecklistRequests />
                  </ChecklistRouteWrapper>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Asset Management Routes */}
          <Route
            path="/admin/assets"
            element={
              <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
                <DashboardLayout>
                  <AssetRouteWrapper>
                    <TeamAssetManagement />
                  </AssetRouteWrapper>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Assigned Checklists Route */}
          <Route
            path="/admin/assigned-checklists"
            element={
              <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
                <DashboardLayout>
                  <CombinedRouteWrapper>
                    <div>Assigned Checklists Page</div>
                  </CombinedRouteWrapper>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Reports Route */}
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
                <DashboardLayout>
                  <CombinedRouteWrapper>
                    <ReportsPage />
                  </CombinedRouteWrapper>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Settings Route */}
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
                <DashboardLayout>
                  <CombinedRouteWrapper>
                    <div>Settings Page</div>
                  </CombinedRouteWrapper>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Team Member Routes */}
          <Route
            path="/team"
            element={
              <ProtectedRoute allowedRoles={["team"]}>
                <DashboardLayout>
                  <CombinedRouteWrapper>
                    <MyTask />
                  </CombinedRouteWrapper>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/team/assets"
            element={
              <ProtectedRoute allowedRoles={["team"]}>
                <DashboardLayout>
                  <AssetRouteWrapper>
                    <TeamAssetManagement />
                  </AssetRouteWrapper>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/team/checklists"
            element={
              <ProtectedRoute allowedRoles={["team"]}>
                <DashboardLayout>
                  <ChecklistRouteWrapper>
                    <Checklist />
                  </ChecklistRouteWrapper>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/team/history"
            element={
              <ProtectedRoute allowedRoles={["team"]}>
                <DashboardLayout>
                  <AssetRouteWrapper>
                    <History />
                  </AssetRouteWrapper>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/team/profile"
            element={
              <ProtectedRoute allowedRoles={["team"]}>
                <DashboardLayout>
                  <TeamProfile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}