import { useEffect, useState } from 'react';
import { REGISTRATION_CLOSES_AT } from '../config/event';

export const isRegistrationClosed = () => Date.now() >= REGISTRATION_CLOSES_AT;

/**
 * Returns true once the registration cutoff has passed.
 * Re-checks every second so open tabs flip to the closed state right at midnight
 * (a single long setTimeout can fire late if the tab was asleep).
 */
export default function useRegistrationClosed() {
  const [closed, setClosed] = useState(isRegistrationClosed);

  useEffect(() => {
    if (closed) return;
    const timer = setInterval(() => {
      if (isRegistrationClosed()) setClosed(true);
    }, 1000);
    return () => clearInterval(timer);
  }, [closed]);

  return closed;
}
