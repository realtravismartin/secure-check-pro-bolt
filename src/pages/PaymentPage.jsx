import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Separator } from '../components/ui/separator'
import { ArrowLeft, CreditCard, Shield, Clock, CheckCircle } from 'lucide-react'

function PaymentForm() {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dispute: ''
  })

  useEffect(() => {
    // Simulate creating payment intent
    const createPaymentIntent = async () => {
      try {
        // In a real app, this would call your backend API
        const mockClientSecret = 'pi_mock_client_secret'
        setClientSecret(mockClientSecret)
      } catch (error) {
        console.error('Failed to create payment intent:', error)
      }
    }

    createPaymentIntent()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // In a real app, you would process the payment here
      console.log('Payment processed successfully')
      
      // Navigate to thank you page
      navigate('/thank-you', { 
        state: { 
          caseId: 'CASE-' + Date.now().toString(36).toUpperCase(),
          customerInfo: formData
        }
      })
    } catch (error) {
      console.error('Payment failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Secure Payment</h1>
          <p className="text-gray-600 mt-2">
            Complete your payment to start your dispute resolution case
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Information
              </CardTitle>
              <CardDescription>
                Secure payment processing powered by Stripe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Contact Information</h3>
                  
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <Separator />

                {/* Dispute Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Dispute Details</h3>
                  
                  <div>
                    <Label htmlFor="dispute">Describe Your Dispute *</Label>
                    <textarea
                      id="dispute"
                      name="dispute"
                      required
                      rows={4}
                      value={formData.dispute}
                      onChange={handleChange}
                      placeholder="Please describe your dispute, what happened, and what resolution you're seeking..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                    />
                  </div>
                </div>

                <Separator />

                {/* Payment Method */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Payment Method</h3>
                  
                  <div className="p-4 border border-gray-300 rounded-md">
                    <CardElement options={cardElementOptions} />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!stripe || isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="spinner mr-2" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Pay $497 Securely
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Your payment is secured by 256-bit SSL encryption. We never store your card details.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Dispute Resolution Service</span>
                  <span className="font-semibold">$497.00</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Success Fee (15% of recovered funds)</span>
                  <span>Charged only upon successful resolution</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total Due Today</span>
                  <span>$497.00</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What You Get</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Professional case assessment</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Legal-grade demand letters</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Full negotiation handling</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Regular progress updates</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-sm">7-day resolution guarantee</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <span className="font-semibold text-blue-900">Money-Back Guarantee</span>
                </div>
                <p className="text-sm text-blue-800">
                  If we don't resolve your dispute within 7 days, you get your full $497 back. No questions asked.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Elements stripe={null}>
      <PaymentForm />
    </Elements>
  )
}

