import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { walletAPI } from '../services/api'

const Wallets = () => {
  const navigate = useNavigate()
  
  const [wallets, setWallets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAdjustModal, setShowAdjustModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [adjustmentData, setAdjustmentData] = useState({
    type: 'credit',
    amount: '',
    notes: ''
  })
  const [errors, setErrors] = useState({})
  const [isAdjusting, setIsAdjusting] = useState(false)
  
  // Fetch wallets when component mounts
  useEffect(() => {
    fetchWallets()
  }, [])
  
  const fetchWallets = async () => {
    try {
      setIsLoading(true)
      const response = await walletAPI.getAllWallets({ search: searchTerm })
      if (response.success && response.data) {
        setWallets(response.data.wallets || [])
      }
    } catch (error) {
      console.error('Error fetching wallets:', error)
      alert('Failed to load wallets. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  // Refetch when search changes
  useEffect(() => {
    if (!isLoading) {
      fetchWallets()
    }
  }, [searchTerm])

  const filteredWallets = wallets.filter(wallet =>
    wallet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (wallet.email && wallet.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (wallet.mobileNo && wallet.mobileNo.includes(searchTerm))
  )

  const totalBalance = wallets.reduce((sum, wallet) => sum + (wallet.walletBalance || 0), 0)

  const openAdjustModal = (user) => {
    setSelectedUser(user)
    setAdjustmentData({
      type: 'credit',
      amount: '',
      notes: ''
    })
    setErrors({})
    setShowAdjustModal(true)
  }

  const handleAdjustmentChange = (field, value) => {
    setAdjustmentData(prev => ({
      ...prev,
      [field]: value
    }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateAdjustment = () => {
    const newErrors = {}
    
    if (!adjustmentData.amount || parseFloat(adjustmentData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0'
    }
    
    if (!adjustmentData.notes.trim()) {
      newErrors.notes = 'Please provide a reason for this adjustment'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAdjustBalance = async () => {
    if (!validateAdjustment()) {
      return
    }

    const amount = parseFloat(adjustmentData.amount)
    const currentBalance = selectedUser.walletBalance || 0

    if (adjustmentData.type === 'debit' && currentBalance < amount) {
      setErrors({ amount: 'Insufficient balance for debit' })
      return
    }

    try {
      setIsAdjusting(true)
      const response = await walletAPI.adjustBalance(
        selectedUser.userId || selectedUser.id,
        amount,
        adjustmentData.type,
        adjustmentData.notes
      )
      
      if (response.success) {
        // Refresh wallets
        await fetchWallets()
        
        // Close modal and reset
        setShowAdjustModal(false)
        setAdjustmentData({
          type: 'credit',
          amount: '',
          notes: ''
        })
        setSelectedUser(null)
        setErrors({})
        
        alert(`Wallet balance adjusted successfully!`)
      } else {
        alert(response.message || 'Failed to adjust balance')
      }
    } catch (error) {
      console.error('Error adjusting balance:', error)
      alert(error.response?.data?.message || 'Failed to adjust balance. Please try again.')
    } finally {
      setIsAdjusting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-poppins font-semibold text-gray-800 mb-2">
            Wallet Management
          </h2>
          <p className="text-sm font-montserrat text-gray-600">
            View and manage user wallet balances
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-montserrat opacity-90">Total Platform Balance</p>
              <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
              <p className="text-4xl font-poppins font-semibold">₹{totalBalance.toFixed(2)}</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-montserrat opacity-90">Active Wallets</p>
              <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-4xl font-poppins font-semibold">
              {wallets.filter(w => w.status === 'active').length}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-montserrat opacity-90">Average Balance</p>
              <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
              <p className="text-4xl font-poppins font-semibold">
                ₹{wallets.length > 0 ? (totalBalance / wallets.length).toFixed(2) : '0.00'}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
          <p className="text-sm font-montserrat text-gray-600 mt-3">
            Showing <span className="font-semibold">{filteredWallets.length}</span> of <span className="font-semibold">{wallets.length}</span> wallets
          </p>
        </div>

        {/* Wallets Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-2 text-sm text-gray-500">Loading wallets...</p>
            </div>
          ) : (
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
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-montserrat font-semibold text-gray-700 uppercase tracking-wider">
                      Wallet Balance
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-montserrat font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredWallets.length > 0 ? (
                    filteredWallets.map((wallet) => (
                      <tr key={wallet.id || wallet.userId} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-poppins font-semibold">
                              {wallet.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-montserrat font-semibold text-gray-800">
                                {wallet.name}
                              </p>
                              <p className="text-xs font-montserrat text-gray-500">
                                ID: {wallet.userId || wallet.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-montserrat text-gray-800">
                            {wallet.email || 'N/A'}
                          </p>
                          <p className="text-xs font-montserrat text-gray-500">
                            {wallet.mobileNo || 'N/A'}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-montserrat font-medium ${
                            wallet.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {wallet.status.charAt(0).toUpperCase() + wallet.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-lg font-poppins font-semibold text-gray-800">
                            ₹{(wallet.walletBalance || 0).toFixed(2)}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <button
                        onClick={() => openAdjustModal(wallet)}
                        className="text-sm font-montserrat text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Adjust Balance
                      </button>
                    </td>
                  </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <p className="text-sm font-montserrat text-gray-500">
                          No wallets found
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Adjust Balance Modal */}
      {showAdjustModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-poppins font-semibold text-gray-800 mb-4">
              Adjust Wallet Balance
            </h3>
            
            <div className="mb-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <p className="text-sm font-montserrat text-blue-900">
                <strong>{selectedUser.name}</strong>
              </p>
              <p className="text-xs font-montserrat text-blue-700 mt-1">
                Current Balance: <strong>₹{(selectedUser.walletBalance || 0).toFixed(2)}</strong>
              </p>
            </div>

            <div className="space-y-4">
              {/* Type Selection */}
              <div>
                <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                  Adjustment Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleAdjustmentChange('type', 'credit')}
                    className={`py-2 px-4 rounded-lg text-sm font-montserrat font-medium transition-all ${
                      adjustmentData.type === 'credit'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Credit (+)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAdjustmentChange('type', 'debit')}
                    className={`py-2 px-4 rounded-lg text-sm font-montserrat font-medium transition-all ${
                      adjustmentData.type === 'debit'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Debit (-)
                  </button>
                </div>
              </div>

              {/* Amount */}
            <div>
              <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                Amount (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={adjustmentData.amount}
                  onChange={(e) => handleAdjustmentChange('amount', e.target.value)}
                  className="input-field"
                  placeholder="0.00"
                />
                {errors.amount && (
                  <p className="error-message">{errors.amount}</p>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                  Notes / Reason
                </label>
                <textarea
                  value={adjustmentData.notes}
                  onChange={(e) => handleAdjustmentChange('notes', e.target.value)}
                  className="input-field resize-none"
                  rows="3"
                  placeholder="Provide a reason for this adjustment (e.g., reconciliation, compensation)"
                />
                {errors.notes && (
                  <p className="error-message">{errors.notes}</p>
                )}
              </div>

              {/* Preview */}
              {adjustmentData.amount && (
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs font-montserrat text-gray-600 mb-1">New Balance Preview:</p>
                  <p className="text-lg font-poppins font-semibold text-gray-800">
                    ₹{adjustmentData.type === 'credit'
                      ? ((selectedUser.walletBalance || 0) + parseFloat(adjustmentData.amount || 0)).toFixed(2)
                      : ((selectedUser.walletBalance || 0) - parseFloat(adjustmentData.amount || 0)).toFixed(2)
                    }
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAdjustBalance}
                disabled={isAdjusting}
                className={`flex-1 py-2 text-white text-sm font-montserrat rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  adjustmentData.type === 'credit'
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {isAdjusting ? 'Processing...' : 'Confirm Adjustment'}
              </button>
              <button
                onClick={() => setShowAdjustModal(false)}
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

export default Wallets

