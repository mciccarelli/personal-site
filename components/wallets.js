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
    <div className="flex items-center gap-x-2 relative">
      {data.map(({ symbol, address, ens }, index) => (
        <div
          key={index}
          className="flex items-center text-xs cursor-pointer gap-x-px"
          alt="copy to clipboard"
          onClick={() => handleCopy(ens ?? address)}>
          {symbol === 'BTC' && <IconBtc />}
          {symbol === 'ETH' && <IconEth />}
          {symbol === 'SOL' && <IconSol />}
          <div className="uppercase">{symbol}</div>
        </div>
      ))}
      {tooltip && (
        <div className="absolute -bottom-6 left-0 text-[10px] uppercase text-center whitespace-nowrap flex items-center gap-x-px">
          <IconCheck />
          {copiedText === ensAddress ? copiedText : truncateWalletAddress(copiedText)} copied{' '}
        </div>
      )}
    </div>
  );
}
