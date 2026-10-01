/**
 * useConnectionHealth Hook: Tracks browser network connectivity and backend health
 * Provides non-technical connection states ('connected' | 'reconnecting' | 'offline')
 */

import { useState, useEffect, useRef } from 'react';

export type ConnectionStatus = 'connected' | 'reconnecting' | 'offline';

export function useConnectionHealth() {
  const [status, setStatus] = useState<ConnectionStatus>(() => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return 'offline';
    }
    return 'connected';
  });

  const retryTimeoutRef = useRef<any>(null);

  useEffect(() => {
    const checkBackendHealth = async () => {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        setStatus('offline');
        return;
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);
        const res = await fetch('/healthz', {
          method: 'GET',
          cache: 'no-store',
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          setStatus('connected');
        } else {
          setStatus('reconnecting');
        }
      } catch (_) {
        // If offline or network unreachable
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
          setStatus('offline');
        } else {
          setStatus('reconnecting');
        }
      }
    };

    const handleOnline = () => {
      setStatus('reconnecting');
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = setTimeout(() => {
        checkBackendHealth();
      }, 1000);
    };

    const handleOffline = () => {
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
      setStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check and periodic heartbeat ping every 30 seconds
    checkBackendHealth();
    const intervalId = setInterval(checkBackendHealth, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(intervalId);
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    };
  }, []);

  return status;
}
