import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { 
  CheckCircle, 
  Clock, 
  Mail, 
  Phone, 
  FileText, 
  Video, 
  Calendar,
  ArrowRight,
  Download
} from 'lucide-react'

export default function ThankYouPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [caseId, setCaseId] = useState('')
  const [customerInfo, setCustomerInfo] = useState({})

  useEffect(() => {
    // Get case information from navigation state
    if (location.state) {
      setCaseId(location.state.caseId || 'CASE-' + Date.now().toString(36).toUpperCase())
      setCustomerInfo(location.state.customerInfo || {})
    } else {
      // If no state, redirect to home
      navigate('/')
    }
  }, [location.state, navigate])

  const nextSteps = [
    {
      icon: Mail,
      title: "Confirmation Email Sent",
      description: "Check your inbox for case details and next steps",
      status: "completed"
    },
    {
      icon: FileText,
      title: "Case Assessment",
      description: "Our team will review your case within 2 hours",
      status: "in-progress"
    },
    {
      icon: Video,
      title: "Strategy Video",
      description: "You'll receive a personalized video outlining our approach",
      status: "pending"
    },
    {
      icon: Phone,
      title: "Direct Contact",
      description: "We'll call you to discuss the case and answer questions",
      status: "pending"
    }
  ]

  const timeline = [
    { day: "Day 1", activity: "Case assessment and strategy development" },
    { day: "Day 2", activity: "Draft and send initial demand letter" },
    { day: "Day 3-5", activity: "Company response and negotiation phase" },
    { day: "Day 6-7", activity: "Final resolution and case closure" }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="checkmark mx-auto mb-6">
            <CheckCircle className="w-24 h-24 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Your dispute resolution case has been created and we're already getting to work.
          </p>
          <div className="bg-white rounded-lg p-6 inline-block shadow-lg">
            <p className="text-sm text-gray-600 mb-2">Your Case ID</p>
            <p className="text-2xl font-bold text-blue-600">{caseId}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                What Happens Next
              </CardTitle>
              <CardDescription>
                Here's what you can expect in the next 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`p-2 rounded-full ${
                    step.status === 'completed' ? 'bg-green-100 text-green-600' :
                    step.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    <step.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  {step.status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Case Information */}
          <Card>
            <CardHeader>
              <CardTitle>Case Information</CardTitle>
              <CardDescription>
                Keep this information for your records
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Case ID</p>
                <p className="text-lg font-semibold text-blue-600">{caseId}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Client Name</p>
                <p>{customerInfo.name || 'N/A'}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Contact Email</p>
                <p>{customerInfo.email || 'N/A'}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Phone Number</p>
                <p>{customerInfo.phone || 'N/A'}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Case Created</p>
                <p>{new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
              </div>

              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Case Summary
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 7-Day Timeline */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Your 7-Day Resolution Timeline
            </CardTitle>
            <CardDescription>
              Here's how we'll resolve your dispute in the next week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">{item.day}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.activity}</p>
                  </div>
                  {index < timeline.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Need to Reach Us?</CardTitle>
            <CardDescription className="text-blue-700">
              We're here to help throughout the entire process
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">Phone</p>
                  <p className="text-blue-700">(555) 012-3456</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">Email</p>
                  <p className="text-blue-700">cases@disputeresolve.pro</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> Save this page or take a screenshot. 
                You'll receive a confirmation email shortly, but having your case ID ({caseId}) 
                readily available will help us assist you faster.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 text-center space-y-4">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            size="lg"
          >
            Return to Homepage
          </Button>
          
          <p className="text-sm text-gray-600">
            Thank you for choosing Secure Check Pro. We'll have your dispute resolved within 7 days!
          </p>
        </div>
      </div>
    </div>
  )
}

