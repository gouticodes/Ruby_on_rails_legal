import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import PrivateRoute from './PrivateRoute';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const CasesPage = lazy(() => import('../pages/CasesPage'));
const DocumentsPage = lazy(() => import('../pages/DocumentsPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const AuditLogsPage = lazy(() => import('../pages/AuditLogsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

function ProtectedLayout({ children, adminOnly = false }) {
  return (
    <PrivateRoute adminOnly={adminOnly}>
      <AppShell>{children}</AppShell>
    </PrivateRoute>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<ProtectedLayout><DashboardPage /></ProtectedLayout>} />
      <Route path="/cases" element={<ProtectedLayout><CasesPage /></ProtectedLayout>} />
      <Route path="/documents" element={<ProtectedLayout><DocumentsPage /></ProtectedLayout>} />
      <Route path="/profile" element={<ProtectedLayout><ProfilePage /></ProtectedLayout>} />
      <Route path="/audit-logs" element={<ProtectedLayout adminOnly><AuditLogsPage /></ProtectedLayout>} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
