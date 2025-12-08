import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminEmail')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

// Admin Auth API
export const adminAuthAPI = {
  login: async (email, password) => {
    const response = await api.post('/admin/login', { email, password })
    return response.data
  },
  logout: async () => {
    const response = await api.post('/admin/logout')
    return response.data
  },
}

// Users API
export const usersAPI = {
  getAll: async () => {
    const response = await api.get('/admin/users')
    return response.data
  },
  getById: async (userId) => {
    const response = await api.get(`/admin/users/${userId}`)
    return response.data
  },
  create: async (userData) => {
    const response = await api.post('/admin/users', userData)
    return response.data
  },
  update: async (userId, userData) => {
    const response = await api.put(`/admin/users/${userId}`, userData)
    return response.data
  },
  delete: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`)
    return response.data
  },
  suspend: async (userId) => {
    const response = await api.put(`/admin/users/${userId}`, { isActive: false })
    return response.data
  },
  activate: async (userId) => {
    const response = await api.put(`/admin/users/${userId}`, { isActive: true })
    return response.data
  },
}

// Wallet API
export const walletAPI = {
  getAllWallets: async (filters = {}) => {
    const params = new URLSearchParams()
    if (filters.search) params.append('search', filters.search)
    
    const response = await api.get(`/admin/wallets?${params.toString()}`)
    return response.data
  },
  adjustBalance: async (userId, amount, type, description) => {
    const response = await api.post(`/admin/wallets/${userId}/adjust`, {
      amount: parseFloat(amount),
      type, // 'credit' or 'debit'
      description,
    })
    return response.data
  },
}

// Transactions API
export const transactionsAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams()
    if (filters.type) params.append('type', filters.type)
    if (filters.status) params.append('status', filters.status)
    if (filters.dateFrom) params.append('dateFrom', filters.dateFrom)
    if (filters.dateTo) params.append('dateTo', filters.dateTo)
    if (filters.userId) params.append('userId', filters.userId)
    
    const response = await api.get(`/admin/transactions?${params.toString()}`)
    return response.data
  },
}

// Conversations API
export const conversationsAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams()
    if (filters.userId) params.append('userId', filters.userId)
    if (filters.dateFrom) params.append('dateFrom', filters.dateFrom)
    if (filters.dateTo) params.append('dateTo', filters.dateTo)
    
    const response = await api.get(`/admin/conversations?${params.toString()}`)
    return response.data
  },
  getById: async (conversationId) => {
    const response = await api.get(`/admin/conversations/${conversationId}`)
    return response.data
  },
}

// Dashboard/Stats API
export const dashboardAPI = {
  getStats: async () => {
    const response = await api.get('/admin/dashboard/stats')
    return response.data
  },
}

export default api

