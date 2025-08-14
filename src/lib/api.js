import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/.netlify/functions',
  timeout: 15000,
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

// API endpoints for Netlify functions
export const apiEndpoints = {
  // Payment endpoints (Netlify functions)
  createPaymentIntent: (data) => api.post('/create-payment-intent', data),
  confirmPayment: (data) => api.post('/confirm-payment', data),
  
  // Contact form (Netlify function)
  submitContactForm: (data) => api.post('/contact-form', data),
  
  // Case management endpoints (would need backend implementation)
  createCase: (data) => api.post('/create-case', data),
  updateCaseStatus: (data) => api.post('/update-case-status', data),
  addCaseNote: (data) => api.post('/add-case-note', data),
  getCaseDetails: (caseId) => api.get(`/case/${caseId}`),
  
  // Video proposal endpoints (would need backend implementation)
  createVideoProposal: (data) => api.post('/create-video-proposal', data),
  getVideoAnalytics: () => api.get('/video-analytics'),
  trackVideoEngagement: (id, data) => api.post(`/track-video/${id}`, data),
  
  // Lead generation endpoints (would need backend implementation)
  startLeadMonitoring: () => api.post('/start-lead-monitoring'),
  getLeads: (params) => api.get('/leads', { params }),
  qualifyLead: (id, data) => api.post(`/qualify-lead/${id}`, data),
  getLeadAnalytics: () => api.get('/lead-analytics'),
}

// Netlify Forms API (alternative to serverless functions for simple forms)
export const submitNetlifyForm = async (formName, formData) => {
  const form = new FormData()
  form.append('form-name', formName)
  
  Object.keys(formData).forEach(key => {
    form.append(key, formData[key])
  })

  try {
    const response = await fetch('/', {
      method: 'POST',
      body: form
    })
    
    if (!response.ok) {
      throw new Error('Form submission failed')
    }
    
    return { success: true, message: 'Form submitted successfully' }
  } catch (error) {
    console.error('Netlify form submission error:', error)
    throw error
  }
}

export default api

