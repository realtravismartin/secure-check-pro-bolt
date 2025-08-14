# Secure Check Pro - Bolt.new Ready

A complete consumer dispute resolution platform optimized for bolt.new deployment. This React application provides a professional landing page, payment processing, case management, and admin dashboard for dispute resolution services.

## 🚀 Quick Deploy to Bolt.new

[![Deploy with Bolt.new](https://img.shields.io/badge/Deploy%20with-Bolt.new-blue?style=for-the-badge)](https://bolt.new)

1. **Fork or Download** this repository
2. **Open bolt.new** in your browser
3. **Upload the project** or connect your GitHub repository
4. **Configure environment variables** (see below)
5. **Deploy instantly** - bolt.new handles the rest!

## 🌟 Features

### 🎯 **Core Business Features**
- **Professional Landing Page** - Conversion-optimized design
- **Stripe Payment Integration** - Secure $497 + 15% contingency processing
- **Case Management System** - Track disputes from start to resolution
- **Admin Dashboard** - Monitor performance and analytics
- **Contact Forms** - Lead capture and consultation booking
- **Responsive Design** - Perfect on desktop and mobile

### 🔧 **Technical Features**
- **React 18** - Modern React with hooks and context
- **Tailwind CSS** - Utility-first styling with custom components
- **React Router** - Client-side routing
- **Stripe Elements** - Secure payment forms
- **Recharts** - Beautiful analytics charts
- **Lucide Icons** - Consistent iconography
- **Vite** - Fast development and building

## 📁 Project Structure

```
secure-check-pro-bolt/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (buttons, cards, etc.)
│   │   ├── ContactForm.jsx # Contact form modal
│   │   └── PaymentButton.jsx # Payment processing button
│   ├── pages/              # Main application pages
│   │   ├── HomePage.jsx    # Landing page
│   │   ├── PaymentPage.jsx # Payment processing
│   │   ├── ThankYouPage.jsx # Post-payment confirmation
│   │   └── AdminDashboard.jsx # Admin analytics
│   ├── lib/                # Utility libraries
│   │   ├── api.js          # API client configuration
│   │   ├── stripe.js       # Stripe configuration
│   │   └── utils.js        # Helper functions
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles and Tailwind
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
└── README.md              # This file
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here

# API Configuration (if using external backend)
VITE_API_URL=https://your-backend-api.vercel.app

# Calendly Configuration
VITE_CALENDLY_URL=https://calendly.com/your-username

# App Configuration
VITE_APP_NAME=Secure Check Pro
VITE_SUPPORT_EMAIL=travis@disputeresolve.pro
VITE_SUPPORT_PHONE=(555) 012-3456
```

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ and npm
- Stripe account (for payment processing)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/realtravismartin/secure-check-pro.git
   cd secure-check-pro-bolt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🚀 Deployment Options

### Bolt.new (Recommended)
1. Upload project to bolt.new
2. Configure environment variables
3. Deploy instantly

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Other Platforms
The built application in `dist/` can be deployed to any static hosting service.

## 💳 Payment Integration

### Stripe Setup
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your publishable key from the Stripe dashboard
3. Add the key to your `.env` file as `VITE_STRIPE_PUBLISHABLE_KEY`
4. Configure webhooks for payment confirmation (if using backend)

### Payment Flow
1. User clicks "Pay $497 & Start Now"
2. Redirected to secure payment page
3. Stripe Elements handles card processing
4. Success redirects to thank you page
5. Case ID generated for tracking

## 📊 Admin Dashboard

Access the admin dashboard at `/admin` to view:
- Revenue analytics
- Case status distribution
- Recent cases
- Performance metrics
- Quick action buttons

## 🎨 Customization

### Styling
- **Tailwind CSS** - Modify `tailwind.config.js` for theme changes
- **Custom CSS** - Add styles to `src/index.css`
- **Components** - Update component styles in individual files

### Content
- **Copy** - Edit text content in page components
- **Images** - Replace images in `public/` directory
- **Branding** - Update colors, fonts, and logos

### Features
- **Add Pages** - Create new components in `src/pages/`
- **New Components** - Build reusable components in `src/components/`
- **API Integration** - Extend `src/lib/api.js` for backend calls

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📱 Mobile Optimization

The application is fully responsive and optimized for:
- **Mobile phones** - Touch-friendly interface
- **Tablets** - Optimized layouts
- **Desktop** - Full-featured experience
- **Accessibility** - WCAG compliant

## 🔒 Security Features

- **Stripe PCI Compliance** - Secure payment processing
- **Input Validation** - Form validation and sanitization
- **Environment Variables** - Sensitive data protection
- **HTTPS Enforcement** - Secure communications
- **XSS Protection** - Cross-site scripting prevention

## 📈 Analytics Integration

Ready for analytics platforms:
- **Google Analytics** - Add tracking ID to environment
- **Facebook Pixel** - Marketing conversion tracking
- **Custom Events** - Track user interactions
- **Performance Monitoring** - Core Web Vitals

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 📞 Support

For technical support or business inquiries:

**Travis Martin**  
Email: travis@disputeresolve.pro  
Phone: (555) 012-3456  

## 🎯 Business Model

- **Flat Fee**: $497 upfront payment
- **Success Fee**: 15% of recovered funds
- **Target**: 7-day resolution guarantee
- **Market**: Consumer dispute resolution

---

**Ready to deploy? Upload to bolt.new and start resolving disputes today!** 🚀

