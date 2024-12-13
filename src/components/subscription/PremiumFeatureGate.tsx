import React from 'react';
import { Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSubscriptionStore } from '../../stores/subscriptionStore';

interface PremiumFeatureGateProps {
  children: React.ReactNode;
  feature: string;
}

export default function PremiumFeatureGate({ children, feature }: PremiumFeatureGateProps) {
  const { plan } = useSubscriptionStore();

  if (plan === 'premium') {
    return <>{children}</>;
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gray-900/5 backdrop-blur-sm rounded-lg flex items-center justify-center">
        <div className="text-center p-6">
          <Crown className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Premium Feature
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Upgrade to access {feature} and all other premium features
          </p>
          <Link
            to="/pricing"
            className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
          >
            Upgrade Now
          </Link>
        </div>
      </div>
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
    </div>
  );
}