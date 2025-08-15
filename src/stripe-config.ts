export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price?: number; // Optional for display purposes
}

export const stripeProducts: Record<string, StripeProduct> = {
  price_enterprise_alerts: {
    id: 'prod_SsEIEQCwfZrbDL',
    priceId: 'price_1RwTqBI7qpKXaqXwuUpS7bAG',
    name: 'Enterprise Alerts',
    description: 'Enterprise Alerts - Alerts for Large Businesses',
    mode: 'subscription',
    price: 399.99
  },
  price_business_alerts: {
    id: 'prod_SsEGCVkU4gSDnD',
    priceId: 'price_1RwTndI7qpKXaqXwYIeWF4zz',
    name: 'Business Alerts',
    description: 'Business alerts for the month - Keep your reputation clean!',
    mode: 'subscription',
    price: 49.00
  },
  price_individual_alerts: {
    id: 'prod_SsEFrvIZ8I4TCK',
    priceId: 'price_1RwTmmI7qpKXaqXwWbm8nB8h',
    name: 'Individual Alerts',
    description: 'Individual alerts - stay on top of your reputation!',
    mode: 'subscription',
    price: 19.00
  },
  price_premium_osint: {
    id: 'prod_SsEEhBc3T56p0P',
    priceId: 'price_1RwTlxI7qpKXaqXwIh2O9tu9',
    name: 'Premium OSINT Report',
    description: 'Premium OSINT Report',
    mode: 'payment',
    price: 499.97
  },
  price_standard_osint: {
    id: 'prod_SsED4XPIDpuwxm',
    priceId: 'price_1RwTkpI7qpKXaqXwDu7nEnmY',
    name: 'Standard OSINT Report',
    description: 'Standard OSINT Report',
    mode: 'subscription',
    price: 250.00
  }
};

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return Object.values(stripeProducts).find(product => product.priceId === priceId);
};

export const getSubscriptionProducts = (): StripeProduct[] => {
  return Object.values(stripeProducts).filter(product => product.mode === 'subscription');
};

export const getOneTimeProducts = (): StripeProduct[] => {
  return Object.values(stripeProducts).filter(product => product.mode === 'payment');
};