import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, X } from 'lucide-react';
import { useSubscriptionStore } from '../../stores/subscriptionStore';

export default function SubscriptionBanner() {
  const [isVisible, setIsVisible] = React.useState(true);
  const { plan } = useSubscriptionStore();

  if (plan === 'premium' || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg p-4">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-white/80 hover:text-white"
      >
        <X className="w-5 h-5" />
      </button>
      
      <div className="flex items-start space-x-3">
        <Crown className="w-6 h-6 flex-shrink-0" />
        <div>
          <h3 className="font-semibold">Upgrade to Premium</h3>
          <p className="text-sm text-white/90 mt-1">
            Get unlimited access to all features and premium content.
          </p>
          <Link
            to="/pricing"
            className="inline-block mt-3 px-4 py-2 bg-white text-purple-600 rounded-lg font-medium text-sm hover:bg-gray-100"
          >
            View Plans
          </Link>
        </div>
      </div>
    </div>
  );
}