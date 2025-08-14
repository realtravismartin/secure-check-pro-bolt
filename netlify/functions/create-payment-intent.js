// Netlify serverless function for Stripe payment intent creation
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const data = JSON.parse(event.body)
    const { amount = 49700, currency = 'usd', customerInfo } = data // $497.00 in cents

    // Validate required fields
    if (!customerInfo || !customerInfo.email || !customerInfo.name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Customer information required' })
      }
    }

    // Create or retrieve customer
    let customer
    try {
      const customers = await stripe.customers.list({
        email: customerInfo.email,
        limit: 1
      })

      if (customers.data.length > 0) {
        customer = customers.data[0]
      } else {
        customer = await stripe.customers.create({
          email: customerInfo.email,
          name: customerInfo.name,
          phone: customerInfo.phone,
          metadata: {
            dispute_description: customerInfo.dispute?.substring(0, 500) || 'No description provided'
          }
        })
      }
    } catch (customerError) {
      console.error('Customer creation error:', customerError)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create customer' })
      }
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        service: 'dispute_resolution',
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        case_type: 'consumer_dispute'
      },
      description: 'Dispute Resolution Service - $497 Flat Fee'
    })

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        customerId: customer.id,
        amount: amount,
        currency: currency
      })
    }
  } catch (error) {
    console.error('Payment intent creation error:', error)
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Payment processing error',
        message: error.message || 'Failed to create payment intent'
      })
    }
  }
}

// Handle preflight requests for CORS
exports.handler.options = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    }
  }
}

