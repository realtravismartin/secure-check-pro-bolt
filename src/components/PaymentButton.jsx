import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { CreditCard, Loader2 } from 'lucide-react'

export default function PaymentButton({ 
  children = "Pay & Start Now", 
  size = "default", 
  className = "",
  ...props 
}) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handlePayment = async () => {
    setIsLoading(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Navigate to payment page
      navigate('/payment')
    } catch (error) {
      console.error('Payment initiation failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading}
      size={size}
      className={`bg-blue-600 hover:bg-blue-700 text-white ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="w-4 h-4 mr-2" />
          {children}
        </>
      )}
    </Button>
  )
}

