import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContexts";
import ProtectedRoute from "./components/ProtectedRoute";
// Auth Pages
import Login from "./components/Login";
import SuperAdminDashboard from "./dashboard/SuperAdminDashboard";
import ClientManagement from './pages/superadmin/ClientManagement'
import AssignedChecklist from "./pages/superadmin/AssignedChecklist";
import ViewChecklist from "./pages/superadmin/viewAssignedCheckList";

// Layout Components
import DashboardLayout from "./layout/Layout"

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["superadmin"]} />}>
            <Route 
              path="/superadmin/*" 
              element={
                <DashboardLayout>
                  <SuperAdminDashboard />
                </DashboardLayout>
              } 
            />
            <Route 
              path="/superadmin/clients" 
              element={
                <DashboardLayout>
                  <ClientManagement />
                </DashboardLayout>
              } 
            />
               <Route 
              path="/superadmin/checklists" 
              element={
                <DashboardLayout>
                  <AssignedChecklist />
                </DashboardLayout>
              } 
            />
            <Route 
              path="/superadmin/view/checklists" 
              element={
                <DashboardLayout>
                  <ViewChecklist />
                </DashboardLayout>
              } 
            />
          </Route>

          {/* <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route 
              path="/admin/*" 
              element={
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              } 
            />
          </Route> */}

          {/* <Route element={<ProtectedRoute allowedRoles={["team"]} />}>
            <Route 
              path="/team/*" 
              element={
                <DashboardLayout>
                  <TeamDashboard />
                </DashboardLayout>
              } 
            />
          </Route> */}
          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}