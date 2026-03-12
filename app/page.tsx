'use client';

import React from 'react';
import IntroText from './components/IntroText';

function Clock() {
  const [time, setTime] = React.useState('');

  React.useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'America/Los_Angeles',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }) + ' PST',
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <>{time}</>;
}

export default function Home() {
  return (
    <main className="px-4 pt-28 md:pt-24">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <IntroText />
      </div>
      <div className="mt-12 grid grid-cols-1 font-mono text-[10px] text-neutral-500 uppercase md:grid-cols-4">
        <div className="md:col-start-2">
          <span className="block">Las Vegas, NV</span>
          <span className="block">
            <Clock />
          </span>
        </div>
      </div>
    </main>
  );
}
