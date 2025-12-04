import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { mockConversations, mockUsers } from '../data/mockData'

const ConversationMonitoring = () => {
  const navigate = useNavigate()
  const [conversations] = useState(mockConversations)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    sentiment: '',
    dateFrom: '',
    dateTo: '',
    minDuration: '',
    maxDuration: '',
    minQuality: ''
  })
  const [selectedConversation, setSelectedConversation] = useState(null)

  // Filter conversations
  const filteredConversations = useMemo(() => {
    return conversations.filter(conv => {
      const matchesSearch = 
        conv.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.companionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesSentiment = !filters.sentiment || conv.sentiment === filters.sentiment
      const matchesDateFrom = !filters.dateFrom || new Date(conv.date) >= new Date(filters.dateFrom)
      const matchesDateTo = !filters.dateTo || new Date(conv.date) <= new Date(filters.dateTo)
      const matchesMinDuration = !filters.minDuration || conv.duration >= parseFloat(filters.minDuration)
      const matchesMaxDuration = !filters.maxDuration || conv.duration <= parseFloat(filters.maxDuration)
      const matchesMinQuality = !filters.minQuality || conv.qualityScore >= parseFloat(filters.minQuality)

      return matchesSearch && matchesSentiment && matchesDateFrom && matchesDateTo && 
             matchesMinDuration && matchesMaxDuration && matchesMinQuality
    })
  }, [conversations, searchTerm, filters])

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  const clearFilters = () => {
    setSearchTerm('')
    setFilters({
      sentiment: '',
      dateFrom: '',
      dateTo: '',
      minDuration: '',
      maxDuration: '',
      minQuality: ''
    })
  }

  const getSentimentBadge = (sentiment) => {
    switch(sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800'
      case 'neutral':
        return 'bg-gray-100 text-gray-800'
      case 'negative':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getQualityColor = (score) => {
    if (score >= 9) return 'text-green-600'
    if (score >= 7) return 'text-blue-600'
    return 'text-orange-600'
  }

  // Calculate stats
  const avgDuration = filteredConversations.reduce((sum, c) => sum + c.duration, 0) / filteredConversations.length || 0
  const avgQuality = filteredConversations.reduce((sum, c) => sum + c.qualityScore, 0) / filteredConversations.length || 0
  const positiveCount = filteredConversations.filter(c => c.sentiment === 'positive').length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-poppins font-semibold text-gray-800 mb-2">
            AI Conversation Monitoring
          </h2>
          <p className="text-sm font-montserrat text-gray-600">
            View summarized conversation notes for quality assurance and improvement
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-sm font-poppins font-semibold text-blue-900 mb-1">
                Privacy & Compliance
              </h4>
              <p className="text-xs font-montserrat text-blue-800">
                All conversation summaries are reviewed in accordance with privacy policies. Personal identifiable information is protected and used solely for quality assurance and service improvement.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-xs font-montserrat text-gray-600 mb-1">Total Conversations</p>
            <p className="text-2xl font-poppins font-semibold text-gray-800">{filteredConversations.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-xs font-montserrat text-gray-600 mb-1">Avg Duration</p>
            <p className="text-2xl font-poppins font-semibold text-gray-800">{avgDuration.toFixed(1)} min</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-xs font-montserrat text-gray-600 mb-1">Avg Quality Score</p>
            <p className="text-2xl font-poppins font-semibold text-gray-800">{avgQuality.toFixed(1)}/10</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-xs font-montserrat text-gray-600 mb-1">Positive Sentiment</p>
            <p className="text-2xl font-poppins font-semibold text-gray-800">{positiveCount}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by user, companion, summary, or topics..."
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
                value={filters.sentiment}
                onChange={(e) => handleFilterChange('sentiment', e.target.value)}
                className="input-field"
              >
                <option value="">All Sentiments</option>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
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

              <input
                type="number"
                step="0.1"
                placeholder="Min Quality Score"
                value={filters.minQuality}
                onChange={(e) => handleFilterChange('minQuality', e.target.value)}
                className="input-field"
              />
            </div>

            {/* Filters Row 2 - Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Min Duration (minutes)"
                value={filters.minDuration}
                onChange={(e) => handleFilterChange('minDuration', e.target.value)}
                className="input-field"
              />

              <input
                type="number"
                placeholder="Max Duration (minutes)"
                value={filters.maxDuration}
                onChange={(e) => handleFilterChange('maxDuration', e.target.value)}
                className="input-field"
              />
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-montserrat text-gray-600">
                Showing <span className="font-semibold">{filteredConversations.length}</span> of <span className="font-semibold">{conversations.length}</span> conversations
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

        {/* Conversations List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="divide-y divide-gray-200">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conv) => (
                <div key={conv.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-poppins font-semibold text-lg">
                        {conv.companionName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-poppins font-semibold text-gray-800">
                            {conv.userName} & {conv.companionName}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-montserrat font-medium ${getSentimentBadge(conv.sentiment)}`}>
                            {conv.sentiment.charAt(0).toUpperCase() + conv.sentiment.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-montserrat text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(conv.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {conv.duration} minutes
                          </span>
                          <span className={`flex items-center gap-1 font-semibold ${getQualityColor(conv.qualityScore)}`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            {conv.qualityScore}/10
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedConversation(conv)}
                      className="text-sm font-montserrat text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      View Details →
                    </button>
                  </div>

                  <p className="text-sm font-montserrat text-gray-700 mb-3 leading-relaxed">
                    {conv.summary}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {conv.topics.map((topic, idx) => (
                      <span key={idx} className="inline-flex items-center px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-montserrat">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p className="text-sm font-montserrat text-gray-500">
                  No conversations found matching your criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conversation Detail Modal */}
      {selectedConversation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-poppins font-semibold text-gray-800 mb-2">
                    Conversation Details
                  </h3>
                  <p className="text-sm font-montserrat text-gray-600">
                    {selectedConversation.userName} & {selectedConversation.companionName}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-montserrat text-gray-500 uppercase tracking-wide">Date & Time</label>
                  <p className="text-sm font-montserrat text-gray-800 mt-1">
                    {new Date(selectedConversation.date).toLocaleDateString('en-US', { 
                      year: 'numeric', month: 'long', day: 'numeric' 
                    })} at {selectedConversation.time}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-montserrat text-gray-500 uppercase tracking-wide">Duration</label>
                  <p className="text-sm font-montserrat text-gray-800 mt-1">{selectedConversation.duration} minutes</p>
                </div>
                <div>
                  <label className="text-xs font-montserrat text-gray-500 uppercase tracking-wide">Sentiment</label>
                  <p className="text-sm font-montserrat mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSentimentBadge(selectedConversation.sentiment)}`}>
                      {selectedConversation.sentiment.charAt(0).toUpperCase() + selectedConversation.sentiment.slice(1)}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-xs font-montserrat text-gray-500 uppercase tracking-wide">Quality Score</label>
                  <p className={`text-sm font-montserrat font-semibold mt-1 ${getQualityColor(selectedConversation.qualityScore)}`}>
                    {selectedConversation.qualityScore}/10
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="text-xs font-montserrat text-gray-500 uppercase tracking-wide">Conversation Summary</label>
                <p className="text-sm font-montserrat text-gray-800 mt-2 leading-relaxed">
                  {selectedConversation.summary}
                </p>
              </div>

              {/* Topics */}
              <div>
                <label className="text-xs font-montserrat text-gray-500 uppercase tracking-wide mb-2 block">Topics Discussed</label>
                <div className="flex flex-wrap gap-2">
                  {selectedConversation.topics.map((topic, idx) => (
                    <span key={idx} className="inline-flex items-center px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-montserrat">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => navigate(`/admin/users/${selectedConversation.userId}`)}
                  className="flex-1 py-2 bg-blue-600 text-white text-sm font-montserrat rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View User Profile
                </button>
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm font-montserrat rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default ConversationMonitoring



