import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error.response?.data || error)
  }
)

// API endpoints
export const apiEndpoints = {
  // Payment endpoints
  createPaymentIntent: (data) => api.post('/payments/create-payment-intent', data),
  confirmPayment: (data) => api.post('/payments/confirm-payment', data),
  
  // Case management endpoints
  createCase: (data) => api.post('/trello/create-case', data),
  updateCaseStatus: (data) => api.post('/trello/update-case-status', data),
  addCaseNote: (data) => api.post('/trello/add-case-note', data),
  
  // Video proposal endpoints
  createVideoProposal: (data) => api.post('/video/create-proposal', data),
  getVideoAnalytics: () => api.get('/video/analytics'),
  trackVideoEngagement: (id, data) => api.post(`/video/track/${id}`, data),
  
  // Lead generation endpoints
  startLeadMonitoring: () => api.post('/leads/monitor/start'),
  getLeads: (params) => api.get('/leads/leads', { params }),
  qualifyLead: (id, data) => api.post(`/leads/leads/${id}/qualify`, data),
  getLeadAnalytics: () => api.get('/leads/analytics'),
  
  // Contact form
  submitContactForm: (data) => api.post('/contact/submit', data),
}

export default api

