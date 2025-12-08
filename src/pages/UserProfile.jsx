import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { usersAPI } from '../services/api'

const UserProfile = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showSuspendModal, setShowSuspendModal] = useState(false)
  const [showActivateModal, setShowActivateModal] = useState(false)

  useEffect(() => {
    fetchUser()
  }, [userId])

  const fetchUser = async () => {
    try {
      setIsLoading(true)
      const response = await usersAPI.getById(userId)
      if (response.success && response.data?.user) {
        const userData = response.data.user
        // Map backend user to frontend format
        setUser({
          id: userData._id || userData.id,
          _id: userData._id,
          name: userData.name || 'Unknown',
          email: userData.email || '',
          mobile: userData.mobileNo || '',
          mobileNo: userData.mobileNo || '',
          gender: userData.gender || '',
          age: userData.ageGroup ? parseInt(userData.ageGroup.split('-')[0]) || 25 : 25,
          ageGroup: userData.ageGroup || '',
          location: userData.location || 'N/A',
          registrationDate: userData.createdAt ? new Date(userData.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          status: userData.isActive === false ? 'suspended' : 'active',
          isActive: userData.isActive !== false,
          walletBalance: userData.walletBalance || 0,
          minutesBalance: userData.minutesBalance || 0,
          totalConversations: userData.conversationSessions?.length || 0,
          lastActive: userData.updatedAt ? new Date(userData.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          preferences: userData.preferences || {},
          memorySummary: userData.memorySummary || '',
        })
      } else {
        navigate('/admin/users')
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      alert('Failed to load user. Redirecting...')
      navigate('/admin/users')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuspend = async () => {
    try {
      const response = await usersAPI.suspend(userId)
      if (response.success) {
        setUser(prev => ({ ...prev, status: 'suspended', isActive: false }))
        setShowSuspendModal(false)
        alert('User account has been suspended successfully')
      } else {
        alert(response.message || 'Failed to suspend user')
      }
    } catch (error) {
      console.error('Error suspending user:', error)
      alert(error.response?.data?.message || 'Failed to suspend user. Please try again.')
    }
  }

  const handleActivate = async () => {
    try {
      const response = await usersAPI.activate(userId)
      if (response.success) {
        setUser(prev => ({ ...prev, status: 'active', isActive: true }))
        setShowActivateModal(false)
        alert('User account has been activated successfully')
      } else {
        alert(response.message || 'Failed to activate user')
      }
    } catch (error) {
      console.error('Error activating user:', error)
      alert(error.response?.data?.message || 'Failed to activate user. Please try again.')
    }
  }

  if (isLoading || !user) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-500">Loading user profile...</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/users')}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h2 className="text-3xl font-poppins font-semibold text-gray-800">
                User Profile
              </h2>
              <p className="text-sm font-montserrat text-gray-600">
                Detailed information about {user.name}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {user.status === 'active' ? (
              <button
                onClick={() => setShowSuspendModal(true)}
                className="px-4 py-2 bg-red-500 text-white text-sm font-montserrat rounded-lg hover:bg-red-600 transition-colors"
              >
                Suspend Account
              </button>
            ) : (
              <button
                onClick={() => setShowActivateModal(true)}
                className="px-4 py-2 bg-green-500 text-white text-sm font-montserrat rounded-lg hover:bg-green-600 transition-colors"
              >
                Activate Account
              </button>
            )}
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
          <div className="px-8 pb-8">
            <div className="flex items-start gap-6 -mt-16">
              <div className="w-32 h-32 bg-white rounded-xl shadow-lg flex items-center justify-center border-4 border-white">
                <span className="text-5xl font-poppins font-semibold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-purple-600">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 mt-16">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-poppins font-semibold text-gray-800">
                    {user.name}
                  </h3>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-montserrat font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm font-montserrat text-gray-600 mt-1">
                  User ID: {user.id} • Member since {new Date(user.registrationDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-poppins font-semibold text-gray-800 mb-4">
              Personal Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-montserrat text-gray-500 uppercase tracking-wide">Email Address</label>
                <p className="text-sm font-montserrat text-gray-800 mt-1">{user.email}</p>
              </div>
              <div>
                <label className="text-xs font-montserrat text-gray-500 uppercase tracking-wide">Mobile Number</label>
                <p className="text-sm font-montserrat text-gray-800 mt-1">{user.mobile}</p>
              </div>
              <div>
                <label className="text-xs font-montserrat text-gray-500 uppercase tracking-wide">Gender</label>
                <p className="text-sm font-montserrat text-gray-800 mt-1">{user.gender}</p>
              </div>
              <div>
                <label className="text-xs font-montserrat text-gray-500 uppercase tracking-wide">Age</label>
                <p className="text-sm font-montserrat text-gray-800 mt-1">{user.age} years</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-montserrat text-gray-500 uppercase tracking-wide">Location</label>
                <p className="text-sm font-montserrat text-gray-800 mt-1">{user.location}</p>
              </div>
              <div>
                <label className="text-xs font-montserrat text-gray-500 uppercase tracking-wide">Registration Date</label>
                <p className="text-sm font-montserrat text-gray-800 mt-1">
                  {new Date(user.registrationDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <label className="text-xs font-montserrat text-gray-500 uppercase tracking-wide">Last Active</label>
                <p className="text-sm font-montserrat text-gray-800 mt-1">
                  {new Date(user.lastActive).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Activity Overview */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-poppins font-semibold text-gray-800 mb-4">
                Wallet Balance
              </h4>
              <div className="text-center py-4">
                <p className="text-4xl font-poppins font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  ₹{user.walletBalance.toFixed(2)}
                </p>
                <button
                  onClick={() => navigate('/admin/wallets')}
                  className="mt-4 text-sm font-montserrat text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Manage Wallet →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-poppins font-semibold text-gray-800 mb-4">
                Activity Stats
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-montserrat text-gray-600">Total Conversations</span>
                  <span className="text-sm font-montserrat font-semibold text-gray-800">{user.totalConversations}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-montserrat text-gray-600">Account Status</span>
                  <span className={`text-sm font-montserrat font-semibold ${
                    user.status === 'active' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conversation Notes Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-poppins font-semibold text-gray-800 mb-4">
            Conversation Notes Overview
          </h4>
          <div className="text-center py-8">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className="text-sm font-montserrat text-gray-500">
              User has {user.totalConversations} conversation sessions
            </p>
          </div>
        </div>
      </div>

      {/* Suspend Modal */}
      {showSuspendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-poppins font-semibold text-gray-800">
                  Suspend User Account
                </h3>
              </div>
            </div>
            <p className="text-sm font-montserrat text-gray-600 mb-6">
              Are you sure you want to suspend <strong>{user.name}'s</strong> account? They will not be able to access the application until reactivated.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleSuspend}
                className="flex-1 py-2 bg-red-500 text-white text-sm font-montserrat rounded-lg hover:bg-red-600 transition-colors"
              >
                Suspend Account
              </button>
              <button
                onClick={() => setShowSuspendModal(false)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm font-montserrat rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activate Modal */}
      {showActivateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-poppins font-semibold text-gray-800">
                  Activate User Account
                </h3>
              </div>
            </div>
            <p className="text-sm font-montserrat text-gray-600 mb-6">
              Are you sure you want to activate <strong>{user.name}'s</strong> account? They will regain full access to the application.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleActivate}
                className="flex-1 py-2 bg-green-500 text-white text-sm font-montserrat rounded-lg hover:bg-green-600 transition-colors"
              >
                Activate Account
              </button>
              <button
                onClick={() => setShowActivateModal(false)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm font-montserrat rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default UserProfile

