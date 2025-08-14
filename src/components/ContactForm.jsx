import React, { useState } from 'react'
import { X, Send, CheckCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { apiEndpoints } from '../lib/api'

export default function ContactForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dispute: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [caseId, setCaseId] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Submit to Netlify function
      const response = await apiEndpoints.submitContactForm(formData)
      
      console.log('Contact form submitted successfully:', response)
      setCaseId(response.caseId || 'CASE-' + Date.now().toString(36).toUpperCase())
      setIsSubmitted(true)
      
      // Auto-close after success
      setTimeout(() => {
        onClose()
      }, 4000)
    } catch (error) {
      console.error('Form submission failed:', error)
      // You could show an error message here
      alert('Failed to submit form. Please try again or call us directly at (555) 012-3456.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Quick Contact Form</CardTitle>
              <CardDescription>
                Send us a message and we'll get back to you within 24 hours.
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
              <p className="text-gray-600 text-sm mb-4">
                We'll review your case and get back to you within 24 hours.
              </p>
              {caseId && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Reference ID:</p>
                  <p className="text-sm text-blue-700">{caseId}</p>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" name="contact" method="POST" data-netlify="true">
              <input type="hidden" name="form-name" value="contact" />
              
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

              <div>
                <Label htmlFor="dispute">Describe Your Dispute *</Label>
                <Textarea
                  id="dispute"
                  name="dispute"
                  required
                  rows={4}
                  value={formData.dispute}
                  onChange={handleChange}
                  placeholder="Please describe your dispute, what happened, and what resolution you're seeking..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner mr-2" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

