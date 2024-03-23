'use client';

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { useCopyToClipboard } from '@/app/utils';

export default function Wallets({ data }) {
  const [copiedText, copy] = useCopyToClipboard();
  const [tooltip, setTooltip] = useState(false);

  const handleCopy = text => {
    copy(text)
      .then(() => {
        console.log('Copied!', { text });
        setTooltip(true);
      })
      .catch(error => {
        console.error('Failed to copy!', error);
      })
      .finally(() => {
        setTimeout(() => {
          setTooltip(false);
        }, 1500);
      });
  };

  return (
    <div className="flex items-center gap-x-2 relative">
      {data.map(({ icon, symbol, address, ens }, index) => (
        <div
          key={index}
          className="flex items-center text-xs opacity-50 hover:opacity-100 cursor-pointer"
          alt="copy to clipboard"
          onClick={() => handleCopy(ens ?? address)}>
          {/* <img src={icon} alt="" className="w-3 h-3" /> */}
          <span className="uppercase">{symbol}</span>
        </div>
      ))}
      {tooltip && (
        <div className="absolute -top-6 right-0 text-xs uppercase text-center whitespace-nowrap flex items-center gap-x-px">
          <svg
            className="scale-50 -mt-px"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd">
            <path d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z" />
          </svg>
          copied{' '}
        </div>
      )}
    </div>
  );
}
