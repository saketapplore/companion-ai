import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { mockUsers, mockTransactions } from '../data/mockData'

const Dashboard = () => {
  const navigate = useNavigate()
  const adminEmail = localStorage.getItem('adminEmail') || 'admin@example.com'

  // Apply updates from localStorage
  const getUsersWithUpdates = () => {
    const userStatusUpdates = JSON.parse(localStorage.getItem('userStatusUpdates') || '{}')
    const walletUpdates = JSON.parse(localStorage.getItem('walletBalanceUpdates') || '{}')
    return mockUsers.map(user => ({
      ...user,
      status: userStatusUpdates[user.id] || user.status,
      walletBalance: walletUpdates[user.id] !== undefined ? walletUpdates[user.id] : user.walletBalance
    }))
  }
  
  const usersWithUpdates = getUsersWithUpdates()
  const totalUsers = usersWithUpdates.length
  const activeUsers = usersWithUpdates.filter(u => u.status === 'active').length
  const totalBalance = usersWithUpdates.reduce((sum, u) => sum + u.walletBalance, 0)
  const totalTransactions = mockTransactions.length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-poppins font-semibold mb-2">
            Welcome Back, Admin!
          </h2>
          <p className="font-montserrat text-blue-100">
            Logged in as: {adminEmail}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div 
            onClick={() => navigate('/admin/users')}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-montserrat text-gray-600">Total Users</p>
                <p className="text-2xl font-poppins font-semibold text-gray-800">{totalUsers}</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => navigate('/admin/users')}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-montserrat text-gray-600">Active Users</p>
                <p className="text-2xl font-poppins font-semibold text-gray-800">{activeUsers}</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => navigate('/admin/wallets')}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-montserrat text-gray-600">Total Balance</p>
                <p className="text-2xl font-poppins font-semibold text-gray-800">₹{totalBalance.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => navigate('/admin/transactions')}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-montserrat text-gray-600">Transactions</p>
                <p className="text-2xl font-poppins font-semibold text-gray-800">{totalTransactions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Management Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-poppins font-semibold text-gray-800">
                User Management
              </h3>
            </div>
            <p className="text-sm font-montserrat text-gray-600 mb-4">
              View and manage all registered users, access user profiles, and control account status.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/admin/users')}
                className="w-full text-left px-4 py-2 text-sm font-montserrat text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                → View All Users
              </button>
              <button
                onClick={() => navigate('/admin/users')}
                className="w-full text-left px-4 py-2 text-sm font-montserrat text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                → Search & Filter Users
              </button>
            </div>
          </div>

          {/* Wallet & Payment Management Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-poppins font-semibold text-gray-800">
                Wallet & Payments
              </h3>
            </div>
            <p className="text-sm font-montserrat text-gray-600 mb-4">
              Manage user wallets, adjust balances, and view transaction history across the platform.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/admin/wallets')}
                className="w-full text-left px-4 py-2 text-sm font-montserrat text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              >
                → Wallet Balances
              </button>
              <button
                onClick={() => navigate('/admin/transactions')}
                className="w-full text-left px-4 py-2 text-sm font-montserrat text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              >
                → Transaction History
              </button>
            </div>
          </div>

          {/* Analytics Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-poppins font-semibold text-gray-800">
                Analytics & Reporting
              </h3>
            </div>
            <p className="text-sm font-montserrat text-gray-600 mb-4">
              View platform analytics including sales figures, minutes consumed, and user trends.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/admin/analytics')}
                className="w-full text-left px-4 py-2 text-sm font-montserrat text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                → View Analytics Dashboard
              </button>
              <button
                onClick={() => navigate('/admin/analytics')}
                className="w-full text-left px-4 py-2 text-sm font-montserrat text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                → Sales & Usage Reports
              </button>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-poppins font-semibold text-gray-800">
              Recent Transactions
            </h3>
            <button
              onClick={() => navigate('/admin/transactions')}
              className="text-sm font-montserrat text-blue-600 hover:text-blue-700 transition-colors"
            >
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {mockTransactions.slice(0, 5).map(txn => (
              <div key={txn.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    txn.type === 'recharge' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    <svg className={`w-5 h-5 ${
                      txn.type === 'recharge' ? 'text-green-600' : 'text-blue-600'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-montserrat font-medium text-gray-800">
                      {txn.userName}
                    </p>
                    <p className="text-xs font-montserrat text-gray-500">
                      {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)} • {txn.date}
                    </p>
                  </div>
                </div>
                <p className={`text-sm font-montserrat font-semibold ${
                  txn.amount > 0 ? 'text-green-600' : 'text-gray-800'
                }`}>
                  {txn.amount > 0 ? '+' : ''}{txn.amount < 0 ? '-' : ''}₹{Math.abs(txn.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard

