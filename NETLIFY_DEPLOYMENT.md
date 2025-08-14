# Netlify Deployment Guide

## 🚀 Quick Deploy to Netlify

Your dispute resolution platform is now fully optimized for Netlify deployment with serverless functions, form handling, and continuous deployment from GitHub.

### Method 1: GitHub Integration (Recommended)

1. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "New site from Git"
   - Choose "GitHub" as your Git provider
   - Select your repository: `realtravismartin/secure-check-pro-bolt`

2. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`
   - Netlify will auto-detect these from `netlify.toml`

3. **Set Environment Variables**
   ```env
   STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
   VITE_CALENDLY_URL=https://calendly.com/your-username
   VITE_SUPPORT_EMAIL=travis@disputeresolve.pro
   VITE_SUPPORT_PHONE=(555) 012-3456
   ```

4. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy automatically
   - Get your live URL (e.g., `https://amazing-site-name.netlify.app`)

### Method 2: Drag & Drop

1. **Build Locally**
   ```bash
   npm install
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag the `dist` folder to the deploy area
   - Your site will be live instantly

## 🔧 Environment Variables Setup

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `STRIPE_SECRET_KEY` | Stripe secret key for serverless functions | `sk_live_51...` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key for frontend | `pk_live_51...` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_CALENDLY_URL` | Calendly scheduling URL | `https://calendly.com/username` |
| `VITE_SUPPORT_EMAIL` | Support email address | `travis@disputeresolve.pro` |
| `VITE_SUPPORT_PHONE` | Support phone number | `(555) 012-3456` |
| `VITE_API_URL` | Custom API URL (optional) | `/.netlify/functions` |

### Setting Environment Variables in Netlify

1. **Via Netlify Dashboard**
   - Go to Site settings → Environment variables
   - Click "Add variable"
   - Enter name and value
   - Click "Save"

2. **Via Netlify CLI**
   ```bash
   netlify env:set STRIPE_SECRET_KEY sk_live_your_key_here
   netlify env:set VITE_STRIPE_PUBLISHABLE_KEY pk_live_your_key_here
   ```

## ⚡ Netlify Features Included

### ✅ **Serverless Functions**
- **Payment Processing** - Stripe integration with secure server-side handling
- **Contact Form** - Form submission with validation and case ID generation
- **Payment Confirmation** - Secure payment verification and case creation

### ✅ **Form Handling**
- **Netlify Forms** - Built-in form processing without serverless functions
- **Spam Protection** - Automatic spam filtering
- **Form Notifications** - Email notifications on form submissions

### ✅ **Performance Optimizations**
- **CDN** - Global content delivery network
- **Asset Optimization** - Automatic image and asset compression
- **Caching** - Intelligent caching with cache headers
- **Redirects** - Client-side routing support

### ✅ **Security Features**
- **HTTPS** - Automatic SSL certificates
- **Security Headers** - XSS protection, content security policy
- **Environment Variables** - Secure secret management

## 📋 Netlify Configuration Files

### `netlify.toml`
Main configuration file with:
- Build settings
- Redirects for SPA routing
- Security headers
- Form handling
- Environment-specific settings

### `public/_redirects`
Backup redirects file for:
- Client-side routing fallback
- API function routing
- Legacy URL redirects

### Serverless Functions
Located in `netlify/functions/`:
- `contact-form.js` - Contact form processing
- `create-payment-intent.js` - Stripe payment intent creation
- `confirm-payment.js` - Payment confirmation and case creation

## 🎨 Customization for Netlify

### Form Handling Options

**Option 1: Netlify Forms (Simple)**
```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <!-- form fields -->
</form>
```

**Option 2: Serverless Functions (Advanced)**
```javascript
// Use apiEndpoints.submitContactForm(formData)
// Handled by netlify/functions/contact-form.js
```

### Custom Domain Setup

1. **Add Custom Domain**
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter your domain (e.g., `disputeresolve.pro`)

2. **Configure DNS**
   - Point your domain to Netlify's load balancer
   - Add CNAME record: `www` → `your-site.netlify.app`
   - Add A record: `@` → Netlify's IP addresses

3. **SSL Certificate**
   - Netlify automatically provisions SSL certificates
   - HTTPS will be enabled within minutes

## 🔒 Security Configuration

### Content Security Policy
Configured in `netlify.toml` to allow:
- Stripe.js for payment processing
- Google Analytics for tracking
- Calendly for scheduling
- Self-hosted assets and styles

### Environment Security
- All sensitive keys stored as environment variables
- Client-side code only receives public keys
- Serverless functions handle sensitive operations

### Form Security
- Built-in spam protection
- Rate limiting on form submissions
- Input validation and sanitization

## 📊 Analytics and Monitoring

### Netlify Analytics
- Built-in traffic analytics
- Performance monitoring
- Form submission tracking
- Function execution logs

### Third-party Integration
- **Google Analytics** - Add tracking ID to environment variables
- **Stripe Dashboard** - Payment and revenue analytics
- **Custom Tracking** - Event tracking for conversions

## 🛠️ Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Test serverless functions locally
netlify dev

# Build for production
npm run build
```

### Continuous Deployment
- **Auto-deploy** - Pushes to main branch trigger deployments
- **Deploy previews** - Pull requests get preview URLs
- **Branch deploys** - Feature branches can have their own URLs

### Testing
```bash
# Test build locally
npm run build
npm run preview

# Test with Netlify CLI
netlify dev
netlify build
```

## 🚀 Going Live Checklist

### Pre-Launch
- [ ] Test payment flow with Stripe test cards
- [ ] Verify contact form submissions work
- [ ] Check all environment variables are set
- [ ] Test responsive design on mobile
- [ ] Verify all links and navigation work
- [ ] Test serverless functions

### Launch
- [ ] Switch to live Stripe keys
- [ ] Set up custom domain (optional)
- [ ] Configure form notifications
- [ ] Set up monitoring and alerts
- [ ] Test with real payment (small amount)

### Post-Launch
- [ ] Monitor Netlify function logs
- [ ] Check form submissions in Netlify dashboard
- [ ] Monitor Stripe payment success rates
- [ ] Set up regular backups
- [ ] Configure uptime monitoring

## 🔧 Troubleshooting

### Common Issues

**Build Failures**
```bash
# Check build logs in Netlify dashboard
# Verify all dependencies in package.json
# Check for environment variable issues
```

**Function Errors**
```bash
# Check function logs in Netlify dashboard
# Verify environment variables are set
# Test functions locally with netlify dev
```

**Form Issues**
```bash
# Verify form has name and data-netlify attributes
# Check form submissions in Netlify dashboard
# Ensure hidden form-name input is present
```

**Payment Problems**
```bash
# Check Stripe keys are correct for environment
# Verify webhook endpoints if using them
# Test with Stripe test cards first
```

### Getting Help

**Netlify Support**
- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Community](https://community.netlify.com)
- Support chat in Netlify dashboard

**Stripe Support**
- [Stripe Documentation](https://stripe.com/docs)
- Stripe support chat in dashboard
- [Stripe Community](https://github.com/stripe)

## 📈 Performance Optimization

### Automatic Optimizations
- **Image Optimization** - Automatic WebP conversion and compression
- **Asset Minification** - CSS and JavaScript minification
- **Gzip Compression** - Automatic compression for faster loading
- **CDN Distribution** - Global edge locations

### Manual Optimizations
- **Lazy Loading** - Images load as needed
- **Code Splitting** - Vite automatically splits code
- **Caching** - Configured cache headers for static assets
- **Preloading** - Critical resources preloaded

## 💰 Pricing Considerations

### Netlify Pricing
- **Starter (Free)** - 100GB bandwidth, 300 build minutes
- **Pro ($19/month)** - 1TB bandwidth, 1000 build minutes
- **Business ($99/month)** - Unlimited bandwidth and builds

### Function Usage
- **Free Tier** - 125,000 function requests, 100 hours runtime
- **Pro Tier** - 2 million requests, 1000 hours runtime
- **Additional** - $25 per 1 million requests

### Recommendations
- Start with free tier for testing
- Upgrade to Pro when you have regular traffic
- Monitor usage in Netlify dashboard

---

## 🎯 Success Metrics

### Key Performance Indicators
- **Page Load Speed** - Monitor Core Web Vitals
- **Conversion Rate** - Track form submissions to payments
- **Function Performance** - Monitor execution time and errors
- **Uptime** - Track site availability

### Monitoring Tools
- **Netlify Analytics** - Built-in performance metrics
- **Google Analytics** - User behavior tracking
- **Stripe Dashboard** - Payment analytics
- **Uptime Robot** - External uptime monitoring

---

## 🚀 Ready to Deploy?

Your dispute resolution platform is now ready for Netlify deployment!

**Quick Start:**
1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Set environment variables
4. Deploy!

**Repository:** https://github.com/realtravismartin/secure-check-pro-bolt

**Questions?** Contact travis@disputeresolve.pro

---

*Optimized for Netlify deployment with serverless functions, form handling, and continuous deployment!* 🚀

