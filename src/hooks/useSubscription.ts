import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSubscriptionStore } from '../stores/subscriptionStore';

export function useSubscription() {
  const location = useLocation();
  const { setPremium } = useSubscriptionStore();

  useEffect(() => {
    // Check for successful Stripe redirect
    const query = new URLSearchParams(location.search);
    const sessionId = query.get('session_id');

    if (sessionId) {
      // Verify the session with your backend
      fetch(`/api/verify-subscription?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setPremium(data.subscriptionId, data.expiresAt);
          }
        })
        .catch((error) => {
          console.error('Error verifying subscription:', error);
        });
    }
  }, [location, setPremium]);
}