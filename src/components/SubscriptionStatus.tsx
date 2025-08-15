import React, { useEffect, useState } from 'react'
import { useAuth } from '../lib/auth'
import { supabase } from '../lib/supabase'
import { Badge } from './ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { getProductByPriceId } from '../stripe-config'
import { Loader2, Crown, AlertCircle } from 'lucide-react'

interface UserSubscription {
  subscription_status: string
  price_id: string | null
  current_period_end: number | null
  cancel_at_period_end: boolean
}

export default function SubscriptionStatus() {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<UserSubscription | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchSubscription()
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('subscription_status, price_id, current_period_end, cancel_at_period_end')
        .maybeSingle()

      if (error) {
        console.error('Error fetching subscription:', error)
      } else {
        setSubscription(data)
      }
    } catch (err) {
      console.error('Error fetching subscription:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return null
  }

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="ml-2">Loading subscription...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!subscription || !subscription.price_id) {
    return (
      <Card className="w-full max-w-md border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <AlertCircle className="w-5 h-5" />
            No Active Subscription
          </CardTitle>
          <CardDescription className="text-orange-700">
            You don't have an active subscription yet.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const product = getProductByPriceId(subscription.price_id)
  const isActive = ['active', 'trialing'].includes(subscription.subscription_status)

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
      case 'incomplete':
        return <Badge className="bg-yellow-100 text-yellow-800">Incomplete</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Card className={`w-full max-w-md ${isActive ? 'border-green-200 bg-green-50' : ''}`}>
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${isActive ? 'text-green-800' : 'text-gray-800'}`}>
          <Crown className="w-5 h-5" />
          Current Plan
        </CardTitle>
        <CardDescription className={isActive ? 'text-green-700' : 'text-gray-600'}>
          {product?.name || 'Unknown Plan'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status:</span>
          <div className="flex items-center gap-2">
            {getStatusBadge(subscription.subscription_status)}
            {subscription.cancel_at_period_end && (
              <Badge variant="outline" className="text-xs">
                Canceling
              </Badge>
            )}
          </div>
        </div>

        {subscription.current_period_end && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {subscription.cancel_at_period_end ? 'Ends:' : 'Renews:'}
            </span>
            <span className="text-sm text-gray-600">
              {formatDate(subscription.current_period_end)}
            </span>
          </div>
        )}

        {product?.description && (
          <div className="pt-2 border-t">
            <p className="text-xs text-gray-600">{product.description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}