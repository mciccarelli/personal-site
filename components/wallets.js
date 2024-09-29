'use client';

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { useCopyToClipboard, truncateWalletAddress } from '@/app/utils';
import { IconBtc, IconCheck, IconEth, IconSol } from '@/components';

const delay = 2;

export default function Wallets({ data }) {
  const [copiedText, copy] = useCopyToClipboard();
  const [tooltip, setTooltip] = useState(false);
  const ensAddress = data.find(({ symbol }) => symbol === 'ETH')?.ens ?? '';

  const handleCopy = text => {
    setTooltip(false);
    copy(text)
      .then(() => {
        console.log('Copied!', { text });
        setTooltip(true);
      })
      .catch(error => {
        console.error('Failed to copy!', error);
      });
  };

  useEffect(() => {
    if (tooltip === false) return;
    let timer1 = setTimeout(() => setTooltip(false), delay * 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, [tooltip]);

  return (
    <div className="flex items-center gap-x-1.5 relative">
      {data.map(({ symbol, address, ens }, index) => (
        <div
          key={index}
          className="flex items-center cursor-pointer gap-x-1 opacity-20 hover:opacity-100 transition-opacity"
          alt="copy to clipboard"
          onClick={() => handleCopy(address)}>
          {symbol === 'BTC' && <IconBtc />}
          {symbol === 'ETH' && <IconEth />}
          {symbol === 'SOL' && <IconSol />}
          {/* <div className="uppercase">{symbol}</div> */}
        </div>
      ))}
      {tooltip && (
        <div className="absolute -top-6 right-0 uppercase text-center whitespace-nowrap flex items-center gap-x-px">
          <IconCheck />
          {truncateWalletAddress(copiedText)} copied{' '}
        </div>
      )}
    </div>
  );
}
