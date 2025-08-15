import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { 
  Shield, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  Star,
  Award,
  Users,
  Phone,
  Mail,
  ArrowRight,
  PlayCircle,
  TrendingUp,
  FileText,
  Zap,
  Target,
  AlertTriangle
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import SubscriptionStatus from '../components/SubscriptionStatus'
import ContactForm from '../components/ContactForm'

export default function HomePage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [showContactForm, setShowContactForm] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Sarah M.",
      location: "Phoenix, AZ",
      amount: "$2,847",
      story: "They got my money back from a contractor who disappeared with my deposit. I thought it was gone forever!",
      rating: 5,
      timeframe: "4 days"
    },
    {
      name: "Mike R.",
      location: "Dallas, TX", 
      amount: "$1,235",
      story: "Gym wouldn't cancel my membership. These guys handled everything - I didn't have to make a single call.",
      rating: 5,
      timeframe: "3 days"
    },
    {
      name: "Jennifer L.",
      location: "Miami, FL",
      amount: "$3,200",
      story: "Wedding vendor took my money and never delivered. Got every penny back plus damages!",
      rating: 5,
      timeframe: "6 days"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">SecureCheck Pro</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 hover:text-blue-600 font-medium">How It Works</button>
              <Link to="/pricing" className="text-gray-700 hover:text-blue-600 font-medium">Pricing</Link>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-blue-600 font-medium">Success Stories</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 font-medium">Contact</button>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>(555) 012-3456</span>
              </div>
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Welcome, {user.email}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/login"><Button size="sm">Sign In</Button></Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* User Subscription Status */}
          {user && (
            <div className="mb-8 flex justify-center">
              <SubscriptionStatus />
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Attention-Grabbing Badge */}
              <div className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <AlertTriangle className="w-4 h-4 mr-2" />
                STOP Getting Ripped Off by Companies!
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                We Get Your 
                <span className="text-blue-600"> Money Back</span>
                <br />
                <span className="text-green-600">In 7 Days</span>
                <span className="text-gray-900"> or Less</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                <strong>Tired of companies ignoring you?</strong> We force them to pay attention. 
                Our legal-grade demand letters and proven negotiation tactics get results when 
                you can't. <span className="text-blue-600 font-semibold">Guaranteed.</span>
              </p>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold">BBB</div>
                  <div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <span className="text-sm text-gray-600">A+ Rating</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Google Certified</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">98.5% Success Rate</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/pricing"><Button size="lg" className="text-lg px-8 py-4">
                  🚀 Get My Money Back Now - $497
                </Button></Link>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => setShowContactForm(true)}
                  className="text-lg px-8 py-4 border-2"
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Free Case Review
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>2,847+ Cases Won</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4" />
                  <span>$4.2M+ Recovered</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>4.2 Day Avg Resolution</span>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Hero Image */}
              <div className="relative bg-white rounded-2xl shadow-2xl p-8">
                <img 
                  src="/hero-handshake.jpg" 
                  alt="Professional dispute resolution" 
                  className="w-full h-80 object-cover rounded-lg mb-6"
                />
                
                {/* Floating Success Card */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
                  <div className="text-2xl font-bold">$2,847</div>
                  <div className="text-sm">Recovered in 4 days</div>
                </div>

                {/* Testimonial Preview */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-gray-700 text-sm mb-2">"{testimonials[currentTestimonial].story}"</p>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>- {testimonials[currentTestimonial].name}, {testimonials[currentTestimonial].location}</span>
                    <span className="text-green-600 font-semibold">{testimonials[currentTestimonial].timeframe}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Agitation Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sick of Being <span className="text-red-600">Ignored</span> by Companies?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              You've tried calling, emailing, even threatening to leave reviews. 
              But they just don't care about individual customers... <strong>until now.</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-red-800">They Ignore Your Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700">
                  Customer service puts you on hold forever, transfers you around, 
                  or gives you the runaround. They're trained to wear you down.
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-red-800">Legal Threats Don't Work</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700">
                  They know you probably won't hire a lawyer for a "small" dispute. 
                  Your threats are empty and they know it.
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-red-800">Time is Money</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700">
                  Months go by. You're frustrated, out money, and they're counting 
                  on you giving up. Most people do.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              But What If Someone Could Make Them <span className="text-blue-600">Listen</span>?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              What if you had a professional advocate who knows exactly how to get companies to pay attention?
            </p>
            <Link to="/pricing"><Button size="lg" className="text-lg px-8 py-4">
              Yes! Get My Money Back Now
            </Button></Link>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              We Make Companies <span className="text-green-600">Pay Attention</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              When we contact them, they know we mean business. Our legal-grade approach 
              gets results in days, not months.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Why Companies Fear Us (And Respect You)
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Legal-Grade Documentation</h4>
                    <p className="text-gray-600">Our demand letters look like they came from a law firm. Companies take notice immediately.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Strategic Pressure Points</h4>
                    <p className="text-gray-600">We know exactly who to contact and what to say to get fast results. No more customer service runaround.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Escalation Expertise</h4>
                    <p className="text-gray-600">We escalate to decision-makers who can actually resolve your issue. No more talking to powerless representatives.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Reputation Management</h4>
                    <p className="text-gray-600">Companies know we can damage their reputation. They'd rather resolve quickly than risk negative exposure.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="/professional-person.jpg" 
                alt="Professional dispute resolution expert" 
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
              
              {/* Overlay Stats */}
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-4xl font-bold mb-2">98.5%</div>
                  <div className="text-lg">Success Rate</div>
                  <div className="text-sm opacity-90 mt-2">2,847+ Cases Won</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get Your Money Back in <span className="text-blue-600">3 Simple Steps</span>
            </h2>
            <p className="text-xl text-gray-600">
              We handle everything. You just sit back and watch us work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="relative bg-white border-2 border-blue-200">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <CardHeader className="pt-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-center text-xl">Tell Us Your Story</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Fill out our simple intake form. Tell us what happened, who wronged you, 
                  and what you want resolved.
                </p>
                <div className="text-sm text-blue-600 font-semibold">Takes 5 minutes</div>
              </CardContent>
            </Card>

            <Card className="relative bg-white border-2 border-green-200">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <CardHeader className="pt-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-center text-xl">We Build Your Case</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Our experts craft powerful, legally-precise demand letters and develop 
                  a custom strategy for your specific situation.
                </p>
                <div className="text-sm text-green-600 font-semibold">Within 24 hours</div>
              </CardContent>
            </Card>

            <Card className="relative bg-white border-2 border-purple-200">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <CardHeader className="pt-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-center text-xl">Get Your Money</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  We negotiate directly with decision-makers until you get what you deserve. 
                  Most cases resolve in under a week.
                </p>
                <div className="text-sm text-purple-600 font-semibold">Average: 4.2 days</div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/pricing"><Button size="lg" className="text-lg px-8 py-4">
              Start My Case Now - Only $497
            </Button></Link>
            <p className="text-sm text-gray-600 mt-4">
              + 15% of recovered funds (only if we win)
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real People, Real Results, <span className="text-green-600">Real Money Back</span>
            </h2>
            <p className="text-xl text-gray-600">
              Don't take our word for it. Here's what our clients say:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-50 border-2 border-gray-200 hover:border-blue-300 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{testimonial.amount}</div>
                      <div className="text-sm text-gray-600">Recovered</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.story}"</p>
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-blue-600">{testimonial.timeframe}</div>
                      <div className="text-gray-600">Resolution</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-blue-50 rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Join 2,847+ Satisfied Clients
              </h3>
              <p className="text-gray-600 mb-6">
                We've recovered over $4.2 million for people just like you. 
                Your case could be next.
              </p>
              <Link to="/pricing"><Button size="lg" className="text-lg px-8 py-4">
                Get My Money Back Too!
              </Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Fair Pricing That <span className="text-green-600">Pays for Itself</span>
            </h2>
            <p className="text-xl text-gray-600">
              No hourly fees. No retainers. We only win when you win.
            </p>
          </div>
          
          <div className="text-center mb-8">
            <Link to="/pricing">
              <Button size="lg" className="text-lg px-8 py-4">View All Plans & Services</Button>
            </Link>
          </div>

          <div className="max-w-lg mx-auto">
            <Card className="border-4 border-blue-500 bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center py-2 font-bold">
                MOST POPULAR
              </div>
              
              <CardHeader className="pt-12 text-center">
                <CardTitle className="text-3xl font-bold text-gray-900">Complete Resolution</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Everything you need to get your money back
                </CardDescription>
                
                <div className="mt-8">
                  <div className="text-5xl font-bold text-gray-900">$497</div>
                  <div className="text-lg text-gray-600">Flat Fee</div>
                  <div className="text-sm text-blue-600 font-semibold mt-2">
                    + 15% of recovered funds (only if we win)
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Professional case assessment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Legal-grade demand letters</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Direct negotiation with companies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Regular progress updates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>7-day resolution guarantee</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>100% money-back guarantee</span>
                </div>
                
                <div className="pt-6">
                  <Link to="/pricing"><Button className="w-full text-lg py-4">
                    🚀 Start My Case Now - $497
                  </Button></Link>
                </div>
                
                <div className="text-center text-sm text-gray-600">
                  <div className="bg-green-50 p-3 rounded-lg mt-4">
                    <strong className="text-green-800">Money-Back Guarantee:</strong> If we don't resolve your dispute in 7 days, you get your $497 back. No questions asked.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why This Is The Best Investment You'll Make
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">$2,100</div>
                <div className="text-sm text-gray-600">Average amount recovered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">4.2x</div>
                <div className="text-sm text-gray-600">Return on investment</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">4.2</div>
                <div className="text-sm text-gray-600">Days average resolution</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Don't Wait - <span className="text-red-600">Time Is Money</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Every day you wait, companies think you've given up. The longer you wait, 
            the harder it becomes to recover your money. <strong>Act now while the trail is hot.</strong>
          </p>
          
          <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Limited Time: Free Case Review
            </h3>
            <p className="text-gray-600 mb-6">
              We're offering free case reviews this month. Find out if you have a case 
              and what we can recover for you - no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing"><Button size="lg" className="text-lg px-8 py-4">
                Start My Case - $497
              </Button></Link>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setShowContactForm(true)}
                className="text-lg px-8 py-4"
              >
                Free Case Review
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Get Your <span className="text-green-600">Money Back</span>?
            </h2>
            <p className="text-xl text-gray-600">
              Contact us now and let's get started on your case today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Started Today</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Call Now</div>
                    <div className="text-blue-600 text-lg font-bold">(555) 012-3456</div>
                    <div className="text-sm text-gray-600">Available 24/7 for urgent cases</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email Us</div>
                    <div className="text-green-600 font-semibold">cases@disputeresolve.pro</div>
                    <div className="text-sm text-gray-600">Response within 2 hours</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Start Online</div>
                    <div className="text-purple-600 font-semibold">Secure payment & case creation</div>
                    <div className="text-sm text-gray-600">Get started in 5 minutes</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Why Choose SecureCheck Pro?</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ BBB A+ Rating - Trusted by thousands</li>
                  <li>✓ Google Certified - Professional expertise</li>
                  <li>✓ 98.5% Success Rate - Proven results</li>
                  <li>✓ 7-Day Guarantee - Fast resolution</li>
                  <li>✓ No Win, No Extra Fee - Risk-free service</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Free Case Evaluation
              </h3>
              
              <div className="space-y-4">
                <Button 
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg"
                >
                  Get Free Case Review
                </Button>
                
                <div className="text-center text-gray-600">
                  <div className="text-sm">or</div>
                </div>
                
                <Link to="/pricing"><Button className="w-full py-4 text-lg">
                  Start My Case Now - $497
                </Button></Link>
              </div>
              
              <div className="mt-6 text-center text-sm text-gray-600">
                <p>
                  <strong>100% Secure:</strong> Your information is protected with bank-level encryption. 
                  We never share your details with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold">SecureCheck Pro</span>
              </div>
              <p className="text-gray-400 text-sm">
                Professional dispute resolution services. 
                We get your money back when companies won't listen.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Consumer Disputes</li>
                <li>Refund Recovery</li>
                <li>Contract Disputes</li>
                <li>Service Failures</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About Us</li>
                <li>Success Stories</li>
                <li>BBB Profile</li>
                <li>Certifications</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>(555) 012-3456</div>
                <div>cases@disputeresolve.pro</div>
                <div>Available 24/7</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © 2024 SecureCheck Pro. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="text-xs text-gray-400">BBB A+ Rating</div>
              <div className="text-xs text-gray-400">Google Certified</div>
              <div className="text-xs text-gray-400">Shopify Certified</div>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}
    </div>
  )
}

