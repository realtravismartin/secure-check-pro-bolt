import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/auth'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import PricingPage from './pages/PricingPage'
import SuccessPage from './pages/SuccessPage'
import ThankYouPage from './pages/ThankYouPage'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App

