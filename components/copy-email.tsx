'use client';

import { useRef, useState } from 'react';

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable; the mailto link still works
    }
  };

  return (
    <>
      <a href={`mailto:${email}`}>{email}</a>{' '}
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className="text-muted-foreground hover:text-foreground inline-flex translate-y-px cursor-pointer align-baseline transition-colors"
      >
        {copied ? (
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 8.5 6.5 12 13 4.5" />
          </svg>
        ) : (
          <svg
            width="13"
            height="13"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            className="translate-y-[0.5px]"
          >
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
            <path d="M10.5 5.5v-2a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 3.5V9A1.5 1.5 0 0 0 4 10.5h1.5" />
          </svg>
        )}
      </button>
    </>
  );
}
