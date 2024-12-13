import React, { useState } from 'react';
import { Users, Shield, Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';

const SUPPORT_TIERS = [
  {
    id: 'community_basic',
    name: 'Community Basic',
    price: '$5/month',
    features: [
      'Access to community forums',
      'Join group discussions',
      'Weekly community events',
      'Basic support'
    ],
    priceId: 'price_community_basic'
  },
  {
    id: 'community_plus',
    name: 'Community Plus',
    price: '$15/month',
    features: [
      'All Basic features',
      'Private community channels',
      'Monthly expert Q&A sessions',
      'Priority support',
      'Exclusive content'
    ],
    highlighted: true,
    priceId: 'price_community_plus'
  }
];

interface CommunitySupportProps {
  onClose: () => void;
}

export default function CommunitySupport({ onClose }: CommunitySupportProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (priceId: string) => {
    setIsLoading(true);
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      if (!stripe) throw new Error('Stripe failed to initialize');

      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const { sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error (show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl w-full max-w-4xl overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Join Our Community</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              Connect, Share, and Grow Together
            </h3>
            <p className="mt-2 text-gray-600">
              Join our supportive community of wellness enthusiasts and get access to exclusive features
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {SUPPORT_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-xl border ${
                  tier.highlighted
                    ? 'border-purple-200 ring-2 ring-purple-600'
                    : 'border-gray-200'
                } p-6`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Star className="h-5 w-5 text-purple-500 mt-0.5 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(tier.priceId)}
                  disabled={isLoading}
                  className={`mt-8 w-full py-3 px-4 rounded-lg font-medium ${
                    tier.highlighted
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading ? 'Processing...' : 'Join Now'}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-purple-900">100% Satisfaction Guarantee</h4>
                <p className="mt-1 text-sm text-purple-700">
                  Try our community risk-free. If you're not satisfied within the first 30 days,
                  we'll give you a full refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}