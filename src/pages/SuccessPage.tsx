import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { CheckCircle, ArrowRight, Home, Mail } from 'lucide-react'

export default function SuccessPage() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="checkmark mx-auto mb-6">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600">
            Thank you for your purchase. Your order has been processed successfully.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Order Confirmation
            </CardTitle>
            <CardDescription>
              Your payment has been processed and you'll receive a confirmation email shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sessionId && (
              <div>
                <p className="text-sm font-medium text-gray-700">Session ID</p>
                <p className="text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded">
                  {sessionId}
                </p>
              </div>
            )}
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  You'll receive a confirmation email with your receipt
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Your subscription/service will be activated immediately
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Access your dashboard to manage your account
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <Link to="/">
            <Button size="lg" className="mr-4">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Link>
          <Link to="/pricing">
            <Button variant="outline" size="lg">
              View Plans
            </Button>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@securecheck.pro" className="text-blue-600 hover:underline">
              support@securecheck.pro
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}