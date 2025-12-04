import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { mockUsers } from '../data/mockData'

const Users = () => {
  const navigate = useNavigate()
  
  // Apply status and wallet updates from localStorage
  const getUsersWithUpdates = () => {
    const userStatusUpdates = JSON.parse(localStorage.getItem('userStatusUpdates') || '{}')
    const walletUpdates = JSON.parse(localStorage.getItem('walletBalanceUpdates') || '{}')
    return mockUsers.map(user => ({
      ...user,
      status: userStatusUpdates[user.id] || user.status,
      walletBalance: walletUpdates[user.id] !== undefined ? walletUpdates[user.id] : user.walletBalance
    }))
  }
  
  const [users, setUsers] = useState(getUsersWithUpdates())
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    gender: '',
    ageRange: '',
    location: '',
    status: ''
  })
  
  // Refresh users when component mounts or when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setUsers(getUsersWithUpdates())
    }
    
    window.addEventListener('storage', handleStorageChange)
    // Also check on mount
    setUsers(getUsersWithUpdates())
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobile.includes(searchTerm)

      const matchesGender = !filters.gender || user.gender === filters.gender
      const matchesStatus = !filters.status || user.status === filters.status
      const matchesLocation = !filters.location || user.location.toLowerCase().includes(filters.location.toLowerCase())
      
      let matchesAge = true
      if (filters.ageRange) {
        if (filters.ageRange === '18-25') matchesAge = user.age >= 18 && user.age <= 25
        else if (filters.ageRange === '26-35') matchesAge = user.age >= 26 && user.age <= 35
        else if (filters.ageRange === '36+') matchesAge = user.age >= 36
      }

      return matchesSearch && matchesGender && matchesStatus && matchesLocation && matchesAge
    })
  }, [users, searchTerm, filters])

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  const clearFilters = () => {
    setSearchTerm('')
    setFilters({
      gender: '',
      ageRange: '',
      location: '',
      status: ''
    })
  }

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return 'bg-green-100 text-green-800'
    } else if (status === 'suspended') {
      return 'bg-red-100 text-red-800'
    }
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-poppins font-semibold text-gray-800 mb-2">
            User Management
          </h2>
          <p className="text-sm font-montserrat text-gray-600">
            View and manage all registered users
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, email, or mobile number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={filters.gender}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
                className="input-field"
              >
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <select
                value={filters.ageRange}
                onChange={(e) => handleFilterChange('ageRange', e.target.value)}
                className="input-field"
              >
                <option value="">All Ages</option>
                <option value="18-25">18-25 years</option>
                <option value="26-35">26-35 years</option>
                <option value="36+">36+ years</option>
              </select>

              <input
                type="text"
                placeholder="Filter by location..."
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="input-field"
              />

              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="input-field"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-montserrat text-gray-600">
                Showing <span className="font-semibold">{filteredUsers.length}</span> of <span className="font-semibold">{users.length}</span> users
              </p>
              <button
                onClick={clearFilters}
                className="text-sm font-montserrat text-blue-600 hover:text-blue-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-montserrat font-semibold text-gray-700 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-montserrat font-semibold text-gray-700 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-montserrat font-semibold text-gray-700 uppercase tracking-wider">
                    Demographics
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-montserrat font-semibold text-gray-700 uppercase tracking-wider">
                    Registration
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-montserrat font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-montserrat font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-poppins font-semibold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-montserrat font-semibold text-gray-800">
                              {user.name}
                            </p>
                            <p className="text-xs font-montserrat text-gray-500">
                              ID: {user.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-montserrat text-gray-800">
                          {user.email}
                        </p>
                        <p className="text-xs font-montserrat text-gray-500">
                          {user.mobile}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-montserrat text-gray-800">
                          {user.gender}, {user.age} years
                        </p>
                        <p className="text-xs font-montserrat text-gray-500">
                          {user.location}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-montserrat text-gray-800">
                          {new Date(user.registrationDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-montserrat font-medium ${getStatusBadge(user.status)}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => navigate(`/admin/users/${user.id}`)}
                          className="text-sm font-montserrat text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          View Details →
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <p className="text-sm font-montserrat text-gray-500">
                        No users found matching your criteria
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-xs font-montserrat text-blue-700 mb-1">Total Users</p>
            <p className="text-2xl font-poppins font-semibold text-blue-900">{users.length}</p>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <p className="text-xs font-montserrat text-green-700 mb-1">Active Users</p>
            <p className="text-2xl font-poppins font-semibold text-green-900">
              {users.filter(u => u.status === 'active').length}
            </p>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-lg p-4">
            <p className="text-xs font-montserrat text-red-700 mb-1">Suspended Users</p>
            <p className="text-2xl font-poppins font-semibold text-red-900">
              {users.filter(u => u.status === 'suspended').length}
            </p>
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
            <p className="text-xs font-montserrat text-purple-700 mb-1">Total Wallet Balance</p>
            <p className="text-2xl font-poppins font-semibold text-purple-900">
              ${users.reduce((sum, u) => sum + u.walletBalance, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Users

