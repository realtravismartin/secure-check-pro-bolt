import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo_key')

export { stripePromise }

// Stripe configuration
export const stripeConfig = {
  appearance: {
    theme: 'stripe',
    variables: {
      colorPrimary: '#2563eb',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#ef4444',
      fontFamily: 'system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  },
  clientSecret: null, // Will be set dynamically
}

// Payment processing functions
export const createPaymentIntent = async (paymentData) => {
  try {
    const response = await fetch('/api/payments/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })
    
    if (!response.ok) {
      throw new Error('Failed to create payment intent')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Payment intent creation failed:', error)
    throw error
  }
}

export const confirmPayment = async (paymentIntentId) => {
  try {
    const response = await fetch('/api/payments/confirm-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payment_intent_id: paymentIntentId }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to confirm payment')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Payment confirmation failed:', error)
    throw error
  }
}

