import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { mockAnalytics } from '../data/mockData'

const Analytics = () => {
  const navigate = useNavigate()
  const [timeRange, setTimeRange] = useState('thisMonth')
  const analytics = mockAnalytics

  const getTimeRangeLabel = () => {
    switch(timeRange) {
      case 'today': return 'Today'
      case 'thisWeek': return 'This Week'
      case 'thisMonth': return 'This Month'
      case 'lastMonth': return 'Last Month'
      default: return 'This Month'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-poppins font-semibold text-gray-800 mb-2">
              User Analytics
            </h2>
            <p className="text-sm font-montserrat text-gray-600">
              Platform analytics including sales figures and minutes consumed
            </p>
          </div>

          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-montserrat focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Today</option>
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
          </select>
        </div>

        {/* Key Metrics - Sales & Minutes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sales Figures Card */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-montserrat opacity-90 mb-1">
                  Sales Figures - {getTimeRangeLabel()}
                </p>
                <h3 className="text-4xl font-poppins font-bold">
                  ₹{analytics.salesFigures[timeRange]?.toFixed(2) || '0.00'}
                </h3>
              </div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-1 bg-white bg-opacity-20 rounded text-xs font-montserrat">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                +{analytics.salesFigures.growth}% growth
              </span>
              <span className="text-xs font-montserrat opacity-75">vs last period</span>
            </div>
          </div>

          {/* Minutes Consumed Card */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-montserrat opacity-90 mb-1">
                  Minutes Consumed - {getTimeRangeLabel()}
                </p>
                <h3 className="text-4xl font-poppins font-bold">
                  {analytics.minutesConsumed[timeRange]?.toLocaleString() || '0'}
                </h3>
              </div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-montserrat opacity-75">
                Avg per user: {analytics.minutesConsumed.avgPerUser} minutes
              </span>
            </div>
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-xs font-montserrat text-gray-600 mb-1">Total Revenue</p>
            <p className="text-2xl font-poppins font-semibold text-gray-800">
              ₹{analytics.salesFigures.totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-xs font-montserrat text-gray-600 mb-1">Total Minutes</p>
            <p className="text-2xl font-poppins font-semibold text-gray-800">
              {analytics.minutesConsumed.total.toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-xs font-montserrat text-gray-600 mb-1">Total Users</p>
            <p className="text-2xl font-poppins font-semibold text-gray-800">
              {analytics.userStatistics.totalUsers}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-xs font-montserrat text-gray-600 mb-1">Active Users</p>
            <p className="text-2xl font-poppins font-semibold text-green-600">
              {analytics.userStatistics.activeUsers}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-xs font-montserrat text-gray-600 mb-1">Retention Rate</p>
            <p className="text-2xl font-poppins font-semibold text-gray-800">
              {analytics.userStatistics.retentionRate}%
            </p>
          </div>
        </div>

        {/* Revenue & Minutes Trends */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-poppins font-semibold text-gray-800 mb-4">
              Revenue Trend (Last 6 Months)
            </h3>
            <div className="space-y-3">
              {analytics.revenueByMonth.map((data, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-sm font-montserrat text-gray-600 w-12">{data.month}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-full flex items-center justify-end pr-2 transition-all duration-500"
                      style={{ width: `${(data.revenue / 7000) * 100}%` }}
                    >
                      <span className="text-xs font-montserrat text-white font-semibold">
                        ₹{data.revenue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Minutes Consumed Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-poppins font-semibold text-gray-800 mb-4">
              Minutes Consumed (Last 6 Months)
            </h3>
            <div className="space-y-3">
              {analytics.minutesByMonth.map((data, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-sm font-montserrat text-gray-600 w-12">{data.month}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full flex items-center justify-end pr-2 transition-all duration-500"
                      style={{ width: `${(data.minutes / 2500) * 100}%` }}
                    >
                      <span className="text-xs font-montserrat text-white font-semibold">
                        {data.minutes.toLocaleString()} min
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Users & Popular Companions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Users */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-poppins font-semibold text-gray-800">
                Top Users by Usage
              </h3>
              <button
                onClick={() => navigate('/admin/users')}
                className="text-sm font-montserrat text-blue-600 hover:text-blue-700 transition-colors"
              >
                View All →
              </button>
            </div>
            <div className="space-y-3">
              {analytics.topUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-poppins font-semibold">
                      {user.rank}
                    </div>
                    <div>
                      <p className="text-sm font-montserrat font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs font-montserrat text-gray-500">{user.minutesUsed} minutes</p>
                    </div>
                  </div>
                  <span className="text-sm font-poppins font-semibold text-green-600">
                    ₹{user.spent.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular AI Companions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-poppins font-semibold text-gray-800">
                Popular AI Companions
              </h3>
              <button
                onClick={() => navigate('/admin/conversations')}
                className="text-sm font-montserrat text-blue-600 hover:text-blue-700 transition-colors"
              >
                View All →
              </button>
            </div>
            <div className="space-y-3">
              {analytics.popularCompanions.map((companion, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-poppins font-semibold">
                      {companion.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-montserrat font-semibold text-gray-800">{companion.name}</p>
                      <p className="text-xs font-montserrat text-gray-500">{companion.sessions} sessions • {companion.totalMinutes} min</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-montserrat font-semibold text-gray-800">{companion.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transaction Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-poppins font-semibold text-gray-800 mb-4">
            Transaction Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
              <svg className="w-12 h-12 text-green-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <p className="text-2xl font-poppins font-semibold text-green-900 mb-1">
                {analytics.transactionBreakdown.recharges.count}
              </p>
              <p className="text-sm font-montserrat text-green-700 mb-2">Recharges</p>
              <p className="text-lg font-poppins font-semibold text-green-900">
                ₹{analytics.transactionBreakdown.recharges.amount.toLocaleString()}
              </p>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
              <svg className="w-12 h-12 text-blue-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-2xl font-poppins font-semibold text-blue-900 mb-1">
                {analytics.transactionBreakdown.purchases.count}
              </p>
              <p className="text-sm font-montserrat text-blue-700 mb-2">Purchases</p>
              <p className="text-lg font-poppins font-semibold text-blue-900">
                ₹{analytics.transactionBreakdown.purchases.amount.toLocaleString()}
              </p>
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-100">
              <svg className="w-12 h-12 text-orange-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
              </svg>
              <p className="text-2xl font-poppins font-semibold text-orange-900 mb-1">
                {analytics.transactionBreakdown.refunds.count}
              </p>
              <p className="text-sm font-montserrat text-orange-700 mb-2">Refunds</p>
              <p className="text-lg font-poppins font-semibold text-orange-900">
                ₹{analytics.transactionBreakdown.refunds.amount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Peak Usage Hours */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-poppins font-semibold text-gray-800 mb-4">
            Peak Usage Hours
          </h3>
          <div className="flex items-end justify-between gap-2 h-64">
            {analytics.peakUsageHours.map((data, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gray-100 rounded-t-lg overflow-hidden flex items-end" style={{ height: '200px' }}>
                  <div 
                    className="w-full bg-gradient-to-t from-purple-500 to-purple-600 rounded-t-lg transition-all duration-500 flex items-start justify-center pt-2"
                    style={{ height: `${(data.sessions / 15) * 100}%` }}
                  >
                    <span className="text-sm font-montserrat text-white font-semibold">{data.sessions}</span>
                  </div>
                </div>
                <span className="text-xs font-montserrat text-gray-600">{data.hour}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/admin/users')}
            className="p-4 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors text-left"
          >
            <p className="text-sm font-poppins font-semibold text-blue-900 mb-1">View User Details</p>
            <p className="text-xs font-montserrat text-blue-700">Manage and monitor all users</p>
          </button>
          <button
            onClick={() => navigate('/admin/transactions')}
            className="p-4 bg-green-50 border border-green-100 rounded-lg hover:bg-green-100 transition-colors text-left"
          >
            <p className="text-sm font-poppins font-semibold text-green-900 mb-1">View Transactions</p>
            <p className="text-xs font-montserrat text-green-700">Detailed transaction history</p>
          </button>
          <button
            onClick={() => navigate('/admin/conversations')}
            className="p-4 bg-purple-50 border border-purple-100 rounded-lg hover:bg-purple-100 transition-colors text-left"
          >
            <p className="text-sm font-poppins font-semibold text-purple-900 mb-1">View Conversations</p>
            <p className="text-xs font-montserrat text-purple-700">Monitor AI interactions</p>
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Analytics



