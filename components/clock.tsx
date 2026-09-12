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
  return `${get('hour')}:${get('minute')} ${get('timeZoneName')}`;
}

export default function Clock({ location }: { location?: string }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => setTime(format());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // location renders on the server; the time joins it once the clock is running
  return (
    <span className="text-muted-foreground">
      {[time, location].filter(Boolean).join(' · ')}
    </span>
  );
}
