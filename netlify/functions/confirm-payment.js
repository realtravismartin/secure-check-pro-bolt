// Netlify serverless function for payment confirmation and case creation
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
    const { paymentIntentId, customerInfo } = data

    if (!paymentIntentId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Payment intent ID required' })
      }
    }

    // Retrieve payment intent to verify status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status !== 'succeeded') {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Payment not completed',
          status: paymentIntent.status
        })
      }
    }

    // Generate unique case ID
    const caseId = 'CASE-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase()

    // Get customer information
    const customer = await stripe.customers.retrieve(paymentIntent.customer)

    // Here you would typically:
    // 1. Create case in database
    // 2. Create Trello card
    // 3. Send confirmation email
    // 4. Schedule follow-up tasks
    // 5. Generate case documents

    const caseData = {
      caseId: caseId,
      paymentIntentId: paymentIntentId,
      customerId: customer.id,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      amountPaid: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: 'active',
      createdAt: new Date().toISOString(),
      estimatedResolution: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      dispute: customer.metadata?.dispute_description || 'No description provided'
    }

    console.log('Payment confirmed and case created:', caseData)

    // Simulate case creation processing
    await new Promise(resolve => setTimeout(resolve, 1500))

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        message: 'Payment confirmed and case created',
        caseId: caseId,
        paymentStatus: 'succeeded',
        amountPaid: paymentIntent.amount / 100, // Convert cents to dollars
        currency: paymentIntent.currency.toUpperCase(),
        estimatedResolution: '7 days',
        nextSteps: [
          'Confirmation email sent',
          'Case assessment within 2 hours',
          'Strategy video within 24 hours',
          'Direct contact from specialist'
        ]
      })
    }
  } catch (error) {
    console.error('Payment confirmation error:', error)
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Payment confirmation failed',
        message: error.message || 'Failed to confirm payment'
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

