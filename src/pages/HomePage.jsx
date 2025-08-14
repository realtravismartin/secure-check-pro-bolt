import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Clock, 
  Shield, 
  CheckCircle, 
  Phone, 
  Mail, 
  Star,
  ArrowRight,
  DollarSign,
  FileText,
  MessageSquare
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Label } from '../components/ui/label'
import ContactForm from '../components/ContactForm'
import PaymentButton from '../components/PaymentButton'

export default function HomePage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Secure Check Pro</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="nav-link">Services</a>
              <a href="#how-it-works" className="nav-link">How It Works</a>
              <a href="#pricing" className="nav-link">Pricing</a>
              <a href="#contact" className="nav-link">Contact</a>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">(555) 012-3456</span>
              </div>
              <PaymentButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="hero-content text-left">
              <h1 className="hero-title">
                We Resolve Corporate Disputes in{' '}
                <span className="text-yellow-300">7 Days or Less</span> — Without You Stepping Foot in Court.
              </h1>
              <p className="hero-subtitle">
                If a business wronged you, overbilled you, or failed to deliver — we'll get you results quickly, professionally, and without the headache.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <PaymentButton size="lg" className="cta-button">
                  Pay $497 & Start Now
                </PaymentButton>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-white text-blue-600 border-white hover:bg-gray-100"
                  onClick={() => setIsContactFormOpen(true)}
                >
                  Schedule Free Call
                </Button>
              </div>
              <div className="flex items-center gap-8 mt-8 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>No upfront legal fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span>7-day resolution guarantee</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/hero-handshake.jpg" 
                alt="Professional handshake representing successful dispute resolution" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold">98% Success Rate</span>
                </div>
                <p className="text-sm text-gray-600">Over 2,500 cases resolved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Secure Check Pro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine legal expertise with proven negotiation tactics to get you the results you deserve.
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-item">
              <Clock className="feature-icon" />
              <h3 className="text-xl font-semibold mb-2">Fast Results</h3>
              <p className="text-gray-600">
                Most disputes resolved in under 7 days. No lengthy court battles or endless waiting.
              </p>
            </div>
            
            <div className="feature-item">
              <FileText className="feature-icon" />
              <h3 className="text-xl font-semibold mb-2">Proven Methods</h3>
              <p className="text-gray-600">
                Legal-grade demand letters and escalation tactics that companies take seriously.
              </p>
            </div>
            
            <div className="feature-item">
              <Shield className="feature-icon" />
              <h3 className="text-xl font-semibold mb-2">No Court Hassles</h3>
              <p className="text-gray-600">
                We handle all negotiations from start to finish. You focus on your life, we handle the dispute.
              </p>
            </div>
            
            <div className="feature-item">
              <DollarSign className="feature-icon" />
              <h3 className="text-xl font-semibold mb-2">Risk-Free</h3>
              <p className="text-gray-600">
                Flat fee structure plus small success bonus. No hidden costs or surprise bills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to get your dispute resolved quickly and professionally.
            </p>
          </div>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3 className="text-xl font-semibold mb-4">Tell Us Your Story</h3>
              <p className="text-gray-600 mb-4">
                Fill out our simple online intake form. Provide details about your dispute, what happened, and what resolution you're seeking.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700 italic">
                  "Quick 10-minute form covers all the essential details we need to build your case."
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <h3 className="text-xl font-semibold mb-4">We Build Your Case</h3>
              <p className="text-gray-600 mb-4">
                Our team drafts powerful, legally precise demand letters and gathers supporting documentation to strengthen your position.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700 italic">
                  "Professional legal language that gets corporate attention and action."
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <h3 className="text-xl font-semibold mb-4">We Negotiate</h3>
              <p className="text-gray-600 mb-4">
                We handle all communications and negotiations with the company until we reach a satisfactory resolution for you.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700 italic">
                  "You'll receive regular updates while we do all the heavy lifting."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              No hourly rates, no surprise fees. Just results.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="pricing-card featured">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Complete Resolution Package</CardTitle>
                <CardDescription>
                  Everything you need to resolve your dispute quickly and professionally
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div>
                    <div className="price-amount">$497</div>
                    <div className="price-period">Flat Fee</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-400">+</div>
                  <div>
                    <div className="price-amount">15%</div>
                    <div className="price-period">of recovered funds</div>
                  </div>
                </div>
                
                <div className="text-left mb-8">
                  <h4 className="font-semibold mb-4">What's Included:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Professional case assessment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Legal-grade demand letters</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Full negotiation handling</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Regular progress updates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>7-day resolution guarantee</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>No hidden fees</span>
                    </li>
                  </ul>
                </div>
                
                <PaymentButton size="lg" className="w-full">
                  Pay $497 & Start Now
                </PaymentButton>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Resolve Your Dispute?
            </h2>
            <p className="text-xl text-gray-600">
              Choose how you'd like to get started. We offer both immediate payment for urgent cases and free consultations to discuss your situation first.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle>Pay Now & Start Immediately</CardTitle>
                <CardDescription>
                  Pay the $497 flat fee and we'll start working on your case within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentButton size="lg" className="w-full mb-4">
                  Pay $497 & Start Now
                </PaymentButton>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Schedule Free Consultation</CardTitle>
                <CardDescription>
                  Book a 30-minute call to discuss your case before making any commitment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full mb-4"
                  onClick={() => setIsContactFormOpen(true)}
                >
                  Schedule Free Call
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <Phone className="w-8 h-8 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold mb-2">Call Us Directly</h3>
              <p className="text-gray-600">(555) 012-3456</p>
            </div>
            
            <div className="text-center">
              <Mail className="w-8 h-8 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600">cases@disputeresolve.pro</p>
            </div>
            
            <div className="text-center">
              <MessageSquare className="w-8 h-8 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold mb-2">Response Time</h3>
              <p className="text-gray-600">Within 24 hours guaranteed</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
              <img 
                src="/professional-person.jpg" 
                alt="Travis Martin - Lead Dispute Resolution Specialist" 
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">Travis Martin</h3>
              <p className="text-gray-600 text-sm">
                Lead Dispute Resolution Specialist with over 10 years of experience in corporate negotiations and consumer advocacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      {isContactFormOpen && (
        <ContactForm onClose={() => setIsContactFormOpen(false)} />
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container-max">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Secure Check Pro</h3>
              <p className="text-gray-300 text-sm">
                Professional consumer dispute resolution services. Get results in 7 days or less.
              </p>
            </div>
            
            <div className="footer-section">
              <h3>Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="footer-link">Billing Disputes</a></li>
                <li><a href="#" className="footer-link">Warranty Claims</a></li>
                <li><a href="#" className="footer-link">Service Failures</a></li>
                <li><a href="#" className="footer-link">Subscription Issues</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="footer-link">About Us</a></li>
                <li><a href="#" className="footer-link">How It Works</a></li>
                <li><a href="#" className="footer-link">Success Stories</a></li>
                <li><a href="#" className="footer-link">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Contact Info</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>Phone: (555) 012-3456</p>
                <p>Email: cases@disputeresolve.pro</p>
                <p>Response: Within 24 hours</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Secure Check Pro. All rights reserved. Built for consumer advocacy and dispute resolution.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

