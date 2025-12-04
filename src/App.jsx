import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLogin from './pages/AdminLoginNew'
import ForgotPassword from './pages/ForgotPassword'
import ChangePassword from './pages/ChangePassword'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import UserProfile from './pages/UserProfile'
import Wallets from './pages/Wallets'
import Transactions from './pages/Transactions'
import ConversationMonitoring from './pages/ConversationMonitoring'
import MinutePricing from './pages/MinutePricing'
import Analytics from './pages/Analytics'
import Integrations from './pages/Integrations'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/forgot-password" element={<ForgotPassword />} />
      
      {/* Protected Routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/account/change-password" element={
        <ProtectedRoute>
          <ChangePassword />
        </ProtectedRoute>
      } />
      
      {/* User Management Routes */}
      <Route path="/admin/users" element={
        <ProtectedRoute>
          <Users />
        </ProtectedRoute>
      } />
      <Route path="/admin/users/:userId" element={
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      } />
      
      {/* Wallet & Payment Routes */}
      <Route path="/admin/wallets" element={
        <ProtectedRoute>
          <Wallets />
        </ProtectedRoute>
      } />
      <Route path="/admin/transactions" element={
        <ProtectedRoute>
          <Transactions />
        </ProtectedRoute>
      } />
      
      {/* AI Companion Management Routes */}
      <Route path="/admin/conversations" element={
        <ProtectedRoute>
          <ConversationMonitoring />
        </ProtectedRoute>
      } />
      <Route path="/admin/pricing" element={
        <ProtectedRoute>
          <MinutePricing />
        </ProtectedRoute>
      } />
      
      {/* Reporting & Analytics Routes */}
      <Route path="/admin/analytics" element={
        <ProtectedRoute>
          <Analytics />
        </ProtectedRoute>
      } />
      
      {/* Third-Party Integrations Routes */}
      <Route path="/admin/integrations" element={
        <ProtectedRoute>
          <Integrations />
        </ProtectedRoute>
      } />
      
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/admin/login" replace />} />
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  )
}

export default App

