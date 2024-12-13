import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, X } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import Header from '../components/marketing/Header';

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with wellness',
    features: [
      'Basic meditation timer',
      'Simple journal entries',
      '3 workout videos per month',
      'Progress tracking',
    ],
    limitations: [
      'Limited soundscapes',
      'No AI journal prompts',
      'Basic analytics only',
      'No premium content',
    ],
    buttonText: 'Get Started',
    priceId: '',
  },
  {
    name: 'Premium',
    price: '$9.99',
    period: 'per month',
    description: 'Everything you need for your wellness journey',
    features: [
      'Advanced meditation features',
      'AI-powered journal prompts',
      'Unlimited workout videos',
      'Advanced analytics',
      'Premium soundscapes',
      'Priority support',
      'Early access to new features',
      'Custom wellness plans',
    ],
    buttonText: 'Start Free Trial',
    priceId: 'price_premium_monthly',
    highlighted: true,
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  const handleSubscribe = async (priceId: string) => {
    if (!priceId) {
      navigate('/signup');
      return;
    }

    const stripe = await stripePromise;
    if (!stripe) return;

    // TODO: Create checkout session with your backend
    // const response = await fetch('/api/create-checkout-session', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ priceId }),
    // });
    // const session = await response.json();
    // await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for you and start your wellness journey today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-sm ${
                plan.highlighted ? 'ring-2 ring-purple-600' : 'border border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
                <p className="mt-4 text-gray-600">{plan.description}</p>
                
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>

                <button
                  onClick={() => handleSubscribe(plan.priceId)}
                  className={`mt-8 w-full py-3 px-4 rounded-lg font-medium ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.buttonText}
                </button>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations?.map((limitation) => (
                    <li key={limitation} className="flex items-start">
                      <X className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <span className="text-gray-500">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}