'use client';

import { useState, useEffect } from 'react';

const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Los_Angeles',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZoneName: 'short',
});

function format(): string {
  const parts = formatter.formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('timeZoneName')} ${get('hour')}:${get('minute')}`;
}

export default function Clock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => setTime(format());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return <span className="tabular-nums">{time}</span>;
}
