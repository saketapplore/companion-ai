import { useState, useMemo } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { mockTransactions } from '../data/mockData'

const Transactions = () => {
  const [transactions] = useState(mockTransactions)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    amountMin: '',
    amountMax: ''
  })

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(txn => {
      const matchesSearch = 
        txn.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.userId.toString().includes(searchTerm)

      const matchesType = !filters.type || txn.type === filters.type
      const matchesStatus = !filters.status || txn.status === filters.status

      const matchesDateFrom = !filters.dateFrom || new Date(txn.date) >= new Date(filters.dateFrom)
      const matchesDateTo = !filters.dateTo || new Date(txn.date) <= new Date(filters.dateTo)

      const matchesAmountMin = !filters.amountMin || Math.abs(txn.amount) >= parseFloat(filters.amountMin)
      const matchesAmountMax = !filters.amountMax || Math.abs(txn.amount) <= parseFloat(filters.amountMax)

      return matchesSearch && matchesType && matchesStatus && matchesDateFrom && matchesDateTo && matchesAmountMin && matchesAmountMax
    })
  }, [transactions, searchTerm, filters])

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  const clearFilters = () => {
    setSearchTerm('')
    setFilters({
      type: '',
      status: '',
      dateFrom: '',
      dateTo: '',
      amountMin: '',
      amountMax: ''
    })
  }

  const exportToCSV = () => {
    const headers = ['Transaction ID', 'Date', 'Time', 'User', 'Type', 'Amount', 'Status', 'Description']
    const csvData = filteredTransactions.map(txn => [
      txn.transactionId,
      txn.date,
      txn.time,
      txn.userName,
      txn.type,
      txn.amount,
      txn.status,
      txn.description || txn.paymentMethod || ''
    ])

    const csv = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const getTypeStyles = (type) => {
    switch(type) {
      case 'recharge':
        return 'bg-green-100 text-green-800'
      case 'purchase':
        return 'bg-blue-100 text-blue-800'
      case 'refund':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusStyles = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Calculate stats
  const totalAmount = filteredTransactions.reduce((sum, txn) => sum + Math.abs(txn.amount), 0)
  const totalRecharges = filteredTransactions.filter(t => t.type === 'recharge').reduce((sum, t) => sum + t.amount, 0)
  const totalPurchases = filteredTransactions.filter(t => t.type === 'purchase').reduce((sum, t) => sum + Math.abs(t.amount), 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-poppins font-semibold text-gray-800 mb-2">
              Transaction History
            </h2>
            <p className="text-sm font-montserrat text-gray-600">
              View and manage all wallet transactions
            </p>
          </div>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-montserrat rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-xs font-montserrat text-blue-700 mb-1">Total Transactions</p>
            <p className="text-2xl font-poppins font-semibold text-blue-900">{filteredTransactions.length}</p>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <p className="text-xs font-montserrat text-green-700 mb-1">Total Recharges</p>
            <p className="text-2xl font-poppins font-semibold text-green-900">${totalRecharges.toFixed(2)}</p>
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
            <p className="text-xs font-montserrat text-purple-700 mb-1">Total Purchases</p>
            <p className="text-2xl font-poppins font-semibold text-purple-900">${totalPurchases.toFixed(2)}</p>
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
            <p className="text-xs font-montserrat text-orange-700 mb-1">Transaction Volume</p>
            <p className="text-2xl font-poppins font-semibold text-orange-900">${totalAmount.toFixed(2)}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by transaction ID, user name, or user ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filters Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="input-field"
              >
                <option value="">All Types</option>
                <option value="recharge">Recharge</option>
                <option value="purchase">Purchase</option>
                <option value="refund">Refund</option>
              </select>

              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="input-field"
              >
                <option value="">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>

              <input
                type="date"
                placeholder="From Date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                className="input-field"
              />

              <input
                type="date"
                placeholder="To Date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                className="input-field"
              />
            </div>

            {/* Filters Row 2 - Amount Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                step="0.01"
                placeholder="Min Amount"
                value={filters.amountMin}
                onChange={(e) => handleFilterChange('amountMin', e.target.value)}
                className="input-field"
              />

              <input
                type="number"
                step="0.01"
                placeholder="Max Amount"
                value={filters.amountMax}
                onChange={(e) => handleFilterChange('amountMax', e.target.value)}
                className="input-field"
              />
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-montserrat text-gray-600">
                Showing <span className="font-semibold">{filteredTransactions.length}</span> of <span className="font-semibold">{transactions.length}</span> transactions
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

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-montserrat font-semibold text-gray-700 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-montserrat font-semibold text-gray-700 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-montserrat font-semibold text-gray-700 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-montserrat font-semibold text-gray-700 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-montserrat font-semibold text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-montserrat font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-montserrat font-semibold text-gray-700 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((txn) => (
                    <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-montserrat font-medium text-gray-800">
                          {txn.transactionId}
                        </p>
                        <p className="text-xs font-montserrat text-gray-500">
                          ID: {txn.id}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-montserrat text-gray-800">
                          {new Date(txn.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-xs font-montserrat text-gray-500">
                          {txn.time}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-montserrat font-medium text-gray-800">
                          {txn.userName}
                        </p>
                        <p className="text-xs font-montserrat text-gray-500">
                          User ID: {txn.userId}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-montserrat font-medium ${getTypeStyles(txn.type)}`}>
                          {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className={`text-lg font-poppins font-semibold ${
                          txn.amount > 0 ? 'text-green-600' : 'text-gray-800'
                        }`}>
                          {txn.amount > 0 ? '+' : ''}{txn.amount < 0 ? '-' : ''}${Math.abs(txn.amount).toFixed(2)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-montserrat font-medium ${getStatusStyles(txn.status)}`}>
                          {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-montserrat text-gray-600">
                          {txn.description || txn.paymentMethod || '-'}
                        </p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <p className="text-sm font-montserrat text-gray-500">
                        No transactions found matching your criteria
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Transactions

