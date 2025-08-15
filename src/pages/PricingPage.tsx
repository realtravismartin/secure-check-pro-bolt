import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { supabase } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Alert, AlertDescription } from '../components/ui/alert'
import { CheckCircle, Loader2, Shield, Star, Zap } from 'lucide-react'
import { stripeProducts, getSubscriptionProducts, getOneTimeProducts, getProductByPriceId } from '../stripe-config'

interface UserSubscription {
  subscription_status: string
  price_id: string | null
  current_period_end: number | null
  cancel_at_period_end: boolean
}

export default function PricingPage() {
  const { user, session } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null)
  const [loadingSubscription, setLoadingSubscription] = useState(true)

  const subscriptionProducts = getSubscriptionProducts()
  const oneTimeProducts = getOneTimeProducts()

  useEffect(() => {
    if (user) {
      fetchUserSubscription()
    } else {
      setLoadingSubscription(false)
    }
  }, [user])

  const fetchUserSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('subscription_status, price_id, current_period_end, cancel_at_period_end')
        .maybeSingle()

      if (error) {
        console.error('Error fetching subscription:', error)
      } else {
        setUserSubscription(data)
      }
    } catch (err) {
      console.error('Error fetching subscription:', err)
    } finally {
      setLoadingSubscription(false)
    }
  }

  const handleCheckout = async (priceId: string, mode: 'payment' | 'subscription') => {
    if (!user || !session) {
      navigate('/login')
      return
    }

    setLoading(priceId)
    setError('')

    try {
      const { data, error } = await supabase.functions.invoke('stripe-checkout', {
        body: {
          price_id: priceId,
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/pricing`,
          mode
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      })

      if (error) {
        throw error
      }

      if (data?.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (err: any) {
      console.error('Checkout error:', err)
      setError(err.message || 'Failed to start checkout process')
    } finally {
      setLoading(null)
    }
  }

  const isCurrentPlan = (priceId: string) => {
    return userSubscription?.price_id === priceId && 
           ['active', 'trialing'].includes(userSubscription.subscription_status)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'trialing':
        return <Badge className="bg-blue-100 text-blue-800">Trial</Badge>
      case 'past_due':
        return <Badge variant="destructive">Past Due</Badge>
      case 'canceled':
        return <Badge variant="outline">Canceled</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the perfect plan for your reputation monitoring and OSINT needs
          </p>
        </div>

        {/* Current Subscription Status */}
        {user && !loadingSubscription && userSubscription && (
          <div className="mb-8">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-blue-900">Current Subscription</h3>
                    <p className="text-blue-700">
                      {userSubscription.price_id ? 
                        getProductByPriceId(userSubscription.price_id)?.name || 'Unknown Plan' : 
                        'No active subscription'
                      }
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(userSubscription.subscription_status)}
                    {userSubscription.cancel_at_period_end && (
                      <Badge variant="outline">Canceling</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {error && (
          <div className="mb-8">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Subscription Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Subscription Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionProducts.map((product) => (
              <Card 
                key={product.priceId} 
                className={`relative ${
                  product.priceId === 'price_1RwTndI7qpKXaqXwYIeWF4zz' 
                    ? 'border-2 border-blue-500 shadow-lg' 
                    : ''
                }`}
              >
                {product.priceId === 'price_1RwTndI7qpKXaqXwYIeWF4zz' && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{product.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {product.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {product.price ? formatPrice(product.price) : 'Contact'}
                    </span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm">Real-time monitoring</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm">Email alerts</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm">Dashboard access</span>
                    </div>
                    {product.priceId !== 'price_1RwTmmI7qpKXaqXwWbm8nB8h' && (
                      <>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-sm">Priority support</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-sm">Advanced reporting</span>
                        </div>
                      </>
                    )}
                    {product.priceId === 'price_1RwTqBI7qpKXaqXwuUpS7bAG' && (
                      <>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-sm">Dedicated account manager</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-sm">Custom integrations</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <Button
                    onClick={() => handleCheckout(product.priceId, product.mode)}
                    disabled={loading === product.priceId || isCurrentPlan(product.priceId)}
                    className={`w-full ${
                      product.priceId === 'price_1RwTndI7qpKXaqXwYIeWF4zz'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : ''
                    }`}
                    variant={isCurrentPlan(product.priceId) ? 'outline' : 'default'}
                  >
                    {loading === product.priceId ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : isCurrentPlan(product.priceId) ? (
                      'Current Plan'
                    ) : (
                      'Get Started'
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* One-Time Products */}
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            OSINT Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {oneTimeProducts.map((product) => (
              <Card key={product.priceId} className="relative">
                {product.priceId === 'price_1RwTlxI7qpKXaqXwIh2O9tu9' && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-500 text-white px-4 py-1">
                      <Zap className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{product.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {product.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {product.price ? formatPrice(product.price) : 'Contact'}
                    </span>
                    <span className="text-gray-600"> one-time</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm">Comprehensive background check</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm">Social media analysis</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm">Public records search</span>
                    </div>
                    {product.priceId === 'price_1RwTlxI7qpKXaqXwIh2O9tu9' && (
                      <>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-sm">Deep web investigation</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-sm">Professional analysis</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-sm">Priority delivery (24-48h)</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <Button
                    onClick={() => handleCheckout(product.priceId, product.mode)}
                    disabled={loading === product.priceId}
                    className={`w-full ${
                      product.priceId === 'price_1RwTlxI7qpKXaqXwIh2O9tu9'
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : ''
                    }`}
                  >
                    {loading === product.priceId ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Order Report'
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full">
            <Shield className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-sm text-green-800">
              Secure payments powered by Stripe
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}