import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from './lib/stripe'
import HomePage from './pages/HomePage'
import PaymentPage from './pages/PaymentPage'
import ThankYouPage from './pages/ThankYouPage'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Elements>
  )
}

export default App

