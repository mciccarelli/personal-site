'use client';

import { useCallback, useState } from 'react';

export function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState(null);

  const copy = useCallback(async text => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setCopiedText(null);
      return false;
    }
  }, []);

  return [copiedText, copy];
}

export function truncateWalletAddress(address, chars = 4) {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export function getAvailability() {
  const currYear = new Date().getFullYear();
  const currMonth = new Date().getMonth();
  const nextMonth = currMonth + 1 < 12 ? currMonth + 1 : 0;
  return `${monthNames[nextMonth]} ${currYear}`;
}
