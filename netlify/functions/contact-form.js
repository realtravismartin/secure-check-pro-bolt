// Netlify serverless function for contact form processing
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
    const { name, email, phone, dispute } = data

    // Basic validation
    if (!name || !email || !dispute) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email format' })
      }
    }

    // Generate case ID
    const caseId = 'CASE-' + Date.now().toString(36).toUpperCase()

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Create Trello card
    // 4. Send confirmation email to client

    console.log('Contact form submission:', {
      caseId,
      name,
      email,
      phone,
      dispute: dispute.substring(0, 100) + '...',
      timestamp: new Date().toISOString()
    })

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

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
        message: 'Contact form submitted successfully',
        caseId: caseId,
        estimatedResponse: '24 hours'
      })
    }
  } catch (error) {
    console.error('Contact form error:', error)
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: 'Failed to process contact form'
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

