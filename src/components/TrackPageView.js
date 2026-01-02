import { useEffect } from 'react';
import { base44 } from '@/api/base44Client';

// Generate session ID once per browser session
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('crypto_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('crypto_session_id', sessionId);
  }
  return sessionId;
};

export default function TrackPageView({ pageName }) {
  useEffect(() => {
    // Only track on client side and not on admin pages
    if (typeof window !== 'undefined' && !pageName?.toLowerCase().includes('admin')) {
      const trackView = async () => {
        try {
          await base44.entities.PageView.create({
            page: pageName || 'Unknown',
            path: window.location.pathname + window.location.search,
            referrer: document.referrer || 'Direct',
            user_agent: navigator.userAgent,
            session_id: getSessionId(),
          });
        } catch (error) {
          // Silently fail - don't break the app if tracking fails
          console.debug('Page view tracking failed:', error);
        }
      };

      trackView();
    }
  }, [pageName]);

  return null;
}